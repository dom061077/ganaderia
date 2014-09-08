package com.rural.ganaderia

class Vencimiento {
    java.sql.Date vencimiento
    int cantidadDias
    BigDecimal porcentajeBruto
    BigDecimal porcentajeGastos
    BigDecimal porcentajeIva

    //BigDecimal importePagoGanacias
    Orden orden
    
    BigDecimal getImportePagoGanancias(){
        def totalGanancias = orden.ganancias
        def cantPagos = orden.cantidadVenc
        return totalGanancias/cantPagos
    }
    
    static transients = ['importePagoGanancias']
    static belongsTo = [orden:Orden]
    
    static constraints = {
    }
}
