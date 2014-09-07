package com.rural.ganaderia

class Vencimiento {
    java.sql.Date vencimiento
    int cantidadDias
    BigDecimal porcentajeBruto
    BigDecimal porcentajeGastos
    BigDecimal porcentajeIva

    BigDecimal importePagoGanacias
    Orden orden
    
    static belongsTo = [orden:Orden]
    
    static constraints = {
    }
}
