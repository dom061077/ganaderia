package com.rural.ganaderia.comp

import com.rural.ganaderia.Gasto

class ComprobanteGasto {
    Comprobante comprobante
    Gasto gasto
    BigDecimal importe
    BigDecimal porcentaje
    boolean acumulaBaseIva
    boolean tieneIva
    boolean acumulaGanancia

    static belongsTo = [comprobante:Comprobante]
    
    static constraints = {
    }
}
