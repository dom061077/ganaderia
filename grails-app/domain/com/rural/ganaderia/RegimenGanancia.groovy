package com.rural.ganaderia

class RegimenGanancia {
    String descripcion
    BigDecimal montoImponible
    BigDecimal porcentajeRI
    BigDecimal porcentajeRNI
    static constraints = {
    }

    static RegimenGanancia getInstance(){
        def regimenGananciaInstance = RegimenGanancia.list().get(0)
        return regimenGananciaInstance
    }
}

