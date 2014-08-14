package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import org.springframework.context.i18n.LocaleContextHolder
import grails.converters.JSON
import org.springframework.context.MessageSource
import org.springframework.transaction.TransactionStatus

class OrdenController {
    MessageSource  messageSource
    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [ordenInstanceList: Orden.list(params), ordenInstanceTotal: Orden.count()]
    }

    def create() {
        [ordenInstance: new Orden(params)]
    }

    def save() {
        def ordenInstance = new Orden(params)
        if (!ordenInstance.save(flush: true)) {
            render(view: "create", model: [ordenInstance: ordenInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'orden.label', default: 'Orden'), ordenInstance.id])
        redirect(action: "show", id: ordenInstance.id)
    }

    def show(Long id) {
        def ordenInstance = Orden.get(id)
        if (!ordenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
            return
        }

        [ordenInstance: ordenInstance]
    }

    def edit(Long id) {
        def ordenInstance = Orden.get(id)
        if (!ordenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
            return
        }

        [ordenInstance: ordenInstance]
    }

    def update(Long id, Long version) {
        def ordenInstance = Orden.get(id)
        if (!ordenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (ordenInstance.version > version) {
                ordenInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'orden.label', default: 'Orden')] as Object[],
                          "Another user has updated this Orden while you were editing")
                render(view: "edit", model: [ordenInstance: ordenInstance])
                return
            }
        }

        ordenInstance.properties = params

        if (!ordenInstance.save(flush: true)) {
            render(view: "edit", model: [ordenInstance: ordenInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'orden.label', default: 'Orden'), ordenInstance.id])
        redirect(action: "show", id: ordenInstance.id)
    }

    def delete(Long id) {
        def ordenInstance = Orden.get(id)
        if (!ordenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
            return
        }

        try {
            ordenInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "show", id: id)
        }
    }
    //----------------------------------------
    def savejson(){
        log.debug("Parametros: $params")
        def orden = new Orden(params)
        def detalleJson = JSON.parse(params.detalleJson)

        detalleJson.each{
            orden.addToDetalle(new DetalleOrden(ganado: Ganado.load(it.raza),datosCorral:it.corral,precio:it.preciounitario,cantidad:it.cantidad,peso:it.peso))

        }

        def errorList = []
        def objJson = [:]
        orden.fechaAlta = new java.sql.Date(new java.util.Date().getTime())
        Orden.withTransaction{TransactionStatus status->
            if (!orden.cliente.id){
               if(!orden.cliente.save()){
                  status.setRollbackOnly()
                  orden.cliente.errors.allErrors.each{
                      it.getCodes().each{
                          log.debug("Código de error de cliente: "+it)
                      }
                      errorList << [msg:messageSource.getMessage(it,LocaleContextHolder.locale)]
                      objJson.idOrden = null
                      objJson.errors = errorList
                  }
               }
            }else{
                if (!orden.save()){
                    log.debug (orden.errors)
                    status.setRollbackOnly()
                    orden.errors.allErrors.each{
                        it.getCodes().each{
                            log.debug "Código error: "+it
                        }
                        errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        objJson.idOrden = null
                        objJson.errors = errorList
                    }

                }else{

                        objJson.idOrden = orden.id
                        objJson.errors = null
                }
            }
        }
        render objJson as JSON
    }
}
