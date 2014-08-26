package com.rural.ganaderia

class Gasto {

    String descripcion
    BigDecimal porcentaje
    BigDecimal monto
    Orden orden

    static belongsTo = [orden:Orden]

    static constraints = {
    }
}
