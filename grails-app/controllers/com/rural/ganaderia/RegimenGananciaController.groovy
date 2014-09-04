package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException

class RegimenGananciaController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [regimenGananciaInstanceList: RegimenGanancia.list(params), regimenGananciaInstanceTotal: RegimenGanancia.count()]
    }

    def create() {
        [regimenGananciaInstance: new RegimenGanancia(params)]
    }

    def save() {
        def regimenGananciaInstance = new RegimenGanancia(params)
        if (!regimenGananciaInstance.save(flush: true)) {
            render(view: "create", model: [regimenGananciaInstance: regimenGananciaInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), regimenGananciaInstance.id])
        redirect(action: "show", id: regimenGananciaInstance.id)
    }

    def show(Long id) {
        def regimenGananciaInstance = RegimenGanancia.get(id)
        if (!regimenGananciaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), id])
            redirect(action: "list")
            return
        }

        [regimenGananciaInstance: regimenGananciaInstance]
    }

    def edit(Long id) {
        def regimenGananciaInstance = RegimenGanancia.get(id)
        if (!regimenGananciaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), id])
            redirect(action: "list")
            return
        }

        [regimenGananciaInstance: regimenGananciaInstance]
    }

    def update(Long id, Long version) {
        def regimenGananciaInstance = RegimenGanancia.get(id)
        if (!regimenGananciaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (regimenGananciaInstance.version > version) {
                regimenGananciaInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'regimenGanancia.label', default: 'RegimenGanancia')] as Object[],
                        "Another user has updated this RegimenGanancia while you were editing")
                render(view: "edit", model: [regimenGananciaInstance: regimenGananciaInstance])
                return
            }
        }

        regimenGananciaInstance.properties = params

        if (!regimenGananciaInstance.save(flush: true)) {
            render(view: "edit", model: [regimenGananciaInstance: regimenGananciaInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), regimenGananciaInstance.id])
        redirect(action: "show", id: regimenGananciaInstance.id)
    }

    def delete(Long id) {
        def regimenGananciaInstance = RegimenGanancia.get(id)
        if (!regimenGananciaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), id])
            redirect(action: "list")
            return
        }

        try {
            regimenGananciaInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'regimenGanancia.label', default: 'RegimenGanancia'), id])
            redirect(action: "show", id: id)
        }
    }
}
