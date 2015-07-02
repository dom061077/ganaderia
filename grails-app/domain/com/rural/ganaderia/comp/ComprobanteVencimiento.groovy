package com.rural.ganaderia.comp

class ComprobanteVencimiento {
    java.sql.Date vencimiento
    int cantidadDias
    BigDecimal porcentajeBruto  = new BigDecimal(0)
    BigDecimal porcentajeGastos = new BigDecimal(0)
    BigDecimal porcentajeIva = new BigDecimal(0)
    BigDecimal anticipo = new BigDecimal(0)

    static constraints = {
    }
}
