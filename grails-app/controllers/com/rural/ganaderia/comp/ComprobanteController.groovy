package com.rural.ganaderia.comp



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.JSON
import com.rural.ganaderia.Cliente
import com.rural.ganaderia.Exposicion
import com.rural.ganaderia.AnioExposicion
import com.rural.ganaderia.enums.TipoComprobante
import com.rural.ganaderia.Especie
import com.rural.ganaderia.Destino
import com.rural.ganaderia.localizacion.Localidad
import java.text.SimpleDateFormat
import com.rural.ganaderia.Categoria
import com.rural.ganaderia.Raza
import com.rural.ganaderia.Gasto
import org.springframework.context.MessageSource
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.transaction.TransactionStatus
import com.rural.ganaderia.Operacion
import com.rural.ganaderia.Numerador

//@Transactional(readOnly = true)
class ComprobanteController {
    MessageSource  messageSource

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

    //@Transactional
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

    //@Transactional
    def savejson(){
        def objJson = [:]
        def errorList= []
        log.info "PARAMETROS: "+params
        def cJson = JSON.parse(params.comprobante)
        log.debug("PARAMETROS jsonencode: "+cJson)
        def clienteOInstance = Cliente.load(cJson.vendedor)
        def clienteDInstance = Cliente.load(cJson.comprador)
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd")
        java.util.Date fecha
        try{
            fecha = df.parse(cJson.fechaOperacion)
        }catch(Exception e){
            log.debug "ERROR PARSEANDO LA FECHA DE OPERACION"

        }

        def comprobanteInstance = new Comprobante(clienteOrigen: clienteOInstance,clienteDestino: clienteDInstance,
                                        exposicion: Exposicion.load(cJson.exposicion),anioExposicion: AnioExposicion.load(cJson.anioExposicion)
                                        ,tipoComprobante: TipoComprobante.ORDENVENTA
                                        ,letra: clienteOInstance.situacionIVA.letraComprobante
                                        ,especie: Especie.load(cJson.especie)
                                        ,guias: cJson.guias,destino: Destino.load(cJson.destino)
                                        ,procedencia: Localidad.load(cJson.procedenciaLocalidad)
                                        ,fechaOperacion: new java.sql.Date(fecha.getTime())
                                        ,operacion: Operacion.load(cJson.operacion) )

        
        def detalleInstance
        def compGastoInstance
        def compVencInstance
        def lotesJson = JSON.parse(cJson.lotesjson)
        def gastosJson = JSON.parse(cJson.gastosjson)
        def vencimientosJson = JSON.parse(cJson.vencimientosjson)

        lotesJson.each{
            detalleInstance = new ComprobanteDetalle(categoria:Categoria.load(it.categoria),raza:Raza.load(it.raza)
                                ,leyenda: it.corral,precio: it.preciounitario,cantidad:it.cantidad,peso:it.peso)
            comprobanteInstance.addToDetalle(detalleInstance)
        }
        gastosJson.each{
            if(it.compradorvendedor.equals('V')){
                compGastoInstance = new ComprobanteGasto(gasto:Gasto.load(it.gasto),importe:it.monto
                            ,porcentaje: it.porcentaje,acumulaBaseIva: it.acbaseiva,tieneIva: it.tieneiva
                            ,acumulaGanancia: it.acganancia)
                comprobanteInstance.addToDetallegastos(compGastoInstance)
            }
        }
        def cal = Calendar.getInstance()
        def vencimiento
        vencimientosJson.each{
            if(it.compradorvendedor.equals('V')){
                try{
                    fecha = df.parse(cJson.fechaOperacion)
                }catch(Exception e){
                    log.debug "ERROR PARSEANDO LA FECHA DE OPERACION"

                }
                cal.setTime(fecha)
                cal.add(Calendar.DATE,it.cantidaddias)
                vencimiento = new java.sql.Date(cal.getTime().getTime())
                compVencInstance = new ComprobanteVencimiento(vencimiento:vencimiento)
                comprobanteInstance.addToDetallevencimientos(compVencInstance)
            }
        }
        //----------datos de la orden de compra-----
        def compCompra = new Comprobante(clienteOrigen: clienteDInstance ,clienteDestino: clienteOInstance,
                exposicion: Exposicion.load(cJson.exposicion),anioExposicion: AnioExposicion.load(cJson.anioExposicion)
                ,tipoComprobante: TipoComprobante.ORDENCOMPRA
                ,letra: clienteDInstance.situacionIVA.letraComprobante
                ,especie: Especie.load(cJson.especie)
                ,guias: cJson.guias,destino: Destino.load(cJson.destino)
                ,procedencia: Localidad.load(cJson.procedenciaLocalidad)
                ,fechaOperacion: comprobanteInstance.fechaOperacion
                ,operacion: comprobanteInstance.operacion)
         comprobanteInstance.detalle.each{
             detalleInstance = new ComprobanteDetalle(categoria:it.categoria,raza:it.raza
                     ,leyenda: it.leyenda,precio: it.precio,cantidad:it.cantidad,peso:it.peso)
             compCompra.addToDetalle(detalleInstance)
        }

        gastosJson.each{
            if(it.compradorvendedor.equals('C')){
                compGastoInstance = new ComprobanteGasto(gasto:Gasto.load(it.gasto),importe:it.monto
                        ,porcentaje: it.porcentaje,acumulaBaseIva: it.acbaseiva,tieneIva: it.tieneiva
                        ,acumulaGanancia: it.acganancia)
                compCompra.addToDetallegastos(compGastoInstance)
            }
        }
        vencimientosJson.each{
            if(it.compradorvendedor.equals('C')){
                cal.setTime(fecha)
                cal.add(Calendar.DATE,it.cantidaddias)
                vencimiento = new java.sql.Date(cal.getTime().getTime())
                compVencInstance = new ComprobanteVencimiento(vencimiento:vencimiento)
                compCompra.addToDetallevencimientos(compVencInstance)
            }
        }
        compCompra.razonSocial = comprobanteInstance.clienteDestino.razonSocial
        compCompra.localidad = comprobanteInstance.clienteDestino.localidad
        compCompra.direccion = comprobanteInstance.clienteDestino.direccion
        compCompra.situacionIVA = comprobanteInstance.clienteDestino.situacionIVA
        compCompra.cuit = comprobanteInstance.clienteDestino.cuit
        compCompra.ingresosBrutos = comprobanteInstance.clienteDestino.ingresosBrutos
            Comprobante.withTransaction{TransactionStatus status->
            def numeradorInstance = Numerador.findByTipoComprobante(compCompra.tipoComprobante)
            compCompra.numero = numeradorInstance.maximoNumero
            numeradorInstance.maximoNumero += 1
            numeradorInstance.save()
            comprobanteInstance.comprobanteDestino = compCompra
            //-----------------------------------------------
            comprobanteInstance.razonSocial = comprobanteInstance.clienteOrigen.razonSocial
            comprobanteInstance.localidad = comprobanteInstance.clienteOrigen.localidad
            comprobanteInstance.direccion = comprobanteInstance.clienteOrigen.direccion
            comprobanteInstance.situacionIVA = comprobanteInstance.clienteOrigen.situacionIVA
            comprobanteInstance.cuit = comprobanteInstance.clienteOrigen.cuit
            comprobanteInstance.ingresosBrutos = comprobanteInstance.clienteOrigen.ingresosBrutos
            numeradorInstance = Numerador.findByTipoComprobante(comprobanteInstance.tipoComprobante)
            comprobanteInstance.numero = numeradorInstance.maximoNumero
            numeradorInstance.maximoNumero += 1
            numeradorInstance.save()

            if (comprobanteInstance.comprobanteDestino.save()){
                if (comprobanteInstance.save( flush:true)) {
                    objJson.success = true
                    objJson.id = comprobanteInstance.id
                    objJson.message = 'Orden generada exitosamente'

                    render objJson as JSON
                }else{
                    status.setRollbackOnly()
                    comprobanteInstance.errors.allErrors.each{
                        it.getCodes().each{
                            log.debug("Código de error de cliente: "+it)
                        }
                        errorList << [msg:messageSource.getMessage(it,LocaleContextHolder.locale)]
                        objJson.id = null
                        objJson.success = false
                        objJson.message = "Error al registrar la orden"
                        objJson.errors = errorList
                    }
                    render objJson as JSON
                }
            }else{
                status.setRollbackOnly()
                comprobanteInstance.comprobanteDestino.errors.allErrors.each{
                    it.getCodes().each{
                        log.debug("Código de error de cliente: "+it)
                    }
                    errorList << [msg:messageSource.getMessage(it,LocaleContextHolder.locale)]
                    objJson.id = null
                    objJson.success = false
                    objJson.message = "Error al registrar la orden"
                    objJson.errors = errorList
                }
                render objJson as JSON

            }
        }


    }
    
