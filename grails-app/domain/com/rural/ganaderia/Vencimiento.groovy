package com.rural.ganaderia

class Vencimiento {
    java.sql.Date vencimiento
    int cantidadDias
    BigDecimal importePagoGanacias
    Orden orden
    
    static belongsTo = [orden:Orden]
    
    static constraints = {
    }
}
