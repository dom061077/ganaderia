package com.rural.ganaderia

class Orden {
    Cliente cliente
    java.sql.Date fechaAlta

    static hasMany = [detalle:DetalleOrden]

    static constraints = {
    }
}
