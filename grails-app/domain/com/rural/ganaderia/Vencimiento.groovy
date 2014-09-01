package com.rural.ganaderia

class Vencimiento {
    java.sql.Date vencimiento
    BigDecimal monto
    BigDecimal importePagoGanacias
    Orden orden
    
    static belongsTo = [orden:Orden]
    
    static constraints = {
    }
}
