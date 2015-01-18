package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException

class CondicionOperacionController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [condicionOperacionInstanceList: CondicionOperacion.list(params), condicionOperacionInstanceTotal: CondicionOperacion.count()]
    }

    def create() {
        //[condicionOperacionInstance: new CondicionOperacion(params)]
    }

    def save() {
       // def condicionOperacionInstance = new CondicionOperacion(params)
        if (!condicionOperacionInstance.save(flush: true)) {
            render(view: "create", model: [condicionOperacionInstance: condicionOperacionInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), condicionOperacionInstance.id])
        redirect(action: "show", id: condicionOperacionInstance.id)
    }

    def show(Long id) {
        def condicionOperacionInstance = CondicionOperacion.get(id)
        if (!condicionOperacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), id])
            redirect(action: "list")
            return
        }

        [condicionOperacionInstance: condicionOperacionInstance]
    }

    def edit(Long id) {
        def condicionOperacionInstance = CondicionOperacion.get(id)
        if (!condicionOperacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), id])
            redirect(action: "list")
            return
        }

        [condicionOperacionInstance: condicionOperacionInstance]
    }

    def update(Long id, Long version) {
        def condicionOperacionInstance = CondicionOperacion.get(id)
        if (!condicionOperacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (condicionOperacionInstance.version > version) {
                condicionOperacionInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'condicionOperacion.label', default: 'CondicionOperacion')] as Object[],
                        "Another user has updated this CondicionOperacion while you were editing")
                render(view: "edit", model: [condicionOperacionInstance: condicionOperacionInstance])
                return
            }
        }

        condicionOperacionInstance.properties = params

        if (!condicionOperacionInstance.save(flush: true)) {
            render(view: "edit", model: [condicionOperacionInstance: condicionOperacionInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), condicionOperacionInstance.id])
        redirect(action: "show", id: condicionOperacionInstance.id)
    }

    def delete(Long id) {
        def condicionOperacionInstance = CondicionOperacion.get(id)
        if (!condicionOperacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), id])
            redirect(action: "list")
            return
        }

        try {
            condicionOperacionInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'condicionOperacion.label', default: 'CondicionOperacion'), id])
            redirect(action: "show", id: id)
        }
    }
}
