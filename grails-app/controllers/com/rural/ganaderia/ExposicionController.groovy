package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class ExposicionController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [exposicionInstanceList: Exposicion.list(params), exposicionInstanceTotal: Exposicion.count()]
    }

    def create() {
        [exposicionInstance: new Exposicion(params)]
    }

    def save() {
        def exposicionInstance = new Exposicion(params)
        if (!exposicionInstance.save(flush: true)) {
            render(view: "create", model: [exposicionInstance: exposicionInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), exposicionInstance.id])
        redirect(action: "show", id: exposicionInstance.id)
    }

    def show(Long id) {
        def exposicionInstance = Exposicion.get(id)
        if (!exposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), id])
            redirect(action: "list")
            return
        }

        [exposicionInstance: exposicionInstance]
    }

    def edit(Long id) {
        def exposicionInstance = Exposicion.get(id)
        if (!exposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), id])
            redirect(action: "list")
            return
        }

        [exposicionInstance: exposicionInstance]
    }

    def update(Long id, Long version) {
        def exposicionInstance = Exposicion.get(id)
        if (!exposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (exposicionInstance.version > version) {
                exposicionInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'exposicion.label', default: 'Exposicion')] as Object[],
                          "Another user has updated this Exposicion while you were editing")
                render(view: "edit", model: [exposicionInstance: exposicionInstance])
                return
            }
        }

        exposicionInstance.properties = params

        if (!exposicionInstance.save(flush: true)) {
            render(view: "edit", model: [exposicionInstance: exposicionInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), exposicionInstance.id])
        redirect(action: "show", id: exposicionInstance.id)
    }

    def delete(Long id) {
        def exposicionInstance = Exposicion.get(id)
        if (!exposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), id])
            redirect(action: "list")
            return
        }

        try {
            exposicionInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'exposicion.label', default: 'Exposicion'), id])
            redirect(action: "show", id: id)
        }
    }
    //------------------------
    def listjson(){
        def hashJson = [:]
        def listRows = []
        def exposiciones = Exposicion.createCriteria().list{
            order("nombre","asc")
        }
        exposiciones.each{
            listRows << [id:it.id,nombre:it.nombre]
        }
        hashJson.success = true
        hashJson.rows = listRows
        render hashJson as JSON
    }


}
