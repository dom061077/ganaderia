package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException

class NumeradorController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [numeradorInstanceList: Numerador.list(params), numeradorInstanceTotal: Numerador.count()]
    }

    def create() {
        [numeradorInstance: new Numerador(params)]
    }

    def save() {
        def numeradorInstance = new Numerador(params)
        if (!numeradorInstance.save(flush: true)) {
            render(view: "create", model: [numeradorInstance: numeradorInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'numerador.label', default: 'Numerador'), numeradorInstance.id])
        redirect(action: "show", id: numeradorInstance.id)
    }

    def show(Long id) {
        def numeradorInstance = Numerador.get(id)
        if (!numeradorInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'numerador.label', default: 'Numerador'), id])
            redirect(action: "list")
            return
        }

        [numeradorInstance: numeradorInstance]
    }

    def edit(Long id) {
        def numeradorInstance = Numerador.get(id)
        if (!numeradorInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'numerador.label', default: 'Numerador'), id])
            redirect(action: "list")
            return
        }

        [numeradorInstance: numeradorInstance]
    }

    def update(Long id, Long version) {
        def numeradorInstance = Numerador.get(id)
        if (!numeradorInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'numerador.label', default: 'Numerador'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (numeradorInstance.version > version) {
                numeradorInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'numerador.label', default: 'Numerador')] as Object[],
                        "Another user has updated this Numerador while you were editing")
                render(view: "edit", model: [numeradorInstance: numeradorInstance])
                return
            }
        }

        numeradorInstance.properties = params

        if (!numeradorInstance.save(flush: true)) {
            render(view: "edit", model: [numeradorInstance: numeradorInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'numerador.label', default: 'Numerador'), numeradorInstance.id])
        redirect(action: "show", id: numeradorInstance.id)
    }

    def delete(Long id) {
        def numeradorInstance = Numerador.get(id)
        if (!numeradorInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'numerador.label', default: 'Numerador'), id])
            redirect(action: "list")
            return
        }

        try {
            numeradorInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'numerador.label', default: 'Numerador'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'numerador.label', default: 'Numerador'), id])
            redirect(action: "show", id: id)
        }
    }
}
