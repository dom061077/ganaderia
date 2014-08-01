package com.rural.ganaderia

class Orden {
    Cliente cliente
    java.sql.Date fechaAlta
    Exposicion exposicion
    AnioExposicion anioExposicion

    static hasMany = [detalle:DetalleOrden]

    static constraints = {
        exposicion(nullable: false,blank:false)
        cliente(nullable: false,blank:false)
    }
}
