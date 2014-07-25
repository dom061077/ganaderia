package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class RazaController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [razaInstanceList: Raza.list(params), razaInstanceTotal: Raza.count()]
    }

    def create() {
        [razaInstance: new Raza(params)]
    }

    def save() {
        def razaInstance = new Raza(params)
        if (!razaInstance.save(flush: true)) {
            render(view: "create", model: [razaInstance: razaInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'raza.label', default: 'Raza'), razaInstance.id])
        redirect(action: "show", id: razaInstance.id)
    }

    def show(Long id) {
        def razaInstance = Raza.get(id)
        if (!razaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'raza.label', default: 'Raza'), id])
            redirect(action: "list")
            return
        }

        [razaInstance: razaInstance]
    }

    def edit(Long id) {
        def razaInstance = Raza.get(id)
        if (!razaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'raza.label', default: 'Raza'), id])
            redirect(action: "list")
            return
        }

        [razaInstance: razaInstance]
    }

    def update(Long id, Long version) {
        def razaInstance = Raza.get(id)
        if (!razaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'raza.label', default: 'Raza'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (razaInstance.version > version) {
                razaInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'raza.label', default: 'Raza')] as Object[],
                        "Another user has updated this Raza while you were editing")
                render(view: "edit", model: [razaInstance: razaInstance])
                return
            }
        }

        razaInstance.properties = params

        if (!razaInstance.save(flush: true)) {
            render(view: "edit", model: [razaInstance: razaInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'raza.label', default: 'Raza'), razaInstance.id])
        redirect(action: "show", id: razaInstance.id)
    }

    def delete(Long id) {
        def razaInstance = Raza.get(id)
        if (!razaInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'raza.label', default: 'Raza'), id])
            redirect(action: "list")
            return
        }

        try {
            razaInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'raza.label', default: 'Raza'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'raza.label', default: 'Raza'), id])
            redirect(action: "show", id: id)
        }
    }
    //--------------
    def listjson(long especieId){
        def hashJson= [:]
        def listRows = []
        def razas = Raza.createCriteria().list{
            especie{
                eq("id",especieId)
            }
        }
        razas.each{
            listRows << [id:it.id,nombre:it.nombre]
        }
        hashJson.success = true
        hashJson.rows = listRows
        hashJson.total = razas.size()
        render hashJson as JSON
    }

}
