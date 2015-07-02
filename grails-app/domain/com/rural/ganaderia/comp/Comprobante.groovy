package com.rural.ganaderia.comp

import com.rural.ganaderia.Cliente
import com.rural.ganaderia.Especie
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.Exposicion
import com.rural.ganaderia.AnioExposicion
import com.rural.ganaderia.Operacion
import com.rural.ganaderia.FormasdePago
import com.rural.ganaderia.Destino

class Comprobante {
    long numero
    char letra
    Cliente clienteOrigen
    Cliente clienteDestino
    
    Especie especie


    //-------------------datos el cliente que se persisten-----------
    String razonSocial
    Localidad localidad
    String direccion
    SituacionIVA situacionIVA = SituacionIVA.IVA
    String cuit
    String ingresosBrutos

    //----------------
    java.sql.Date fechaAlta = new java.sql.Date(new java.util.Date().getTime())
    Exposicion exposicion
    AnioExposicion anioExposicion
    Operacion operacion
    FormasdePago formasdePago
    int numeroOperacion
    String guias
    Destino destino
    Localidad procedencia
    java.sql.Date fechaOperacion
    
    Comprobante comprobanteDestino

    static hasMany = [detalle:ComprobanteDetalle, detallegastos:ComprobanteGasto
                        , detallevencimientos:ComprobanteVencimiento]

    static constraints = {
    }
}
