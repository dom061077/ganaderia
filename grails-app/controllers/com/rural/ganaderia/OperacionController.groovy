package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException

class OperacionController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [operacionInstanceList: Operacion.list(params), operacionInstanceTotal: Operacion.count()]
    }

    def create() {
        [operacionInstance: new Operacion(params)]
    }

    def save() {
        def operacionInstance = new Operacion(params)
        if (!operacionInstance.save(flush: true)) {
            render(view: "create", model: [operacionInstance: operacionInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'operacion.label', default: 'Operacion'), operacionInstance.id])
        redirect(action: "show", id: operacionInstance.id)
    }

    def show(Long id) {
        def operacionInstance = Operacion.get(id)
        if (!operacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'operacion.label', default: 'Operacion'), id])
            redirect(action: "list")
            return
        }

        [operacionInstance: operacionInstance]
    }

    def edit(Long id) {
        def operacionInstance = Operacion.get(id)
        if (!operacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'operacion.label', default: 'Operacion'), id])
            redirect(action: "list")
            return
        }

        [operacionInstance: operacionInstance]
    }

    def update(Long id, Long version) {
        def operacionInstance = Operacion.get(id)
        if (!operacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'operacion.label', default: 'Operacion'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (operacionInstance.version > version) {
                operacionInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'operacion.label', default: 'Operacion')] as Object[],
                        "Another user has updated this Operacion while you were editing")
                render(view: "edit", model: [operacionInstance: operacionInstance])
                return
            }
        }

        operacionInstance.properties = params

        if (!operacionInstance.save(flush: true)) {
            render(view: "edit", model: [operacionInstance: operacionInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'operacion.label', default: 'Operacion'), operacionInstance.id])
        redirect(action: "show", id: operacionInstance.id)
    }

    def delete(Long id) {
        def operacionInstance = Operacion.get(id)
        if (!operacionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'operacion.label', default: 'Operacion'), id])
            redirect(action: "list")
            return
        }

        try {
            operacionInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'operacion.label', default: 'Operacion'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'operacion.label', default: 'Operacion'), id])
            redirect(action: "show", id: id)
        }
    }
}
