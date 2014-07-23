package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException

class OrdenController {

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
}
