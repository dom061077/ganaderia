package com.rural.ganaderia.parametros



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import com.rural.ganaderia.enums.TipoComprobante

@Transactional(readOnly = true)
class GastoEspecieDestinoOperController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def gastoEspecieDestinoOperInstanceList = GastoEspecieDestinoOper.createCriteria().list(params){
            isNull('tipoComprobanteOrigen')
            or{
                eq('tipoComprobante',TipoComprobante.ORDENCOMPRA)
                eq('tipoComprobante',TipoComprobante.ORDENVENTA)
            }
        }

        def gastoEspecieDestinoOperInstanceCount = GastoEspecieDestinoOper.createCriteria().get{
            projections{
                count('id')
            }
            isNull('tipoComprobanteOrigen')
            or{
                eq('tipoComprobante',TipoComprobante.ORDENCOMPRA)
                eq('tipoComprobante',TipoComprobante.ORDENVENTA)
            }
        }
        return    [gastoEspecieDestinoOperInstanceList:gastoEspecieDestinoOperInstanceList,gastoEspecieDestinoOperInstanceCount: gastoEspecieDestinoOperInstanceCount]
    }

    def show(GastoEspecieDestinoOper gastoEspecieDestinoOperInstance) {
        respond gastoEspecieDestinoOperInstance
    }

    def create() {
        respond new GastoEspecieDestinoOper(params)
    }

    @Transactional
    def save(GastoEspecieDestinoOper gastoEspecieDestinoOperInstance) {
        if (gastoEspecieDestinoOperInstance == null) {
            notFound()
            return
        }

        if (gastoEspecieDestinoOperInstance.hasErrors()) {
            respond gastoEspecieDestinoOperInstance.errors, view:'create'
            return
        }

        gastoEspecieDestinoOperInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'gastoEspecieDestinoOper.label', default: 'GastoEspecieDestinoOper'), gastoEspecieDestinoOperInstance.id])
                redirect gastoEspecieDestinoOperInstance
            }
            '*' { respond gastoEspecieDestinoOperInstance, [status: CREATED] }
        }
    }

    def edit(GastoEspecieDestinoOper gastoEspecieDestinoOperInstance) {
        respond gastoEspecieDestinoOperInstance
    }

    @Transactional
    def update(GastoEspecieDestinoOper gastoEspecieDestinoOperInstance) {
        if (gastoEspecieDestinoOperInstance == null) {
            notFound()
            return
        }

        if (gastoEspecieDestinoOperInstance.hasErrors()) {
            respond gastoEspecieDestinoOperInstance.errors, view:'edit'
            return
        }

        gastoEspecieDestinoOperInstance.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'GastoEspecieDestinoOper.label', default: 'GastoEspecieDestinoOper'), gastoEspecieDestinoOperInstance.id])
                redirect gastoEspecieDestinoOperInstance
            }
            '*'{ respond gastoEspecieDestinoOperInstance, [status: OK] }
        }
    }

    @Transactional
    def delete(GastoEspecieDestinoOper gastoEspecieDestinoOperInstance) {

        if (gastoEspecieDestinoOperInstance == null) {
            notFound()
            return
        }

        gastoEspecieDestinoOperInstance.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'GastoEspecieDestinoOper.label', default: 'GastoEspecieDestinoOper'), gastoEspecieDestinoOperInstance.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'gastoEspecieDestinoOper.label', default: 'GastoEspecieDestinoOper'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
