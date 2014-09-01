package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON

class GastoController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [gastoInstanceList: Gasto.list(params), gastoInstanceTotal: Gasto.count()]
    }

    def create() {
        [gastoInstance: new Gasto(params)]
    }

    def save() {
        def gastoInstance = new Gasto(params)
        if (!gastoInstance.save(flush: true)) {
            render(view: "create", model: [gastoInstance: gastoInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'gasto.label', default: 'Gasto'), gastoInstance.id])
        redirect(action: "show", id: gastoInstance.id)
    }

    def show(Long id) {
        def gastoInstance = Gasto.get(id)
        if (!gastoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'gasto.label', default: 'Gasto'), id])
            redirect(action: "list")
            return
        }

        [gastoInstance: gastoInstance]
    }

    def edit(Long id) {
        def gastoInstance = Gasto.get(id)
        if (!gastoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'gasto.label', default: 'Gasto'), id])
            redirect(action: "list")
            return
        }

        [gastoInstance: gastoInstance]
    }

    def update(Long id, Long version) {
        def gastoInstance = Gasto.get(id)
        if (!gastoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'gasto.label', default: 'Gasto'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (gastoInstance.version > version) {
                gastoInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'gasto.label', default: 'Gasto')] as Object[],
                        "Another user has updated this Gasto while you were editing")
                render(view: "edit", model: [gastoInstance: gastoInstance])
                return
            }
        }

        gastoInstance.properties = params

        if (!gastoInstance.save(flush: true)) {
            render(view: "edit", model: [gastoInstance: gastoInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'gasto.label', default: 'Gasto'), gastoInstance.id])
        redirect(action: "show", id: gastoInstance.id)
    }

    def delete(Long id) {
        def gastoInstance = Gasto.get(id)
        if (!gastoInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'gasto.label', default: 'Gasto'), id])
            redirect(action: "list")
            return
        }

        try {
            gastoInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'gasto.label', default: 'Gasto'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'gasto.label', default: 'Gasto'), id])
            redirect(action: "show", id: id)
        }
    }

    //---------------------------------
    def listjson(){
        def returnMap = [:]
        def returnList = []
        def gastos = Gasto.createCriteria().list(){
            order("descripcion","asc")
        }
        gastos.each {
            returnList << [id: it.id,descripcion:it.descripcion]
        }
        returnMap.rows = returnList
        returnMap.success = true
        returnMap.total = gastos.size()
        render returnMap as JSON
    }


}
