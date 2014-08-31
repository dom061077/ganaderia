package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden
import com.rural.ganaderia.localizacion.Localidad

class Orden {
    long numero
    TipoOrden tipoOrden
    Cliente cliente
    java.sql.Date fechaAlta = new java.sql.Date(new java.util.Date().getTime())
    Exposicion exposicion
    AnioExposicion anioExposicion
    SituacionIVA situacionIVA = SituacionIVA.IVA
    CondicionOperacion condicionOperacion
    Operacion operacion
    int numeroOperacion
    String guias
    Destino destino
    Localidad procedencia
    java.sql.Date fechaOperacion
    boolean anulada = false
    boolean regimen2daVenta = false


    static hasMany = [detalle:DetalleOrden,detallegastos:GastoOrden,detallevencimientos:Vencimiento]

    static constraints = {
        exposicion(nullable: false,blank:false)
        cliente(nullable: false,blank:false)
        anioExposicion(nullable: false,false:false)

    }

    static mapping = {
        cliente(cascade: 'save-update')
    }

}
