package com.rural.ganaderia

import com.rural.ganaderia.localizacion.Localidad

class Cliente {
    String apellidoRepresentante
    String nombreRepresentante
    String direccion
    String email
    String telefono1
    String telefono2
    String cargoRep//cargo representante
    String dniRep


    //datos fiscales para la facturaci�n
    String cuit
    String razonSocial //apellido y nombre del expositor o raz�n social
    String codigoPostal

    java.sql.Date fechaAlta =  new java.sql.Date(new java.util.Date().getTime())
    Localidad localidad
    String telefonoRepresentante1;
    String telefonoRepresentante2;
    String telefonoRepresentante3;


    static constraints = {
        nombreRepresentante(nullable:true, blank: true,maxSize: 60)
        apellidoRepresentante(nullable: true,blank: true,maxSize: 60)
        direccion(maxSize: 60,nullable: true,blank: true)
        email(email: true,nullable: true,blank: true,maxSize: 50)
        telefono1(nullable: true,maxSize: 20,blank: true)
        telefono2(maxSize: 20,nullable: true, blank: true)
        cargoRep(maxSize: 60,nullable: true,blank: true)//cargo representante
        dniRep(maxSize: 8,nullable: true, blank: true)
        //datos fiscales para la facturaci�n          23-26138236-9
        cuit(lenght:13 )
        razonSocial(maxSize: 60) //apellido y nombre del expositor o raz�n social
        codigoPostal(minSize: 4, maxSize: 10,nullable: true,blank: true)

        localidad(nullable: true,blank:true)
        telefonoRepresentante1(maxSize: 20,nullable: true,blank: true)
        telefonoRepresentante2(maxSize: 20,nullable: true, blank: true)
        telefonoRepresentante3(maxSize: 20,nullable: true, blank: true)

    }
}
