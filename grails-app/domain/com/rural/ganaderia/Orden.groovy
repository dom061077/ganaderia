package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA

class Orden {
    Cliente cliente
    java.sql.Date fechaAlta = new java.sql.Date(new java.util.Date().getTime())
    Exposicion exposicion
    AnioExposicion anioExposicion
    SituacionIVA situacionIVA = SituacionIVA.IVA

    static hasMany = [detalle:DetalleOrden]

    static constraints = {
        exposicion(nullable: false,blank:false)
        cliente(nullable: false,blank:false)
        anioExposicion(nullable: false,false:false)
    }

    static mapping = {
        cliente(cascade: 'save-update')
    }

}
