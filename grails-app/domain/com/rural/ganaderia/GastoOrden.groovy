package com.rural.ganaderia

class GastoOrden {

    Gasto gasto
    BigDecimal porcentaje
    BigDecimal monto
    Orden orden

    static belongsTo = [orden:Orden]


    static constraints = {
    }
}
