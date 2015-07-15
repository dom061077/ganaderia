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
        def minimoRetencion
        if(comprobante.tipoComprobante==TipoComprobante.ORDENVENTA){
            if (comprobante.clienteOrigen.gananciasIns){
                if(comprobante.clienteOrigen.situacionIVA.codigo=='IRI'){
                    if((subTotal-valoresGananciasInstance.minRetencionIns)>20){

                    }
                }
            }
        }
    }

    static transients = ['subTotal','subTotalGanancias']

    static constraints = {
        porcentajeBruto(nullable:true,blank:true)
        porcentajeGastos(nullable: true,blank:true)
        porcentajeIva(nullable: true, blank:true)
        anticipo(nullable: true,blank:true)
    }
}
