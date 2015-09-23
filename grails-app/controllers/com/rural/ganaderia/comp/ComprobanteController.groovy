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
import com.rural.ganaderia.parametros.GastoEspecieDestinoOper
import com.rural.ganaderia.parametros.GananciasValores

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

        //respond new Comprobante(params)
        log.debug "Metodo create con parametros: "+params.idComprobante
        [idComprobante: params.idComprobante]
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

    def edit(Long id){//(Comprobante comprobanteInstance) {
        def comprobanteInstance = Comprobante.get(id)
        //respond comprobanteInstance
        [comprobanteInstance:comprobanteInstance]
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
        log.debug "PARAMETROSSSSSSSS: "+params
        def cJson = JSON.parse(params.comprobante)
        log.debug "cJson.procedenciaLocalidadComprador: "+cJson.procedenciaLocalidadComprador//log.debug("PARAMETROS jsonencode: "+cJson)
        def localidadProcedenciaComprador = Localidad.load(cJson.procedenciaLocalidadComprador)
        log.debug "Localidad Procedencia Comprador: "+localidadProcedenciaComprador?.nombre
        def clienteOInstance = Cliente.load(cJson.vendedor)
        def clienteDInstance = Cliente.load(cJson.comprador)
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd")
        java.util.Date fecha
        try{
            fecha = df.parse(cJson.fechaOperacion)
        }catch(Exception e){
            log.debug "ERROR PARSEANDO LA FECHA DE OPERACION"

        }

        def comprobanteInstance = new Comprobante(clienteOrigen: clienteOInstance,clienteDestino: clienteDInstance
                                        ,situacionIVA: clienteOInstance.situacionIVA, ganaciasIns: clienteOInstance.gananciasIns,
                                        exposicion: Exposicion.load(cJson.exposicion),anioExposicion: AnioExposicion.load(cJson.anioExposicion)
                                        ,tipoComprobante: TipoComprobante.ORDENVENTA
                                        ,letra: clienteOInstance.situacionIVA.letraComprobante
                                        ,especie: Especie.load(cJson.especie)
                                        ,guias: cJson.guias,destino: Destino.load(cJson.destino)
                                        ,procedencia: Localidad.load(cJson.procedenciaLocalidad)
                                        ,pagoContado: cJson.pagoContado
                                        ,porcentajeDesc: cJson.porcentajeDesc
                                        ,fechaOperacion: new java.sql.Date(fecha.getTime())
                                        ,operacion: Operacion.load(cJson.operacion) )
        //---------fijar alicuota para la orden de venta------
        def obj =GastoEspecieDestinoOper.createCriteria().list{
            situacionIVA{
                eq('id',comprobanteInstance.clienteOrigen.situacionIVA.id)
            }
            eq('tipoComprobante',comprobanteInstance.tipoComprobante)
            isNull('tipoComprobanteOrigen')
            eq('codigoIvaEspecie',comprobanteInstance.especie.codigoIva)
            eq('codigoIvaDestino',comprobanteInstance.destino.codigoIva)
        }
        comprobanteInstance.alicuota = obj.get(0).alicuota

        
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
        if(!comprobanteInstance.pagoContado){
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
                        compVencInstance = new ComprobanteVencimiento(vencimiento:vencimiento,cantidadDias: it.cantidaddias
                                        ,porcentajeBruto: it.porcentajebruto, porcentajeGastos: it.porcentajegastos
                                        ,porcentajeIva: it.porcentajeiva)
                        comprobanteInstance.addToDetallevencimientos(compVencInstance)
                    }
                }
        }
        //----------datos de la orden de compra-----
        def compCompra = new Comprobante(clienteOrigen: clienteDInstance ,clienteDestino: clienteOInstance,
                exposicion: Exposicion.load(cJson.exposicion),anioExposicion: AnioExposicion.load(cJson.anioExposicion)
                ,situacionIVA: clienteDInstance.situacionIVA,ganaciasIns: clienteDInstance.gananciasIns
                ,tipoComprobante: TipoComprobante.ORDENCOMPRA
                ,letra: clienteDInstance.situacionIVA.letraComprobante
                ,especie: Especie.load(cJson.especie)
                ,guias: cJson.guias,destino: Destino.load(cJson.destino)
                ,pagoContado: cJson.pagoContado
                ,porcentajeDesc: cJson.porcentajeDesc
                ,procedencia: Localidad.load(cJson.procedenciaLocalidadComprador)
                ,fechaOperacion: comprobanteInstance.fechaOperacion
                ,operacion: comprobanteInstance.operacion)
         comprobanteInstance.detalle.each{
             detalleInstance = new ComprobanteDetalle(categoria:it.categoria
                     ,leyenda: it.leyenda,precio: it.precio,cantidad:it.cantidad,peso:it.peso)
             if(detalleInstance.raza)
                detalleInstance.raza = Raza.load(it.raza?.id)
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
        if(!compCompra.pagoContado){
            vencimientosJson.each{
                if(it.compradorvendedor.equals('C')){
                    cal.setTime(fecha)
                    cal.add(Calendar.DATE,it.cantidaddias)
                    vencimiento = new java.sql.Date(cal.getTime().getTime())
                    compVencInstance = new ComprobanteVencimiento(vencimiento:vencimiento,cantidadDias: it.cantidaddias
                        ,porcentajeBruto: it.porcentajebruto,porcentajeGastos: it.porcentajegastos
                        ,porcentajeIva: it.porcentajeiva)
                    compCompra.addToDetallevencimientos(compVencInstance)

                }
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
            //----------------fijar alicuota de iva a la cabecera del comprobante---

            obj = GastoEspecieDestinoOper.createCriteria().list{
                situacionIVA{
                    eq('id',comprobanteInstance.clienteDestino.situacionIVA.id)
                }
                eq('tipoComprobante',comprobanteInstance.comprobanteDestino.tipoComprobante)
                isNull('tipoComprobanteOrigen')
                eq('codigoIvaEspecie',comprobanteInstance.comprobanteDestino.especie.codigoIva)
                eq('codigoIvaDestino',comprobanteInstance.comprobanteDestino.destino.codigoIva)
            }
            comprobanteInstance.comprobanteDestino.alicuota = obj.get(0).alicuota
                
            //--------------------------------------

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
        long nroOrden=0
        def cuit
        def razonSocial
        if(params.query){
            try{
                nroOrden = Long.parseLong(params.query)
            }catch(Exception e){
                
            }
        }
        def comprobantes = Comprobante.createCriteria().list(){
                isNotNull("comprobanteDestino")
                if(params.query && params.query.toString().trim()!=""){
                    or{
                        eq("numero",nroOrden)
                        clienteOrigen{
                            ilike("razonSocial",params.query)
                        }
                        clienteOrigen{
                            like("cuit",params.query)
                        }

                    }
                }
                order('numero','desc')
        }
        comprobantes.each{
                objJson << [idVenta:it.id,idCompra:it.comprobanteDestino.id,letraVenta:it.letra,letraCompra:it.comprobanteDestino.letra
                            ,numeroVenta : it.numero,numeroCompra : it.comprobanteDestino.numero,clienteVenta: it.clienteOrigen.razonSocial
                            ,clienteCompra : it.clienteDestino.razonSocial,totalVenta:it.total,totalCompra:it.comprobanteDestino.total
                            ]
        }
        render objJson as JSON
    }

    def getjson(Long id){
        def objJson = [:]
        def gastosJson = []
        def lotesJson = []
        def vencimientosJson = []
        def comprobanteInstance = Comprobante.get(id)
        if(comprobanteInstance){
            comprobanteInstance.detalle.each{
                lotesJson << [categoria: it.categoria.id,raza: it.raza.id,corral:it.leyenda,cantidad: it.cantidad,
                        peso: it.peso,preciounitario: it.precio, subtotal: it.subTotal]
            }
            comprobanteInstance.detallegastos.each{
                gastosJson << [compradorvendedor:'V',gasto:it.gasto.id,porcentaje: it.porcentaje
                            ,monto: it.importe,acbaseiva:it.acumulaBaseIva,tieneiva: it.tieneIva,acganancia:it.acumulaGanancia ]
            }
            comprobanteInstance.comprobanteDestino.detallegastos.each{
                gastosJson << [compradorvendedor:'C',gasto:it.gasto.id,porcentaje: it.porcentaje
                        ,monto: it.importe,acbaseiva:it.acumulaBaseIva,tieneiva: it.tieneIva,acganancia:it.acumulaGanancia ]
            }

            comprobanteInstance.detallevencimientos.each{
                vencimientosJson << [compradorvendedor: 'V',cantidaddias: it.cantidadDias, porcentajebruto: it.porcentajeBruto
                ,porcentajegastos: it.porcentajeGastos, porcentajeiva: it.porcentajeIva]
            }
            comprobanteInstance.comprobanteDestino.detallevencimientos.each{
                vencimientosJson << [compradorvendedor: 'C',cantidaddias: it.cantidadDias, porcentajebruto: it.porcentajeBruto
                        ,porcentajegastos: it.porcentajeGastos, porcentajeiva: it.porcentajeIva]
            }


            objJson.success = true
            objJson.vendedor = comprobanteInstance.clienteOrigen.id
            objJson.comprador = comprobanteInstance.clienteDestino.id
            objJson.exposicion = comprobanteInstance.exposicion.id
            objJson.anioExposicion = comprobanteInstance.anioExposicion.id
            objJson.especie = comprobanteInstance.especie.id
            objJson.destino = comprobanteInstance.destino.id
            objJson.guias = comprobanteInstance.guias
            objJson.operacion = comprobanteInstance.operacion.id
            objJson.fechaOperacion = comprobanteInstance.fechaOperacion
            objJson.procedenciaProvincia = comprobanteInstance.procedencia.partido.provincia.id
            objJson.procedenciaPartido = comprobanteInstance.procedencia.partido.id
            objJson.procedenciaLocalidad = comprobanteInstance.procedencia.id
            objJson.procedenciaProvinciaComprador = comprobanteInstance.comprobanteDestino.procedencia.partido.provincia.id
            objJson.procedenciaPartidoComprador = comprobanteInstance.comprobanteDestino.procedencia.partido.id
            objJson.procedenciaLocalidadComprador = comprobanteInstance.comprobanteDestino.procedencia.id
            objJson.lotesjson = lotesJson
            objJson.gastosjson = gastosJson
            objJson.vencimientosjson = vencimientosJson


        }else{
            objJson.success = false
            objJson.msgError = "No existe el comprobante con id "+id
        }

        render objJson as JSON
    }

    def imprimircomprobante(){
        def comprobanteInstance = Comprobante.get(params.id)
        List comprobantes = new ArrayList()
        comprobantes.add(comprobanteInstance)
        comprobantes.add(comprobanteInstance)
        comprobantes.add(comprobanteInstance)
        comprobanteInstance.localidad.partido.provincia.nombre
        comprobanteInstance.situacionIVA.descripcion
        comprobanteInstance.clienteDestino.cuit
        comprobanteInstance.clienteOrigen.cuit
        comprobanteInstance.operacion.nombre
        comprobanteInstance.destino.descripcion
        comprobanteInstance.procedencia.nombre
        comprobanteInstance.especie.nombre

        log.debug "Procentaje de descuento "+comprobanteInstance.porcentajeDesc+ " "+comprobanteInstance.descStr
        comprobanteInstance.detalle.each{
                log.debug it.categoria?.codigo
                log.debug it.raza?.codigo


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
        params.put("_file","ComprobanteOrden.jasper")
        params.put("reportsDirPath",reportsDirPath)
        log.debug "ENVIANDO IMPRESION DE REPORTE"
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
