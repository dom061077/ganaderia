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
    
    Comprobante comprobanteDestino
    //------- Trasients fields---
     BigDecimal getImporteBruto(){
        def retorno
        detalle.each{det->
            retorno += det.subTotal
        }
        return retorno
     }
    BigDecimal getTotalGastos(){
        def retorno
        detallegastos.each{det ->
            if(det.importe>0)
                retorno += det.importe
            else
                retorno += importeBruto * det.porcentaje / 100
        }
    }

    BigDecimal getBaseIva(){
        def retorno = importeBruto
        def gasto=0
        detallegastos.each{det->
            if(det.acumulaBaseIva){
                if(det.importe>0)
                    gasto += det.importe + (det.tieneIva?det.importe*alicuota/100:0)
                else
                    gasto += importeBruto * det.porcentaje / 100 + (det.tieneIva?(importeBruto * det.porcentaje / 100)*alicuota/100:0)
            }

        }
        if (tipoComprobante==TipoComprobante.ORDENCOMPRA)
            retorno += gasto
        if (tipoComprobante==TipoComprobante.ORDENVENTA)
            retorno -= gasto
    }

    BigDecimal getAlicuota(){

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
    }

    BigDecimal getIva(){
        def retorno
        retorno = baseIva * alicuota / 100
    }
    //---------------------



    static hasMany = [detalle:ComprobanteDetalle, detallegastos:ComprobanteGasto
                        , detallevencimientos:ComprobanteVencimiento]

    static transients = ['importeBruto','baseIva','iva','alicuota']//la alicuota se obtiene de la transaccion GastoEspecieDestinoOper

    static constraints = {
        //formasdePago(nullable: true,blank:true)
        ingresosBrutos(nullable: true,blank: true)
    }
}
