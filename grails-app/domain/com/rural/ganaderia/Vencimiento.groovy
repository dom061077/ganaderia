package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden

class Vencimiento {
    java.sql.Date vencimiento
    int cantidadDias
    BigDecimal porcentajeBruto
    BigDecimal porcentajeGastos
    BigDecimal porcentajeIva
    BigDecimal anticipo


    //BigDecimal importePagoGanacias
    Orden orden
    
    BigDecimal getImportePagoGanancias(){
        def totalGanancias
        //def cantPagos = orden.cantidadVenc
        //return totalGanancias/cantPagos
        RegimenGanancia regimenGananciaInstance = RegimenGanancia.getInstance()
        if(importe>regimenGananciaInstance.montoImponible){

            if(orden.situacionIVA==SituacionIVA.IVA  && orden.tipoOrden == TipoOrden.VENTA_A){
                  totalGanancias = regimenGananciaInstance.porcentajeRI * (importe-regimenGananciaInstance.montoImponible)/100

            }
            if(orden.situacionIVA!=SituacionIVA.IVA  && orden.tipoOrden == TipoOrden.VENTA_B){
                  totalGanancias = regimenGananciaInstance.porcentajeRNI * (importe-regimenGananciaInstance.montoImponible)/100

            }


        }
    }

    BigDecimal getImporte(){
        def importeRetornado=0
        if(porcentajeBruto>0)
            importeRetornado+=orden.subTotal*porcentajeBruto/100
        if(porcentajeGastos>0)
            importeRetornado+=orden.totalGastos*porcentajeGastos/100
        if(porcentajeIva>0)
            importeRetornado+=orden.iva*porcentajeIva/100
        if(anticipo>0)
            importeRetornado+=anticipo
        return importeRetornado
    }
    
    static transients = ['importePagoGanancias','importe']
    static belongsTo = [orden:Orden]
    
    static constraints = {                
        //porcentajeBruto(nullable:true)
        //porcentajeGastos(nullable:true)
        //porcentajeIva(nullable: true)
        //anticipo(nullable: true)
        //cantidadDias(nullable:true)
    }
}
