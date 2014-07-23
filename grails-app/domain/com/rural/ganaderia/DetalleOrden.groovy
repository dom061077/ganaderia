package com.rural.ganaderia

class DetalleOrden {
    Orden orden
    
    Ganado ganado
    
    String descripcionGanado
    
    BigDecimal precio
    Integer cantidad
    Integer peso
    


    static belongsTo = [orden:Orden]
    static constraints = {
    }
}
