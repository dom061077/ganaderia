package com.rural.ganaderia.comp

import com.rural.ganaderia.Gasto

class ComprobanteGasto {
    Gasto gasto
    BigDecimal importe
    BigDecimal porcentaje
    boolean acumulaBaseIva
    boolean tieneIva
    boolean acumulaGanancia
    
    static constraints = {
    }
}
