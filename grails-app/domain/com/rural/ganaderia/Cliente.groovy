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

    java.sql.Date fechaAlta
    Localidad localidad
    String telefonoRepresentante1;
    String telefonoRepresentante2;
    String telefonoRepresentante3;


    static constraints = {
        nombreRepresentante(nullable:false, blank: false,maxSize: 60)
        apellidoRepresentante(nullable: false,blank: false,maxSize: 60)
        direccion(maxSize: 60)
        email(email: true,nullable: false,blank: false,maxSize: 50)
        telefono1(nullable: false,maxSize: 20,blank: false)
        telefono2(maxSize: 20)
        cargoRep(maxSize: 60)//cargo representante
        dniRep(maxSize: 8)
        //datos fiscales para la facturaci�n          23-26138236-9
        cuit(lenght:13 )
        razonSocial(maxSize: 60) //apellido y nombre del expositor o raz�n social
        codigoPostal(minSize: 4, maxSize: 10)

        localidad(nullable: false,blank:false)
        telefonoRepresentante1(maxSize: 20)
        telefonoRepresentante2(maxSize: 20)
        telefonoRepresentante3(maxSize: 20)

    }
}