    def listjson(){
        def objJson = []
        def comprobantes = Comprobante.createCriteria().list(){
                isNotNull("comprobanteDestino")
        }
        comprobantes.each{
                objJson << [idVenta:it.id,idCompra:it.comprobanteDestino.id,letraVenta:it.letra,letraCompra:it.comprobanteDestino.letra
                            ,numeroVenta : it.numero,numeroCompra : it.comprobanteDestino.numero,clienteVenta: it.clienteOrigen.razonSocial
                            ,clienteCompra : it.clienteDestino.razonSocial
                            ]
        }
        render objJson as JSON
    }

    def imprimircomprobante(){
        def comprobanteInstance = Comprobante.get(params.id)
        List comprobantes = new ArrayList()
        comprobantes.add(comprobanteInstance)
        comprobanteInstance.localidad.partido.provincia.nombre
        comprobanteInstance.situacionIVA.descripcion
        comprobanteInstance.clienteDestino.cuit
        comprobanteInstance.clienteOrigen.cuit
        comprobanteInstance.operacion.nombre
        comprobanteInstance.destino.descripcion
        comprobanteInstance.procedencia.nombre
        comprobanteInstance.especie.nombre

        comprobanteInstance.detalle.each{
                log.debug it.categoria.codigo
                log.debug it.raza.codigo


        }
        comprobanteInstance.detallegastos.each{
                it.gasto.codigo
        }
        comprobanteInstance.detallevencimientos.each{
                it.id
        }


        String reportsDirPath = servletContext.getRealPath("/reports/");
        def nombreComprobante = comprobanteInstance.tipoComprobante.toString()+'_'+comprobanteInstance.letra+'_Nro.'+comprobanteInstance.numero
        params.put("reportsDirPath", reportsDirPath);
        //open('ordenreservareporte?tipo=ORIGINAL&_format=PDF&_name=ordenReservaInstance&_file=OrdenReserva&id='+sel.data.ordenId
        params.put("_format","PDF")
        params.put("_name",nombreComprobante)
        params.put("_file","ComprobanteOrden")
        params.put("reportsDirPath",reportsDirPath)
        chain(controller:'jasper',action:'index',model:[data:comprobantes],params:params)
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
