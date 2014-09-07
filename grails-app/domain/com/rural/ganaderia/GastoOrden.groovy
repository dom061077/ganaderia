package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden

class GastoOrden {

    Gasto gasto
    BigDecimal porcentaje
    BigDecimal monto
    Orden orden

    public getSubTotal(){
        def subTotalCalc
        if(porcentaje>0)
            subTotalCalc = porcentaje * orden.subTotal/100
        else
            subTotalCalc = monto
        if(orden.tipoOrden==TipoOrden.VENTA_A || orden.tipoOrden==TipoOrden.VENTA_B)
            subTotalCalc = subTotalCalc * (-1)

        return subTotalCalc
    }

    static transients = ['subTotal']

    static belongsTo = [orden:Orden]

    static constraints = {
    }
}
