package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class EspecieController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [especieInstanceList: Especie.list(params), especieInstanceTotal: Especie.count()]
    }

    def create() {
        [especieInstance: new Especie(params)]
    }

    def save() {
        def especieInstance = new Especie(params)
        if (!especieInstance.save(flush: true)) {
            render(view: "create", model: [especieInstance: especieInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'especie.label', default: 'Especie'), especieInstance.id])
        redirect(action: "show", id: especieInstance.id)
    }

    def show(Long id) {
        def especieInstance = Especie.get(id)
        if (!especieInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'especie.label', default: 'Especie'), id])
            redirect(action: "list")
            return
        }

        [especieInstance: especieInstance]
    }

    def edit(Long id) {
        def especieInstance = Especie.get(id)
        if (!especieInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'especie.label', default: 'Especie'), id])
            redirect(action: "list")
            return
        }

        [especieInstance: especieInstance]
    }

    def update(Long id, Long version) {
        log.debug "Parametros: $params"
        def especieInstance = Especie.get(id)
        if (!especieInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'especie.label', default: 'Especie'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (especieInstance.version > version) {
                especieInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'especie.label', default: 'Especie')] as Object[],
                          "Another user has updated this Especie while you were editing")
                render(view: "edit", model: [especieInstance: especieInstance])
                return
            }
        }

        especieInstance.properties = params

        if (!especieInstance.save(flush: true)) {
            render(view: "edit", model: [especieInstance: especieInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'especie.label', default: 'Especie'), especieInstance.id])
        redirect(action: "show", id: especieInstance.id)
    }

    def delete(Long id) {
        def especieInstance = Especie.get(id)
        if (!especieInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'especie.label', default: 'Especie'), id])
            redirect(action: "list")
            return
        }

        try {
            especieInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'especie.label', default: 'Especie'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'especie.label', default: 'Especie'), id])
            redirect(action: "show", id: id)
        }
    }

    //---------------------------------
    def listjson(){
        def returnMap = [:]
        def returnList = []
        def especies = Especie.list()
        especies.each {
            returnList << [id: it.id,nombre:it.nombre,regimen2daVenta:it.evaluaIvaen2daVenta]
        }
        returnMap.rows = returnList
        returnMap.success = true
        returnMap.total = especies.size()
        render returnMap as JSON
    }
}
