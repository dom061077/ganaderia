package com.rural.ganaderia.comp

import com.rural.ganaderia.Cliente
import com.rural.ganaderia.Especie
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.Exposicion
import com.rural.ganaderia.AnioExposicion
import com.rural.ganaderia.Operacion
import com.rural.ganaderia.FormasdePago
import com.rural.ganaderia.Destino
import com.rural.ganaderia.enums.TipoComprobante
import com.rural.ganaderia.SituacionIVA
import com.rural.ganaderia.parametros.GastoEspecieDestinoOper
import java.text.DecimalFormat
import java.text.NumberFormat

class Comprobante {
    long numero
    String letra
    Cliente clienteOrigen
    Cliente clienteDestino
    TipoComprobante tipoComprobante

    
    Especie especie


    //-------------------datos el cliente que se persisten-----------
    String razonSocial
    Localidad localidad
    String direccion
    SituacionIVA situacionIVA
    String cuit
    String ingresosBrutos
    boolean ganaciasIns

    //----------------
    java.sql.Date fechaAlta = new java.sql.Date(new java.util.Date().getTime())
    Exposicion exposicion
    AnioExposicion anioExposicion
    Operacion operacion
    //FormasdePago formasdePago
    int numeroOperacion
    String guias
    Destino destino
    Localidad procedencia
    java.sql.Date fechaOperacion
    BigDecimal alicuota
    
    Comprobante comprobanteDestino
    //------- Trasients fields---
     BigDecimal getImporteBruto(){
        def retorno=0
        detalle.each{det->
            retorno += det.subTotal
        }
        return retorno
     }
    BigDecimal getTotalGastos(){
        def retorno=0
        detallegastos.each{det ->
            retorno+=det.subTotal
        }
        return retorno
    }

    BigDecimal getBaseIva(){
        def retorno = importeBruto

        if (tipoComprobante==TipoComprobante.ORDENCOMPRA)
            retorno += totalGastos
        if (tipoComprobante==TipoComprobante.ORDENVENTA)
            retorno -= totalGastos
        return retorno
    }



  /*  BigDecimal getAlicuota(){

        def obj =GastoEspecieDestinoOper.createCriteria().list{
            situacionIVA{
                eq('id',clienteOrigen.situacionIVA.id)
            }
            eq('tipoComprobante',tipoComprobante)
            isNull('tipoComprobanteOrigen')
            eq('codigoIvaEspecie',especie.codigoIva)
            eq('codigoIvaDestino',destino.codigoIva)
        }
        return obj.get(0).alicuota
    }    */

    BigDecimal getIva(){
        def retorno
        retorno = baseIva * alicuota / 100

    }

    BigDecimal getTotalGanancias(){
        def retorno = 0
        detallevencimientos.each{
            retorno += it.subTotalGanancias
        }

        return retorno
    }

    BigDecimal getTotal(){
        def retorno = importeBruto + iva
        return importeBruto + iva + totalGanancias + totalGastosFinal
    }

    BigDecimal getTotalGastosFinal(){
        def retorno=0
        if(tipoComprobante == TipoComprobante.ORDENCOMPRA)
            retorno = totalGastos
        if(tipoComprobante == TipoComprobante.ORDENVENTA)
            retorno = totalGastos*(-1)
        return retorno
    }
    
    String getMembreteIva(){
        DecimalFormat df = new DecimalFormat("#,##0.00")

        return clienteOrigen.situacionIVA.descripcion+' '+df.format(alicuota)+'%'+' Base/'+df.format(baseIva)
    }
    //---------------------



    static hasMany = [detalle:ComprobanteDetalle, detallegastos:ComprobanteGasto
                        , detallevencimientos:ComprobanteVencimiento]

    static transients = ['importeBruto','baseIva','iva','totalGastos'
                        ,'total','totalGanancias','totalGastosFinal','membreteIva']//la alicuota se obtiene de la transaccion GastoEspecieDestinoOper

    static constraints = {
        direccion(nullable: true, blank: true)
        ingresosBrutos(nullable: true, blank: true)


    }
    static mapping={
        detalle(sort: 'categoria')
        detallevencimientos(sort:  'vencimiento')
        detallegastos(sort:  'gasto')
    }
}
