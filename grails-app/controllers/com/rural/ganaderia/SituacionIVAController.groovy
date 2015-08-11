package com.rural.ganaderia



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.JSON

@Transactional(readOnly = true)
class SituacionIVAController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond SituacionIVA.list(params), model: [situacionIVAInstanceCount: SituacionIVA.count()]
    }

    def show(SituacionIVA situacionIVAInstance) {
        respond situacionIVAInstance
    }

    def create() {
        respond new SituacionIVA(params)
    }

    @Transactional
    def save(SituacionIVA situacionIVAInstance) {
        if (situacionIVAInstance == null) {
            notFound()
            return
        }

        if (situacionIVAInstance.hasErrors()) {
            respond situacionIVAInstance.errors, view: 'create'
            return
        }

        situacionIVAInstance.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'situacionIVA.label', default: 'SituacionIVA'), situacionIVAInstance.id])
                redirect situacionIVAInstance
            }
            '*' { respond situacionIVAInstance, [status: CREATED] }
        }
    }

    def edit(SituacionIVA situacionIVAInstance) {
        respond situacionIVAInstance
    }

    @Transactional
    def update(SituacionIVA situacionIVAInstance) {
        if (situacionIVAInstance == null) {
            notFound()
            return
        }

        if (situacionIVAInstance.hasErrors()) {
            respond situacionIVAInstance.errors, view: 'edit'
            return
        }

        situacionIVAInstance.save flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'SituacionIVA.label', default: 'SituacionIVA'), situacionIVAInstance.id])
                redirect situacionIVAInstance
            }
            '*' { respond situacionIVAInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(SituacionIVA situacionIVAInstance) {

        if (situacionIVAInstance == null) {
            notFound()
            return
        }

        situacionIVAInstance.delete flush: true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'SituacionIVA.label', default: 'SituacionIVA'), situacionIVAInstance.id])
                redirect action: "index", method: "GET"
            }
            '*' { render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'situacionIVA.label', default: 'SituacionIVA'), params.id])
                redirect action: "index", method: "GET"
            }
            '*' { render status: NOT_FOUND }
        }
    }
    
    def listjson(){
        def hashJson = [:]
        def data = []
        def situaciones = SituacionIVA.list()
        situaciones.each{
            data << [id:it.id,descripcion:it.descripcion]
        }
        hashJson.success = true
        hashJson.rows = data
        render hashJson as JSON
    }
}
