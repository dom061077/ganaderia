package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden

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
    String guias

    //--Gastos de Venta
    BigDecimal auspicioBrangus
    BigDecimal colegioMartilleros
    BigDecimal comision
    
    //---Impuestos-----
    BigDecimal gananciaInsc1
    java.sql.Date gananciaInscVto1
    BigDecimal gananciaInsc2
    java.sql.Date gananciaInscVto2
    BigDecimal gananciaInsc3
    java.sql.Date gananciaInscVto3
    //----Vencimientos y pagos---
    BigDecimal pago1
    java.sql.Date vencimiento1
    BigDecimal pago2
    java.sql.Date vencimiento2
    BigDecimal pago3
    java.sql.Date vencimiento3
    BigDecimal pago4
    java.sql.Date vencimiento4

    static hasMany = [detalle:DetalleOrden]

    static constraints = {
        exposicion(nullable: false,blank:false)
        cliente(nullable: false,blank:false)
        anioExposicion(nullable: false,false:false)
        auspicioBrangus(nullable:true)
        colegioMartilleros(nullable: true)
        comision(nullable: true)
        
    }

    static mapping = {
        cliente(cascade: 'save-update')
    }

}
