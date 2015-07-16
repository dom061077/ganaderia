package com.rural.ganaderia.comp

import com.rural.ganaderia.enums.TipoComprobante
import com.rural.ganaderia.parametros.GananciasValores

class ComprobanteVencimiento {
    Comprobante comprobante
    java.sql.Date vencimiento
    int cantidadDias
    BigDecimal porcentajeBruto  = new BigDecimal(0)
    BigDecimal porcentajeGastos = new BigDecimal(0)
    BigDecimal porcentajeIva = new BigDecimal(0)
    BigDecimal anticipo = new BigDecimal(0)
    


    static belongsTo = [comprobante:Comprobante]

    BigDecimal getSubTotal(){
        def subTotalBruto = comprobante.importeBruto * porcentajeBruto / 100
        def subTotalGastos = comprobante.totalGastos * porcentajeGastos / 100
        def subTotalIva = comprobante.iva * porcentajeIva / 100
        return  subTotalBruto + subTotalGastos +subTotalIva
    }

    BigDecimal getSubTotalGanancias(){
        def valoresGananciasInstance = GananciasValores.findAll().get(0)
        def retorno = 0
        if(comprobante.tipoComprobante==TipoComprobante.ORDENVENTA){
            def minimoRetencion
            def minimoRetener
            def porcentaje

            if (comprobante.clienteOrigen.gananciasIns){

                if(comprobante.clienteOrigen.situacionIVA.codigo=='IRI'){
                    minimoRetencion = valoresGananciasInstance.minRetencionIns
                    minimoRetener = valoresGananciasInstance.minRetenerIns
                    porcentaje = valoresGananciasInstance.porcentajeIns

                    if((subTotal-minimoRetencion)>minimoRetener){
                        retorno = subTotal-minimoRetencion
                        retorno = retorno * porcentaje / 100
                    }
                }else{
                    minimoRetencion = valoresGananciasInstance.minRetencionNoIns
                    minimoRetener = valoresGananciasInstance.minRetenerNoIns
                    porcentaje = valoresGananciasInstance.porcentajeNoIns
                    retorno = retorno * porcentaje/100
                }
            }
            return retorno
        }
        return retorno
    }

    static transients = ['subTotal','subTotalGanancias']

    static constraints = {
        porcentajeBruto(nullable:true,blank:true)
        porcentajeGastos(nullable: true,blank:true)
        porcentajeIva(nullable: true, blank:true)
        anticipo(nullable: true,blank:true)
    }
}
