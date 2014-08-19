import com.rural.ganaderia.Especie
import com.rural.ganaderia.Raza
import grails.util.Environment
import org.codehaus.groovy.grails.commons.ApplicationHolder
import com.rural.ganaderia.localizacion.Provincia
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.Exposicion
import com.rural.ganaderia.AnioExposicion
import com.rural.ganaderia.Cliente
import com.rural.ganaderia.CondicionOperacion

class BootStrap {

    def init = { servletContext ->
        switch (Environment.current){
            case Environment.DEVELOPMENT:
                datosprueba()
                break;
            case Environment.PRODUCTION:
                break;

        }
    }
    def destroy = {
    }

    void datosprueba(){
            if(ApplicationHolder.application.config.dataSource.dbCreate == "create-drop"){
                def especie = new Especie(nombre: "BOVINO")
                especie.addToRazas(new Raza(nombre: "RAZA BOVINO 1"))
                especie.addToRazas(new Raza(nombre: "RAZA BOVINO 2"))
                especie.addToRazas(new Raza(nombre: "RAZA BOVINO 3"))
                especie.save(failOnError: true)
                especie = new Especie(nombre: "EQUINO")
                especie.addToRazas(new Raza(nombre: "RAZA EQUINO 1"))
                especie.addToRazas(new Raza(nombre: "RAZA EQUINO 2"))
                especie.addToRazas(new Raza(nombre: "RAZA EQUINO 3"))
                especie.save(failOnError: true)
                especie = new Especie(nombre: "PORCINO")
                especie.addToRazas(new Raza(nombre: "RAZA PORCINO 1"))
                especie.addToRazas(new Raza(nombre: "RAZA PORCINO 2"))
                especie.addToRazas(new Raza(nombre: "RAZA PORCINO 3"))
                especie.save(failOnError: true)
                especie = new Especie(nombre: "VACUNO")
                especie.addToRazas(new Raza(nombre: "RAZA VACUNO 1"))
                especie.addToRazas(new Raza(nombre: "RAZA VACUNO 2"))
                especie.addToRazas(new Raza(nombre: "RAZA VACUNO 3"))
                especie.save(failOnError: true)

                def provincia = new Provincia(nombre:"TUCUMAN").save(failOnError: true)
                new Localidad(nombre: 'S.M DE TUCUMAN',provincia: provincia).save(failOnError: true)
                new Localidad(nombre:'LEALES',provincia: provincia).save(failOnError: true)
                new Localidad(nombre: 'TAFI VIEJO',provincia: provincia).save(failOnError: true)
                new Localidad(nombre: 'TAFI DEL VALLE',provincia: provincia).save(failOnError: true)
                provincia = new Provincia(nombre:"SANTIAGO DEL ESTERO").save(failOnError: true)
                new Localidad(nombre: 'SANTIAGO CAPITAL',provincia: provincia).save(failOnError: true)
                new Localidad(nombre: 'SANTIAGGO LA BANDA',provincia: provincia).save(failOnError: true)
                new Localidad(nombre: 'RAPELLI',provincia: provincia).save(failOnError: true)
                provincia = new Provincia(nombre: 'SALTA',provincia:provincia).save(failOnError: true)
                new Localidad(nombre: 'SALTA CAPITAL',provincia: provincia).save(failOnError: true)
                new Localidad(nombre: 'ORAN',provincia: provincia).save(failOnError: true)
                new Localidad(nombre: 'TARTAGAL',provincia: provincia).save(failOnError: true)
                
                //-----------------------
                new Exposicion(nombre: "EXPO TUCUMAN").save(failOnError: true)
                new Exposicion(nombre: "EXPO LACTEA").save(failOnError: true)
                new Exposicion(nombre: "EXPO CONSTRUCCION").save(failOnError: true)
                new AnioExposicion(anio: 2013).save(failOnError: true)
                new AnioExposicion(anio: 2012).save(failOnError: true)
                new AnioExposicion(anio: 2014).save(failOnError: true)
                
                new CondicionOperacion(nombre: "A Plazos").save(failOnError: true)
                new CondicionOperacion(nombre: "Sin Plazo").save(failOnError: true)
                new CondicionOperacion(nombre: "Condición").save(failOnError: true)

                //--------------------------
                new Cliente(cuit: '23-26138236-9',fechaAlta: new java.sql.Date(new java.util.Date().getTime())
                          ,razonSocial: 'PROBANDO CLIENTE',telefono1: 'telefono1',telefono2: 'telefono2',email:'correo@mail.com'
                          ,localidad: Localidad.load(1),direccion: 'DIRECCION',nombreRepresentante: 'NOMBRE REPRESENTANTE'
                        ,apellidoRepresentante: 'APELLIDO REPRESENTANTE',telefonoRepresentante1: 'tel.rep1'
                        ,telefonoRepresentante2: 'TEL.REP2',telefonoRepresentante3: 'TEL.REP3').save(failOnError: true)


            }

    }
}
