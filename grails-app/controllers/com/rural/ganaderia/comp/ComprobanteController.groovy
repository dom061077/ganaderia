package com.rural.ganaderia.comp



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ComprobanteController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Comprobante.list(params), model:[comprobanteInstanceCount: Comprobante.count()]
    }

    def show(Comprobante comprobanteInstance) {
        respond comprobanteInstance
    }

    def create() {
        respond new Comprobante(params)
    }

    @Transactional
    def save(Comprobante comprobanteInstance) {
        if (comprobanteInstance == null) {
            notFound()
            return
        }

        if (comprobanteInstance.hasErrors()) {
            respond comprobanteInstance.errors, view:'create'
            return
        }

        comprobanteInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'comprobante.label', default: 'Comprobante'), comprobanteInstance.id])
                redirect comprobanteInstance
            }
            '*' { respond comprobanteInstance, [status: CREATED] }
        }
    }

    def edit(Comprobante comprobanteInstance) {
        respond comprobanteInstance
    }

    @Transactional
    def update(Comprobante comprobanteInstance) {
        if (comprobanteInstance == null) {
            notFound()
            return
        }

        if (comprobanteInstance.hasErrors()) {
            respond comprobanteInstance.errors, view:'edit'
            return
        }

        comprobanteInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'Comprobante.label', default: 'Comprobante'), comprobanteInstance.id])
                redirect comprobanteInstance
            }
            '*'{ respond comprobanteInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(Comprobante comprobanteInstance) {

        if (comprobanteInstance == null) {
            notFound()
            return
        }

        comprobanteInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'Comprobante.label', default: 'Comprobante'), comprobanteInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'comprobante.label', default: 'Comprobante'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
