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
    //BigDecimal subTotalGanancias = new BigDecimal(0)
    


    static belongsTo = [comprobante:Comprobante]








    BigDecimal getSubTotalGanancias(){
        def valoresGananciasInstance = GananciasValores.findAll().get(0)
        def retorno = 0
        if(comprobante.tipoComprobante==TipoComprobante.ORDENVENTA){
            def minimoRetencion
            def minimoRetener
            def porcentaje

            if (comprobante.ganaciasIns){
                def subTotalBruto = comprobante.importeBruto * porcentajeBruto / 100
                def subTotalGastos = comprobante.totalGastos * porcentajeGastos / 100
                def subTotalIva = comprobante.iva * porcentajeIva / 100
                def baseG=0
                if (comprobante.ganaciasIns){
                    baseG = subTotalBruto - subTotalGastos + subTotalIva //el gasto resta si acumula base ganancias

                }


                if(comprobante.situacionIVA.codigo=='IRI'){
                    minimoRetencion = valoresGananciasInstance.minRetencionIns
                    minimoRetener = valoresGananciasInstance.minRetenerIns
                    porcentaje = valoresGananciasInstance.porcentajeIns

                    if((baseG-minimoRetencion)>minimoRetener){
                        retorno = baseG-minimoRetencion
                        retorno = retorno * porcentaje / 100
                        if(retorno<20)
                            retorno = 0
                    } else
                        retorno = 0
                }else{
                    minimoRetencion = valoresGananciasInstance.minRetencionNoIns
                    minimoRetener = valoresGananciasInstance.minRetenerNoIns
                    porcentaje = valoresGananciasInstance.porcentajeNoIns
                    retorno = baseG-minimoRetencion
                    retorno = retorno * porcentaje/100
                    if(retorno<10)
                         retorno
                }
            }
            return retorno
        }
        return retorno
    }

    BigDecimal getSubTotal(){
        def subTotalBruto = comprobante.importeBruto * porcentajeBruto / 100
        def subTotalGastos = comprobante.totalGastos * porcentajeGastos / 100
        def subTotalIva = comprobante.iva * porcentajeIva / 100
        if(comprobante.tipoComprobante==TipoComprobante.ORDENVENTA){

            return subTotalBruto + subTotalIva - subTotalGastos  - subTotalGanancias
        }else
            return subTotalBruto + subTotalGastos + subTotalIva
    }

    String getMembreteGanancias(){
        def retorno = ""
        if(comprobante.clienteOrigen.gananciasIns){
            retorno="Ganancias Inscripto - (DB) - 2%"
        }
        return retorno
    }
    
    String getMembreteVencimiento(){
        def retorno=""
        retorno="Al "+vencimiento+" ($cantidadDias días)"
        return retorno
    }
    

    static transients = ['membreteGanancias','membreteVencimiento','subTotalGanancias','subTotal']

    static constraints = {
        porcentajeBruto(nullable:false,blank:false,minValue: 1,maxValue: 100)
        porcentajeGastos(nullable: false,blank:false,minValue: 1,maxValue: 100)
        porcentajeIva(nullable: false, blank:false,minValue: 1,maxValue: 100)
        anticipo(nullable: true,blank:true)
    }
}
