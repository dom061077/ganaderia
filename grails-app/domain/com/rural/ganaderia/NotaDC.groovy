package com.rural.ganaderia

import com.rural.ganaderia.enums.TipoOrden
import com.rural.ganaderia.enums.EstadoDocumento

class NotaDC {
    long numero
    String descripcion
    BigDecimal monto
    Orden orden
    TipoOrden tipo

    EstadoDocumento estado = EstadoDocumento.GENERADO

    static belongsTo = [orden:Orden]



    static constraints = {
    }
}
