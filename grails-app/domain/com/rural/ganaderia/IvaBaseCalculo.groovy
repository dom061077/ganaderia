package com.rural.ganaderia

import com.rural.ganaderia.enums.TipoOrden

class IvaBaseCalculo {
    String descripcion
    char letraComprobante
    SituacionIVA situacionIVA
    Especie especie
    Destino destino
    TipoOrden tipoOrden

    BigDecimal alicuota

    static constraints = {
    }
}
