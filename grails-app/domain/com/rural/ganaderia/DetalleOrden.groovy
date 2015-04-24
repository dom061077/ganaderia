package com.rural.ganaderia

class DetalleOrden {
    Orden orden
    Cliente cliente
    Categoria categoria
    Raza raza

    
    String datosCorral
    
    BigDecimal precio
    Integer cantidad
    Integer peso

    BigDecimal getSubTotal(){
        return(cantidad>0?cantidad*precio:peso*precio)
    }

    static transients = ['subTotal']

    static belongsTo = [orden:Orden]
    static constraints = {
        datosCorral(nullable: true, blank: true)
    }
}
