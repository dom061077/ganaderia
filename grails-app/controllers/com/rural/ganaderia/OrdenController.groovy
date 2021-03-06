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
import com.rural.ganaderia.enums.EstadoDocumento

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

    def create2() {
        [clienteInstance: new Cliente(params)]
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

        def titulo
        if (ordenInstance.tipoOrden==TipoOrden.COMPRA_A || ordenInstance.tipoOrden==TipoOrden.COMPRA_B)
            titulo="Modificación de Orden de Compra"
        else
            titulo="Modificación de Orden de Venta"

        if (ordenInstance.tipoOrden == TipoOrden.COMPRA_A || ordenInstance.tipoOrden == TipoOrden.COMPRA_B)
            render(view: 'editcompra', model: [ordenInstance:ordenInstance])
        else
            render(view: 'edit',model: [ordenInstance:ordenInstance])
            
        //[ordenInstance: ordenInstance,titulo: titulo]
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

    private def getNumeradorPorIvaTipodeOrden(Cliente clienteParm,def tipoOrden){
        //todo Verificar el numero de orden de compra de acuerdo a la situacion de IVA inscripto o cualquiera de las otras
        if (clienteParm.situacionIVA.IVA && tipoOrden==TipoOrden.COMPRAA)
            return Numerador.sigNumero(TipoNumerador.ORDEN_COMPRAA)
        if (clienteParm.situacionIVA.IVARNI && tipoOrden==TipoOrden.COMPRAB)
            return Numerador.sigNumero(TipoNumerador.ORDEN_COMPRAB)
        if (clienteParm.situacionIVA.IVA && tipoOrden==TipoOrden.VENTAA)
            return Numerador.sigNumero(TipoNumerador.ORDEN_VENTAA)
        if (clienteParm.situacionIVA.IVARNI && tipoOrden==TipoOrden.VENTAB)
            return Numerador.sigNumero(TipoNumerador.ORDEN_VENTAB)

        
    }
    
    def generarOrdenesdeCompra(Orden ordenVenta,def detalleVencComprasJson,def detalleGastosCompra){
        Orden ordenCompraInstance
        def listCompras=[]
        def detalleOrdenInstance
        def clienteInstance
        ordenVenta.detalle.each{det->
            log.debug "*************ingresando a la iteracion de detalle para agregar ordenes de compra"
            ordenCompraInstance = listCompras.findAll { c ->
                c.cliente.id==det.cliente.id
            }
            log.debug "**************ORDENCOMPRAINSTANCE CLASS: "+ordenCompraInstance.class +" "+ordenCompraInstance
            if (ordenCompraInstance!=null){
                ordenCompraInstance = new Orden()

                ordenCompraInstance.cliente = Cliente.load(det.cliente.id)
                if (ordenCompraInstance.cliente.situacionIVA==SituacionIVA.IVA)
                    ordenCompraInstance.tipoOrden = TipoOrden.COMPRA_A
                else
                    ordenCompraInstance.tipoOrden = TipoOrden.COMPRA_B
                ordenCompraInstance.numero = Numerador.sigNumero(ordenCompraInstance.tipoOrden)
                ordenCompraInstance.numeroOperacion = Numerador.sigNumero(ordenCompraInstance.tipoOrden)
                ordenCompraInstance.razonSocial = ordenCompraInstance.cliente.razonSocial
                ordenCompraInstance.localidad = ordenCompraInstance.cliente.localidad
                ordenCompraInstance.direccion = ordenCompraInstance.cliente.direccion
                ordenCompraInstance.situacionIVA = ordenCompraInstance.cliente.situacionIVA
                ordenCompraInstance.cuit = ordenCompraInstance.cliente.cuit
                ordenCompraInstance.ingresosBrutos = ordenCompraInstance.cliente.ingresosBrutos
                ordenCompraInstance.anioExposicion = ordenVenta.anioExposicion
                ordenCompraInstance.exposicion = ordenVenta.exposicion
                ordenCompraInstance.especie = ordenVenta.especie
                ordenCompraInstance.situacionIVA = ordenVenta.situacionIVA
                ordenCompraInstance.cobrarIva = ordenVenta.cobrarIva
                ordenCompraInstance.destino = ordenVenta.destino
                ordenCompraInstance.fechaOperacion = ordenVenta.fechaOperacion
                ordenCompraInstance.formasdePago = ordenVenta.formasdePago
                ordenCompraInstance.guias = ordenVenta.guias
                ordenCompraInstance.operacion = ordenVenta.operacion
                ordenCompraInstance.procedencia = ordenVenta.procedencia
                listCompras.add(ordenCompraInstance)
                log.debug "***************SE AGREGO A LA LISTA DE ORDENES DECOMPRA"
            }
            detalleOrdenInstance = new DetalleOrden()
            detalleOrdenInstance.cantidad = det.cantidad
            detalleOrdenInstance.cliente = ordenVenta.cliente
            detalleOrdenInstance.datosCorral = det.datosCorral
            detalleOrdenInstance.peso = det.peso
            detalleOrdenInstance.precio = det.precio
            detalleOrdenInstance.categoria = det.categoria
            detalleOrdenInstance.raza = det.raza
            ordenCompraInstance.addToDetalle(detalleOrdenInstance)
        }
        def cal = Calendar.getInstance()
        def vencimiento
        listCompras.each{itorden->
           detalleGastosCompra.each{det->
               itorden.addToDetallegastos(new GastoOrden(gasto:Gasto.load(det.gasto),porcentaje:det.porcentaje,monto:det.monto,anticipo:det.anticipo))
           }
           detalleVencComprasJson.each{itvenc->
               cal.setTime(ordenVenta.fechaOperacion)
               cal.add(Calendar.DATE,itvenc.dias)
               vencimiento = new java.sql.Date(cal.getTime().getTime())
               itorden.addToDetallevencimientos(new Vencimiento(vencimiento:vencimiento
                       ,cantidadDias:itvenc.dias,porcentajeBruto:itvenc.bruto
                       ,porcentajeGastos:itvenc.gastos,porcentajeIva: itvenc.iva,anticipo:itvenc.anticipo))

           }
        }

        listCompras.each {
            ordenVenta.addToOrdenescompra(it)
        }
    }


    def savejson(){
        log.debug ("SITUACION IVA: "+params.cliente.situacionIVA)
        log.debug("Parametros: $params")
        def orden = new Orden(params)
        def errorList = []
        def objJson = [:]
        

        def detalleJson = JSON.parse(params.detalleJson)
        def detalleGastosVenta = JSON.parse(params.detalleGastosVenta)
        def detalleGastosCompra = JSON.parse(params.detalleGastosCompra)

        def detalleVencVentasJson = JSON.parse(params.detalleVencVentasJson)
        def detalleVencComprasJson = JSON.parse(params.detalleVencComprasJson);


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
            orden.addToDetalle(new DetalleOrden(cliente:Cliente.load(it.cliente),categoria:Categoria.load(it.categoria),raza: Raza.load(it.raza),datosCorral:it.corral
                    ,precio:it.preciounitario,cantidad:it.cantidad,peso:it.peso))
        }
        detalleGastosVenta.each{
            orden.addToDetallegastos(
                    new GastoOrden(gasto:Gasto.load(it.gasto),porcentaje: it.porcentaje,monto:it.monto)
            )
            
        }
        def cal = Calendar.getInstance()
        def vencimiento
        def formadePagoInstance = FormasdePago.load(orden.formasdePago?.id)
        if (formadePagoInstance?.tieneVencimientos){
            detalleVencVentasJson.each{
                //try{
                //    fecha = df.parse(it.vencimiento.substring(0,10))
                //}catch(ParseException e){

                //}
                cal.setTime(fecha)
                cal.add(Calendar.DATE,it.dias)
                vencimiento = new java.sql.Date(cal.getTime().getTime())
                orden.addToDetallevencimientos(new Vencimiento(cantidadDias: it.dias,porcentajeBruto: it.bruto
                        , porcentajeGastos:it.gastos,porcentajeIva: it.iva
                        , vencimiento: vencimiento,anticipo: it.anticipo))
            }
        }

        orden.fechaAlta = new java.sql.Date(new java.util.Date().getTime())
        if (orden.cliente.situacionIVA == SituacionIVA.IVA)
            orden.tipoOrden = TipoOrden.VENTA_A
        else
            orden.tipoOrden = TipoOrden.VENTA_B
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
                orden.numero = Numerador.sigNumero(orden.tipoOrden)
            }catch(Exception e){
                status.setRollbackOnly()
                errorList << [msg: e.getMessage()]
                objJson.idOrden = null
                objJson.errors = errorList
                render objJson as JSON
                return
            }

           /* def retorno = Orden.createCriteria().get() {
                //ne("estado",EstadoDocumento.ANULADO)
               projections {
                       max("numeroOperacion")
                }
            } as Integer

            log.debug "Retorno de numero de operacion: "+retorno
             */

            orden.numeroOperacion = Numerador.sigNumero(TipoOrden.NUMERO_OPERACION)
            orden.razonSocial = orden.cliente.razonSocial
            orden.localidad = Localidad.load(22987)  //por defecto la localiad es san miguel de tucuman para la orden
            orden.direccion = orden.cliente.direccion
            orden.situacionIVA = orden.cliente.situacionIVA
            orden.cuit = orden.cliente.cuit
            orden.ingresosBrutos = orden.cliente.ingresosBrutos
            log.debug "Localidad ingresada para la orden de venta desde params: "+params.cliente.localidad.id

            if (!orden.validate()){
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
                
                    //-----------Aplicar descuentos por el tipo de pago con descuentos-----
                    if (orden.formasdePago.porcentajeDescuento>0){
                         //todo confirmar donde se aplica el descuento el subtotal o bruto o en el total 
                         def totalDescuento = orden.subTotal * orden.formasdePago.porcentajeDescuento/100
                         def notaDCInstance = new NotaDC(descripcion:"Descuento pago "+orden.formasdePago.descripcion+" "+orden.formasdePago.porcentajeDescuento+"%"
                                                 ,monto: totalDescuento,tipo: (orden.situacionIVA==SituacionIVA.IVA?TipoOrden.NOTA_CREDITO_A:TipoOrden.NOTA_CREDITO_B))
                        notaDCInstance.numero = Numerador.sigNumero(notaDCInstance.tipo)
                        orden.addToNotas(notaDCInstance)
                    }
                    generarOrdenesdeCompra(orden,detalleVencComprasJson,detalleGastosCompra)
                    if(!orden.save()){
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
                         String html="<table>"
                         html += "<tr><td>Tipo Comprobante</td><td>Número</td><td>Imprimir</td></tr>"

                         html+="""<tr> <td>${orden.tipoOrden.name}</td> <td>${orden.numero}</td>
                                        <td><a href='${createLink(controller: 'orden',action: 'imprimircomprobante')+"/"+orden.id}'><img src = '${resource(dir: 'images',file:'Print.png')}' /> </a></td>
                                     </tr>
                                   """


                         orden.ordenescompra.each{
                             html+="""<tr> <td>${it.tipoOrden.name}</td> <td>${it.numero}</td>
                                        <td><a href='${createLink(controller: 'orden',action: 'imprimircomprobante')+"/"+it.id+"?target=_blank"}'><img src = '${resource(dir: 'images',file:'Print.png')}' /> </a></td>
                                     </tr>
                                   """

                         }
                         orden.notas.each{
                         }
                         html+="</table>"
                         objJson.html = html
                    }
            }

        }
        render objJson as JSON
    }


    def updatecomprajson(){
        def errorList = []
        def objJson = [:]
        def ordenInstance = Orden.get(params.id)
        if (!ordenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
            return
        }

        def detalleGastosJson = JSON.parse(params.detalleGastosJson)
        def detalleVencimientosJson = JSON.parse(params.detalleVencimientosJson)

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd")
        java.util.Date fecha

        def cal = Calendar.getInstance()
        def vencimiento
        def formadePagoInstance = FormasdePago.load(params.formasdePago.id)


        Orden.withTransaction{TransactionStatus status->
            ordenInstance.cliente.properties = params.cliente
            ordenInstance.razonSocial = ordenInstance.cliente.razonSocial
            ordenInstance.localidad = ordenInstance.cliente.localidad
            ordenInstance.direccion = ordenInstance.cliente.direccion
            ordenInstance.situacionIVA = ordenInstance.cliente.situacionIVA
            ordenInstance.cuit = ordenInstance.cliente.cuit
            ordenInstance.ingresosBrutos = ordenInstance.cliente.ingresosBrutos
            ordenInstance.formasdePago = formadePagoInstance

            //--------modificación de los detalles--------
            def arrayObj = []
            ordenInstance.detallegastos.each{
                arrayObj.add(it.id)
            }
            def objDetalle
            arrayObj.each{
                objDetalle = GastoOrden.load(it)
                ordenInstance.removeFromDetallegastos(objDetalle)
                objDetalle.delete()
            }
            detalleGastosJson.each{
                ordenInstance.addToDetallegastos(
                        new GastoOrden(gasto:Gasto.load(it.gasto),porcentaje: it.porcentaje,monto:it.monto,anticipo:it.anticipo)
                )
            }
            arrayObj.clear()
            arrayObj = []
            ordenInstance.detallevencimientos.each{
                arrayObj.add(it.id)
            }
            arrayObj.each {
                objDetalle = Vencimiento.load(it)
                ordenInstance.removeFromDetallevencimientos(objDetalle)
                objDetalle.delete()
            }
            log.debug "*****************FORMA DE PAGO EN UPDATEORDENDEOMPRAJSON, forma de pago en orden : ${ordenInstance.formasdePago.descripcion} forma de apgo en parametro: ${formadePagoInstance.descripcion}***************"
            if (formadePagoInstance.tieneVencimientos){

                detalleVencimientosJson.each{
                    //try{
                    //    fecha = df.parse(it.vencimiento.substring(0,10))
                    //}catch(ParseException e){

                    //}
                    cal.setTime(ordenInstance.fechaOperacion)
                    cal.add(Calendar.DATE,it.dias)
                    vencimiento = new java.sql.Date(cal.getTime().getTime())
                    ordenInstance.addToDetallevencimientos(new Vencimiento(cantidadDias: it.dias,porcentajeBruto: it.bruto
                            , porcentajeGastos:it.gastos,porcentajeIva: it.iva
                            , vencimiento: vencimiento))
                }
            }

            //--------------------------------------------
            if (ordenInstance.cliente.situacionIVA==SituacionIVA.IVA)
                ordenInstance.tipoOrden = TipoOrden.COMPRA_A
            else
                ordenInstance.tipoOrden = TipoOrden.COMPRA_B


            if (!ordenInstance.validate()){
                log.debug (ordenInstance.errors)
                status.setRollbackOnly()
                ordenInstance.errors.allErrors.each{
                    it.getCodes().each{
                        log.debug "Código error: "+it
                    }
                    errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                    objJson.idOrden = null
                    objJson.errors = errorList
                }

            }else{

                //-----------Aplicar descuentos por el tipo de pago con descuentos-----
                if (ordenInstance.formasdePago.porcentajeDescuento>0){
                    //todo confirmar donde se aplica el descuento el subtotal o bruto o en el total
                    def totalDescuento = ordenInstance.subTotal * ordenInstance.formasdePago.porcentajeDescuento/100
                    //todo agregar a NotaDC una propiedad que indique si la nota fue generada por el sistema o por un usuario
                    //si fue generada por el sistema anularla para que generar de nuevo todo lo que sea automatico del sistema
                    ordenInstance.notas.each{
                        it.estado = EstadoDocumento.ANULADO
                    }
                    def notaDCInstance = new NotaDC(descripcion:"Descuento pago "+ordenInstance.formasdePago.descripcion+" "+ordenInstance.formasdePago.porcentajeDescuento+"%"
                            ,monto: totalDescuento,tipo: (ordenInstance.situacionIVA==SituacionIVA.IVA?TipoOrden.NOTA_CREDITO_A:TipoOrden.NOTA_CREDITO_B))
                    notaDCInstance.numero = Numerador.sigNumero(notaDCInstance.tipo)
                    ordenInstance.addToNotas(notaDCInstance)
                }
                if(!ordenInstance.save()){
                    status.setRollbackOnly()
                    ordenInstance.errors.allErrors.each{
                        it.getCodes().each{
                            log.debug "Código error: "+it
                        }
                        errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        objJson.idOrden = null
                        objJson.errors = errorList
                    }

                }else{
                    objJson.idOrden = ordenInstance.id
                    objJson.errors = null


                }
            }

        }


        render objJson as JSON

    }


    def updatejson(){
        def errorList = []
        def objJson = [:]
        def ordenInstance = Orden.get(params.id)
        if (!ordenInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'orden.label', default: 'Orden'), id])
            redirect(action: "list")
            return
        }


        def detalleJson = JSON.parse(params.detalleJson)
        def detalleGastosVenta = JSON.parse(params.detalleGastosVenta)
        def detalleGastosCompra = JSON.parse(params.detalleGastosCompra)

        def detalleVencVentasJson = JSON.parse(params.detalleVencVentasJson)
        def detalleVencComprasJson = JSON.parse(params.detalleVencComprasJson);



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

        ordenInstance.fechaOperacion = new java.sql.Date(fecha?.getTime())
        //log.debug "FECHA DE OPERACION ASIGNADA: "+orden.fechaOperacion



        def cal = Calendar.getInstance()
        def vencimiento
        def formadePagoInstance = FormasdePago.load(ordenInstance.formasdePago.id)


        if (ordenInstance.cliente.situacionIVA == SituacionIVA.IVA)
            ordenInstance.tipoOrden = TipoOrden.VENTA_A
        else
            ordenInstance.tipoOrden = TipoOrden.VENTA_B
        Orden.withTransaction{TransactionStatus status->
            ordenInstance.cliente.properties = params.cliente
            ordenInstance.razonSocial = ordenInstance.cliente.razonSocial
            ordenInstance.localidad = ordenInstance.cliente.localidad
            ordenInstance.direccion = ordenInstance.cliente.direccion
            ordenInstance.situacionIVA = ordenInstance.cliente.situacionIVA
            ordenInstance.cuit = ordenInstance.cliente.cuit
            ordenInstance.ingresosBrutos = ordenInstance.cliente.ingresosBrutos

            //--------modificación de los detalles--------
            def objDetalle
            def arrayObj = []

            arrayObj.clear()
            ordenInstance.detallegastos.each{
                arrayObj.add(it.id)
            }
            arrayObj.each{
                objDetalle = GastoOrden.load(it)
                ordenInstance.removeFromDetallegastos(objDetalle)
                objDetalle.delete()
            }
            detalleGastosVenta.each{
                ordenInstance.addToDetallegastos(
                        new GastoOrden(gasto:Gasto.load(it.gasto),porcentaje: it.porcentaje,monto:it.monto)
                )
            }
            if (formadePagoInstance.tieneVencimientos){

                arrayObj.clear()
                arrayObj = []
                ordenInstance.detallevencimientos.each{
                    arrayObj.add(it.id)
                }
                arrayObj.each {
                    objDetalle = Vencimiento.load(it)
                    ordenInstance.removeFromDetallevencimientos(objDetalle)
                    objDetalle.delete()
                }
                detalleVencVentasJson.each{
                    cal.setTime(fecha)
                    cal.add(Calendar.DATE,it.dias)
                    vencimiento = new java.sql.Date(cal.getTime().getTime())
                    ordenInstance.addToDetallevencimientos(new Vencimiento(cantidadDias: it.dias,porcentajeBruto: it.bruto
                            , porcentajeGastos:it.gastos,porcentajeIva: it.iva
                            , vencimiento: vencimiento))
                }
            }

            //------------------------si la orden es de venta----------------


            //--------------------------------------------------------


            if (!ordenInstance.validate()){
                log.debug (ordenInstance.errors)
                status.setRollbackOnly()
                ordenInstance.errors.allErrors.each{
                    it.getCodes().each{
                        log.debug "Código error: "+it
                    }
                    errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                    objJson.idOrden = null
                    objJson.errors = errorList
                }

            }else{

                //-----------Aplicar descuentos por el tipo de pago con descuentos-----
                if (ordenInstance.formasdePago.porcentajeDescuento>0){
                    //todo confirmar donde se aplica el descuento el subtotal o bruto o en el total
                    def totalDescuento = ordenInstance.subTotal * ordenInstance.formasdePago.porcentajeDescuento/100
                    //todo agregar a NotaDC una propiedad que indique si la nota fue generada por el sistema o por un usuario
                    //si fue generada por el sistema anularla para que generar de nuevo todo lo que sea automatico del sistema
                    ordenInstance.notas.each{
                        it.estado = EstadoDocumento.ANULADO
                    }
                    def notaDCInstance = new NotaDC(descripcion:"Descuento pago "+orden.formasdePago.descripcion+" "+ordenInstance.formasdePago.porcentajeDescuento+"%"
                            ,monto: totalDescuento,tipo: (ordenInstance.situacionIVA==SituacionIVA.IVA?TipoOrden.NOTA_CREDITO_A:TipoOrden.NOTA_CREDITO_B))
                    notaDCInstance.numero = Numerador.sigNumero(notaDCInstance.tipo)
                    ordenInstance.addToNotas(notaDCInstance)
                }

                if (ordenInstance.tipoOrden == TipoOrden.VENTA_A || ordenInstance.tipoOrden == TipoOrden.VENTA_B){
                    arrayObj.clear()
                    arrayObj = []

                    //-------logica de modificacion para el detalle de la orden de venta
                    ordenInstance.detalle.each {
                        arrayObj.add(it.id)
                    }
                    arrayObj.each {
                        objDetalle = DetalleOrden.load(it)
                        ordenInstance.removeFromDetalle(objDetalle)
                        objDetalle.delete()
                    }
                    detalleJson.each{ det ->
                        ordenInstance.addToDetalle(new DetalleOrden(cliente: Cliente.load(det.clienteid)
                                ,categoria: Categoria.load(det.categoriaId),raza: Raza.load(det.razaId), datosCorral: det.corral
                                ,precio: det.preciounitario, cantidad: det.cantidad, peso: det.peso ))
                    }
                    //--------------------------------

                    //recolecto todos los detalles de las ordenes de compra
                    ordenInstance.ordenescompra.each {ordc->
                        ordc.formasdePago = ordenInstance.formasdePago

                        //------logica de modificacion del detalle de la orden de compra
                        arrayObj.clear()
                        ordc.detalle.each {
                            arrayObj.add(it.id)
                        }
                        arrayObj.each {
                            objDetalle = DetalleOrden.load(it)
                            ordc.removeFromDetalle(objDetalle)
                            objDetalle.delete()
                        }
                        ordenInstance.detalle.each { det->
                            if(det.cliente==ordc.cliente){
                                ordc.addToDetalle(new DetalleOrden(cliente:ordenInstance.cliente,categoria:det.categoria
                                        ,raza:det.raza,datosCorral:det.datosCorral,precio:det.precio,cantidad:det.cantidad
                                        ,peso:det.peso
                                ))
                                return
                            }

                        }
                        //------------------
                        ordc.notas.each {
                            it.estado = EstadoDocumento.ANULADO
                        }
                        //------logica gastos de compra
                        arrayObj.clear()
                        ordc.detallegastos.each {
                            arrayObj.add(it.id)
                        }
                        arrayObj.each {
                            objDetalle = GastoOrden.load(it)
                            objDetalle.delete()
                            ordc.removeFromDetallegastos(objDetalle)
                        }
                        detalleGastosCompra.each{
                            ordc.addToDetallegastos(new GastoOrden(gasto: Gasto.load(it.gasto),monto: it.monto,porcentaje:it.porcentaje))
                        }
                        //-----

                        //---logica de modificacion del vencimiento de la orden de compra----
                        if(formadePagoInstance.tieneVencimientos){
                            arrayObj.clear()
                            ordc.detallevencimientos.each{
                                arrayObj.add(it.id)
                            }
                            arrayObj.each {
                                objDetalle = Vencimiento.load(it)
                                ordc.removeFromDetallevencimientos(objDetalle)
                                objDetalle.delete(objDetalle)
                            }
                            detalleVencComprasJson.each{det->
                                ordc.addToDetallevencimientos(new Vencimiento(cantidadDias: det.dias,bruto:det.bruto,gastos:det.gastos,iva:det.iva,anticipo: det.anticipo))
                            }
                        }
                        //----------------

                    }
                }

                if(!ordenInstance.save()){
                    status.setRollbackOnly()
                    ordenInstance.errors.allErrors.each{
                        it.getCodes().each{
                            log.debug "Código error: "+it
                        }
                        errorList << [msg:messageSource.getMessage(it, LocaleContextHolder.locale)]
                        objJson.idOrden = null
                        objJson.errors = errorList
                    }

                }else{

                    objJson.idOrden = ordenInstance.id
                    objJson.errors = null


                }
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

    def listjson(){
        def returnMap = [:]
        def recordList = []
        def pagingConfig = [max: params.limit as Integer ?:10, offset: params.start as Integer ?:0]

        def ordenes = Orden.createCriteria().list(pagingConfig){
            //or{
            //  eq("tipoOrden",TipoOrden.VENTA_A)
            //  eq("tipoOrden",TipoOrden.VENTA_B)
            //}
        }
        ordenes.each {
            recordList << [id: it.id,tipo: it.tipoOrden.name,numero:it.numeroFormateado,numeroOperacion:it.numeroOperacion,cliente:it.cliente.razonSocial,exposicion:it.exposicion.nombre
                    ,anio:it.anioExposicion.anio,fechacarga:it.fechaAlta,total:it.total,estado:it.estado]
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
        log.debug ordenInstance.cliente.razonSocial

        List ordenList = new ArrayList()
        ordenList.add(ordenInstance)
        ordenList.add(ordenInstance)
        ordenList.add(ordenInstance)
        log.debug ordenInstance.cliente
        log.debug ordenInstance.operacion?.id
        log.debug ordenInstance.anioExposicion?.id
        log.debug ordenInstance.destino?.id
        log.debug ordenInstance.exposicion?.id
        log.debug ordenInstance.situacionIVA?.name
        log.debug ordenInstance.cliente?.localidad
        log.debug ordenInstance.cliente.localidad?.provincia?.id
        log.debug ordenInstance.formasdePago?.id
        log.debug ordenInstance.localidad?.nombre
        log.debug ordenInstance.localidad.provincia?.nombre
        log.debug ordenInstance.destino?.descripcion
        ordenInstance.especie?.nombre
        ordenInstance.procedencia?.nombre

        ordenInstance.detalle.each {
            it.raza.nombre
            it.categoria.nombre
            it.cliente.razonSocial
        }
        ordenInstance.detallegastos.each{
            it.gasto.descripcion
        }
        ordenInstance.notas.each{
            it.descripcion
        }

        String reportsDirPath = servletContext.getRealPath("/reports/");
        params.put("reportsDirPath", reportsDirPath);
        //open('ordenreservareporte?tipo=ORIGINAL&_format=PDF&_name=ordenReservaInstance&_file=OrdenReserva&id='+sel.data.ordenId
        params.put("_format","PDF")
        params.put("_name","Orden de "+ordenInstance.tipoOrden.name+" Nro "+ordenInstance.numero)
        params.put("_file","ComprobanteOrden")
        params.put("reportsDirPath",reportsDirPath)
        log.debug("Parametros: $params")
        chain(controller:'jasper',action:'index',model:[data:ordenList],params:params)

    }

    def getordenjson(long id){
        log.debug "Parametros: $params"
        def ordenInstance = Orden.get(id)
        def errorJson=[:]
        if (!ordenInstance){
            errorJson.msg = "No se encontró la orden con el Identificador $id"
            render errorJson as JSON
            return
        }
        JSON.use("deep"){
            render ordenInstance as JSON
        }
    }
    
    def listtipojson(){
        def returnMap = [:]
        def returnList = []
        def tipos = TipoOrden.list()
        tipos.each{
            returnList << [id:it.name(),descripcion: it.name]
        }
        returnMap.rows = returnList
        returnMap.success = true
        returnMap.total = tipos.size()
        render returnMap as JSON

        
    }



}
