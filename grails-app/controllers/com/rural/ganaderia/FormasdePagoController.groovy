package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class FormasdePagoController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [formasdePagoInstanceList: FormasdePago.list(params), formasdePagoInstanceTotal: FormasdePago.count()]
    }

    def create() {
        [formasdePagoInstance: new FormasdePago(params)]
    }

    def save() {
        def formasdePagoInstance = new FormasdePago(params)
        if (!formasdePagoInstance.save(flush: true)) {
            render(view: "create", model: [formasdePagoInstance: formasdePagoInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), formasdePagoInstance.id])
        redirect(action: "show", id: formasdePagoInstance.id)
    }

    def show(Long id) {
        def formasdePagoInstance = FormasdePago.get(id)
        if (!formasdePagoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), id])
            redirect(action: "list")
            return
        }

        [formasdePagoInstance: formasdePagoInstance]
    }

    def edit(Long id) {
        def formasdePagoInstance = FormasdePago.get(id)
        if (!formasdePagoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), id])
            redirect(action: "list")
            return
        }

        [formasdePagoInstance: formasdePagoInstance]
    }

    def update(Long id, Long version) {
        def formasdePagoInstance = FormasdePago.get(id)
        if (!formasdePagoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (formasdePagoInstance.version > version) {
                formasdePagoInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'formasdePago.label', default: 'FormasdePago')] as Object[],
                        "Another user has updated this FormasdePago while you were editing")
                render(view: "edit", model: [formasdePagoInstance: formasdePagoInstance])
                return
            }
        }

        formasdePagoInstance.properties = params

        if (!formasdePagoInstance.save(flush: true)) {
            render(view: "edit", model: [formasdePagoInstance: formasdePagoInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), formasdePagoInstance.id])
        redirect(action: "show", id: formasdePagoInstance.id)
    }

    def delete(Long id) {
        def formasdePagoInstance = FormasdePago.get(id)
        if (!formasdePagoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), id])
            redirect(action: "list")
            return
        }

        try {
            formasdePagoInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'formasdePago.label', default: 'FormasdePago'), id])
            redirect(action: "show", id: id)
        }
    }
    //--------------------------
    def listjson(){
        def returnMap = [:]
        def returnList = []
        def formasdePago = FormasdePago.createCriteria().list(){
            order("descripcion","asc")
        }
        formasdePago.each {
            returnList << [id: it.id,descripcion:it.descripcion,tieneVencimientos:it.tieneVencimientos]
        }
        returnMap.rows = returnList
        returnMap.success = true
        returnMap.total = formasdePago.size()
        render returnMap as JSON

    }

}
