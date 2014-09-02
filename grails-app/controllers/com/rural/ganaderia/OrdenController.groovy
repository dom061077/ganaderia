package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import org.springframework.context.i18n.LocaleContextHolder
import grails.converters.JSON
import org.springframework.context.MessageSource
import org.springframework.transaction.TransactionStatus
import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoNumerador
import java.text.SimpleDateFormat
import java.text.ParseException
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.enums.TipoOrden

class OrdenController {
    MessageSource  messageSource
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
    //----------------------------------------
    def savejson(){
        log.debug("Parametros: $params")
        def orden = new Orden(params)
        def errorList = []
        def objJson = [:]
        

        def detalleJson = JSON.parse(params.detalleJson)
        def detalleGastosJson = JSON.parse(params.detalleGastosJson)
        def detalleImpuestosJson = JSON.parse(params.detalleImpuestosJson)
        def detalleVencimientosJson = JSON.parse(params.detalleVencimientosJson)

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd")
        java.util.Date fecha
        try{
            fecha = df.parse(params.fechaoperacion.substring(0,9))
        }catch(Exception e){
            log.debug "ERROR PARSEANDO LA FECHA DE OPERACION"

        }

        if (!fecha){
            objJson.idOrden = null
            errorList << [msg: "Ingrese una Fecha de Operación Valida"]
            objJson.errors = errorList
            render objJson as JSON
            return
        }

        orden.fechaOperacion = new java.sql.Date(fecha?.getTime())
        //log.debug "FECHA DE OPERACION ASIGNADA: "+orden.fechaOperacion


        detalleJson.each{
            orden.addToDetalle(new DetalleOrden(cliente:Cliente.load(it.cliente),raza: Raza.load(it.raza),datosCorral:it.corral,precio:it.preciounitario,cantidad:it.cantidad,peso:it.peso))
        }
        detalleGastosJson.each{
            orden.addToDetallegastos(new Gasto(descripcion:it.descripcion,porcentaje: it.porcentaje,monto: it.monto))
        }
        detalleImpuestosJson.each{
            try{
                fecha = df.parse(it.vencimiento.substring(0,10))
            }catch(ParseException e){

            }

        }

        detalleVencimientosJson.each{
            try{
                fecha = df.parse(it.vencimiento.substring(0,10))
            }catch(ParseException e){
                
            }
            orden.addToDetallevencimientos(new Vencimiento(vencimiento: new java.sql.Date(fecha.getTime()),monto: it.monto ))
        }

        orden.fechaAlta = new java.sql.Date(new java.util.Date().getTime())
        orden.tipoOrden = TipoOrden.VENTA
        Orden.withTransaction{TransactionStatus status->
            if (!orden.cliente.id){
               if(!orden.cliente.save()){
                  status.setRollbackOnly()
                  orden.cliente.errors.allErrors.each{
                      it.getCodes().each{
                          log.debug("Código de error de cliente: "+it)
                      }
                      errorList << [msg:messageSource.getMessage(it,LocaleContextHolder.locale)]
                      objJson.idOrden = null
                      objJson.errors = errorList
                  }
                  render objJson as JSON
                  return
               }
            }else{

            }
            try{
                orden.numero = Numerador.sigNumero(TipoNumerador.ORDEN_COMPRA)
            }catch(Exception e){
                status.setRollbackOnly()
                errorList << [msg: e.getMessage()]
                objJson.idOrden = null
                objJson.errors = errorList
                render objJson as JSON
                return
            }
            orden.razonSocial = orden.cliente.razonSocial
            orden.localidad = orden.cliente.localidad
            orden.direccion = orden.cliente.direccion
            orden.situacionIVA = orden.cliente.situacionIVA
            orden.cuit = orden.cliente.cuit
            orden.ingresosBrutos = orden.cliente.ingresosBrutos

            if (!orden.save()){
                    log.debug (orden.errors)
                    status.setRollbackOnly()
                    orden.errors.allErrors.each{
                        it.getCodes().each{
                            log.debug "Código error: "+it
                        }
                        errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        objJson.idOrden = null
                        objJson.errors = errorList
                    }

            }else{
                    objJson.idOrden = orden.id
                    objJson.errors = null
            }

        }
        render objJson as JSON
    }

    def situacionIVAjson(){
        def hashJson = [:]
        def listRows =[]
        def situaciones = SituacionIVA.list()
        situaciones.each{
            log.debug("CODIGO DE ENUM: "+it)
            listRows << [id: it.name(),descripcion:it.name]
        }
        hashJson.success = true
        hashJson.rows = listRows
        render hashJson as JSON
    }
    
    def condicionOperacionjson(){
        def hashJson = [:]
        def listRows = []
        def condiciones = CondicionOperacion.list(sort: "nombre",order: "desc")
        condiciones.each{
            listRows << [id: it.id, descripcion: it.nombre]
        }
        hashJson.success = true
        hashJson.rows = listRows
        render hashJson as JSON
    }

    def operacionjson(){
        def hashJson = [:]
        def listRows = []
        def operaciones = Operacion.list(sort: "nombre",order: "desc")
        operaciones.each{
            listRows << [id:  it.id,descripcion: it.nombre]
        }
        hashJson.success = true
        hashJson.rows = listRows
        render hashJson as JSON
    }

    def listcomprajson(){
        def returnMap = [:]
        def recordList = []
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]

        def ordenes = Orden.createCriteria().list(pagingConfig){
            
        }
        ordenes.each {
            recordList << [id: it.id,numero:it.numero,cliente:it.cliente.razonSocial,exposicion:it.exposicion.nombre
                    ,anio:it.anioExposicion.anio,fechacarga:it.fechaAlta,total:0,anulada:it.anulada]
        }
        
        def totalOrdenes = Orden.createCriteria().count(){
                
        }
        returnMap.rows = recordList
        returnMap.success = true
        returnMap.total = totalOrdenes
        render returnMap as JSON
    }

    def imprimircomprobante(){
        def ordenInstance = Orden.get(params.id)
        ordenInstance.detalle.each{
        }

        List ordenList = new ArrayList()
        ordenList.add(ordenInstance)
        ordenList.add(ordenInstance)
        ordenList.add(ordenInstance)

        String reportsDirPath = servletContext.getRealPath("/reports/");
        params.put("reportsDirPath", reportsDirPath);
        //open('ordenreservareporte?tipo=ORIGINAL&_format=PDF&_name=ordenReservaInstance&_file=OrdenReserva&id='+sel.data.ordenId
        params.put("_format","PDF")
        params.put("_name","OrdendeCompra")
        params.put("_file","ComprobanteOrden")
        log.debug("Parametros: $params")
        chain(controller:'jasper',action:'index',model:[data:ordenList],params:params)

    }
}
