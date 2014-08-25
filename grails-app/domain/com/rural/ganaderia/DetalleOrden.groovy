package com.rural.ganaderia

class DetalleOrden {
    Orden orden
    Cliente cliente
    Raza raza
    
    String datosCorral
    
    BigDecimal precio
    Integer cantidad
    Integer peso
    


    static belongsTo = [orden:Orden]
    static constraints = {
    }
}
