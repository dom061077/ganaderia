package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class DestinoController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [destinoInstanceList: Destino.list(params), destinoInstanceTotal: Destino.count()]
    }

    def create() {
        [destinoInstance: new Destino(params)]
    }

    def save() {
        def destinoInstance = new Destino(params)
        if (!destinoInstance.save(flush: true)) {
            render(view: "create", model: [destinoInstance: destinoInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'destino.label', default: 'Destino'), destinoInstance.id])
        redirect(action: "show", id: destinoInstance.id)
    }

    def show(Long id) {
        def destinoInstance = Destino.get(id)
        if (!destinoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'destino.label', default: 'Destino'), id])
            redirect(action: "list")
            return
        }

        [destinoInstance: destinoInstance]
    }

    def edit(Long id) {
        def destinoInstance = Destino.get(id)
        if (!destinoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'destino.label', default: 'Destino'), id])
            redirect(action: "list")
            return
        }

        [destinoInstance: destinoInstance]
    }

    def update(Long id, Long version) {
        def destinoInstance = Destino.get(id)
        if (!destinoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'destino.label', default: 'Destino'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (destinoInstance.version > version) {
                destinoInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'destino.label', default: 'Destino')] as Object[],
                        "Another user has updated this Destino while you were editing")
                render(view: "edit", model: [destinoInstance: destinoInstance])
                return
            }
        }

        destinoInstance.properties = params

        if (!destinoInstance.save(flush: true)) {
            render(view: "edit", model: [destinoInstance: destinoInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'destino.label', default: 'Destino'), destinoInstance.id])
        redirect(action: "show", id: destinoInstance.id)
    }

    def delete(Long id) {
        def destinoInstance = Destino.get(id)
        if (!destinoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'destino.label', default: 'Destino'), id])
            redirect(action: "list")
            return
        }

        try {
            destinoInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'destino.label', default: 'Destino'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'destino.label', default: 'Destino'), id])
            redirect(action: "show", id: id)
        }
    }

    //---------------------------------
    def listjson(){
        def returnMap = [:]
        def returnList = []
        def destinos = Destino.list()
        destinos.each {
            returnList << [id: it.id,descripcion:it.descripcion]
        }
        returnMap.rows = returnList
        returnMap.success = true
        returnMap.total = destinos.size()
        render returnMap as JSON
    }

}
