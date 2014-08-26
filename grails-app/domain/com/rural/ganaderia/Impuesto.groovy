package com.rural.ganaderia

class Impuesto {
    String descripcion
    BigDecimal porcentaje
    java.sql.Date vencimiento
    Orden orden

    static belongsTo = [orden:Orden]

    static constraints = {
    }
}
