package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.enums.EstadoDocumento

class Orden {
    long numero
    TipoOrden tipoOrden
    Cliente cliente
    Orden ordenVenta
    static belongsTo = [ordenVenta:Orden]
    
    Especie especie

    EstadoDocumento estado = EstadoDocumento.GENERADO

    
    //-------------------datos el cliente que se persisten-----------
    String razonSocial
    Localidad localidad
    String direccion
    SituacionIVA situacionIVA = SituacionIVA.IVA
    String cuit
    String ingresosBrutos

    //----------------
    
    java.sql.Date fechaAlta = new java.sql.Date(new java.util.Date().getTime())
    Exposicion exposicion
    AnioExposicion anioExposicion
    Operacion operacion
    FormasdePago formasdePago
    int numeroOperacion
    String guias
    Destino destino
    Localidad procedencia
    java.sql.Date fechaOperacion
    boolean anulada = false
    boolean cobrarIva = true //no se cobra iva por venta segunda venta(Es para el caso de los )

    BigDecimal getSubTotal(){//a esto le llaman total bruto, calculado sin los gastos
        def sumatoria=0
        detalle.each{
            sumatoria+=it.subTotal
        }
        return sumatoria
    }

    BigDecimal getTotal(){
       def totalGastos=0
       def totalNotas=0
       detallegastos.each{
            totalGastos+=it.subTotal
       }
       notas.each {
           if (it.tipo==TipoOrden.NOTA_CREDITO_A || it.tipo==TipoOrden.NOTA_CREDITO_B)
              totalNotas-=it.monto
           else
              totalNotas+=it.monto
       }
       return subTotal+totalGastos+totalNotas+iva-ganancias
    }

    BigDecimal getIva(){
        def retencion=0
        def porcentaje = especie.porcentajeIVA
        if(especie.evaluaIvaen2daVenta==false || (especie.evaluaIvaen2daVenta==true && cobrarIva==true)){
            retencion = baseImponible * porcentaje /100
        }
        return retencion
    }

    BigDecimal getBaseImponible(){
        def base = subTotal
        def gastoDeducible=0
        //todo VERIFICAR SI EN LA ORDEN DE COMPRA SE RESTA AL BRUTO LA COMISION PARA OBTENER LA BASE IMPONIBLE POR AHORA LO TOMO COMO QUE SI
        detallegastos.each {
            if(it.gasto.restaBaseImponible){
                gastoDeducible+=it.subTotal
            }
        }
        base+=gastoDeducible
    }
    
    BigDecimal getGanancias(){
        def totalGanancias = 0
        if(tipoOrden == TipoOrden.VENTA_A || tipoOrden == TipoOrden.VENTA_B){
            def porcentaje
            RegimenGanancia regimenGanancia = RegimenGanancia.list().get(0)
            if(cliente.situacionIVA==SituacionIVA.IVA)
                porcentaje = regimenGanancia?.porcentajeRI
            else
                porcentaje = regimenGanancia?.porcentajeRNI
            // todo REVISAR EL CALCULO DE GANANCIAS
            totalGanancias = subTotal - regimenGanancia.montoImponible
            totalGanancias = totalGanancias*2/100
        }
        return totalGanancias
    }

    BigDecimal getTotalGastos(){
        def sumtotal = 0
        detallegastos.each {
            sumtotal+=it.subTotal
        }
        if(tipoOrden==TipoOrden.VENTA_A || tipoOrden==TipoOrden.VENTA_B)
            sumtotal = sumtotal * (-1)

        return sumtotal*(-1)
    }
    int getCantidadVenc(){
       def contador=0
       detallevencimientos.each {
            if(it.cantidadDias>0)
                contador++
       }
       return contador
    }

    String getNumeroFormateado(){
        String.format("%08d", numero)
    }

    String getTipoOrdenDesc(){
        tipoOrden.name
    }

    static transients = ['cantidadVenc','totalGastos','ganancias','baseImponible','iva','subTotal'/*BRUTO*/,'total'
                ,/*para la vista*/'numeroFormateado','tipoOrdenDesc']

    static hasMany = [detalle:DetalleOrden,detallegastos:GastoOrden,detallevencimientos:Vencimiento,ordenescompra:Orden,notas:NotaDC]



    static constraints = {
        exposicion(nullable: false,blank:false)
        cliente(nullable: false,blank:false)
        anioExposicion(nullable: false,false:false)

    }

    static mapping = {
        cliente(cascade: 'save-update')
        detallevencimientos sort : 'vencimiento',order: 'asc'
    }

}
