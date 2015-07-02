package com.rural.ganaderia

import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.SituacionIVA

class Cliente {
    String codigo
    String direccion
    String email
    String telefono1
    String telefono2
    //datos fiscales para la facturaci�n
    String cuit
    String razonSocial //apellido y nombre del expositor o raz�n social
    String ingresosBrutos
    SituacionIVA situacionIVA
    boolean gananciasIns

    String codigoPostal

    java.sql.Date fechaAlta =  new java.sql.Date(new java.util.Date().getTime())
    Localidad localidad


    static constraints = {
        cuit(unique: true)
        direccion(maxSize: 60,nullable: true,blank: true)
        ingresosBrutos(nullable: true, blank: true)
        email(email: true,nullable: true,blank: true,maxSize: 50)
        telefono1(nullable: true,maxSize: 20,blank: true)
        telefono2(maxSize: 20,nullable: true, blank: true)
        //datos fiscales para la facturaci�n          23-26138236-9
        cuit(lenght:13 )
        razonSocial(maxSize: 60) //apellido y nombre del expositor o raz�n social
        codigoPostal(minSize: 4, maxSize: 10,nullable: true,blank: true)
        localidad(nullable: true,blank:true)

    }
}
