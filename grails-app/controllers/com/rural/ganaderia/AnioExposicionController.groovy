package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class AnioExposicionController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [anioExposicionInstanceList: AnioExposicion.list(params), anioExposicionInstanceTotal: AnioExposicion.count()]
    }

    def create() {
        [anioExposicionInstance: new AnioExposicion(params)]
    }

    def save() {
        def anioExposicionInstance = new AnioExposicion(params)
        if (!anioExposicionInstance.save(flush: true)) {
            render(view: "create", model: [anioExposicionInstance: anioExposicionInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), anioExposicionInstance.id])
        redirect(action: "show", id: anioExposicionInstance.id)
    }

    def show(Long id) {
        def anioExposicionInstance = AnioExposicion.get(id)
        if (!anioExposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), id])
            redirect(action: "list")
            return
        }

        [anioExposicionInstance: anioExposicionInstance]
    }

    def edit(Long id) {
        def anioExposicionInstance = AnioExposicion.get(id)
        if (!anioExposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), id])
            redirect(action: "list")
            return
        }

        [anioExposicionInstance: anioExposicionInstance]
    }

    def update(Long id, Long version) {
        def anioExposicionInstance = AnioExposicion.get(id)
        if (!anioExposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (anioExposicionInstance.version > version) {
                anioExposicionInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'anioExposicion.label', default: 'AnioExposicion')] as Object[],
                        "Another user has updated this AnioExposicion while you were editing")
                render(view: "edit", model: [anioExposicionInstance: anioExposicionInstance])
                return
            }
        }

        anioExposicionInstance.properties = params

        if (!anioExposicionInstance.save(flush: true)) {
            render(view: "edit", model: [anioExposicionInstance: anioExposicionInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), anioExposicionInstance.id])
        redirect(action: "show", id: anioExposicionInstance.id)
    }

    def delete(Long id) {
        def anioExposicionInstance = AnioExposicion.get(id)
        if (!anioExposicionInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), id])
            redirect(action: "list")
            return
        }

        try {
            anioExposicionInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'anioExposicion.label', default: 'AnioExposicion'), id])
            redirect(action: "show", id: id)
        }
    }

    //----------------------
    def listjson(){
        def hashJson = [:]
        def listRows = []
        def aniosExposicion = AnioExposicion.createCriteria().list {
            order("anio","asc")
        }
        aniosExposicion.each{
            listRows << [id: it.id,anio:it.anio]
        }
        hashJson.success = true
        hashJson.rows = listRows
        render hashJson as JSON
    }
}
