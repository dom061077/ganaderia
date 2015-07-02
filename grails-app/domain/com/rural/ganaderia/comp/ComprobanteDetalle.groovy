package com.rural.ganaderia.comp

import com.rural.ganaderia.Categoria
import com.rural.ganaderia.Raza

class ComprobanteDetalle {
    Comprobante comprobante
    Categoria categoria
    Raza raza
    String leyenda
    BigDecimal precio
    Integer cantidad
    Integer peso

    BigDecimal getSubTotal(){
        return(cantidad>0?cantidad*precio:peso*precio)
    }

    static transients = ['subTotal']


    static constraints = {
    }
}
