import com.rural.ganaderia.Especie
import com.rural.ganaderia.Raza
import grails.util.Environment
//import org.codehaus.groovy.grails.commons.ApplicationHolder
import com.rural.ganaderia.localizacion.Provincia
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.Exposicion
import com.rural.ganaderia.AnioExposicion
import com.rural.ganaderia.Cliente
import com.rural.ganaderia.Operacion
import com.rural.ganaderia.Numerador
import com.rural.ganaderia.enums.TipoNumerador
import com.rural.ganaderia.Categoria
import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.Destino
import com.rural.ganaderia.FormasdePago
import com.rural.ganaderia.Gasto
import com.rural.ganaderia.RegimenGanancia
import com.rural.ganaderia.enums.TipoOrden
import com.rural.ganaderia.seguridad.Role
import com.rural.ganaderia.seguridad.User
import com.rural.ganaderia.seguridad.UserRole

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
    
    void inicioNumerador(){
        def numerador = Numerador.findByTipoNumerador(TipoNumerador.ORDEN_COMPRA)
        if(!numerador){
            new Numerador(tipoNumerador: TipoNumerador.ORDEN_COMPRA,maximoNumero: 1).save(failOnError: true)
        }
        numerador = Numerador.findByTipoNumerador(TipoNumerador.ORDEN_VENTA)
        if(!numerador){
            new Numerador(tipoNumerador: TipoNumerador.ORDEN_VENTA,maximoNumero: 1).save(failOnError: true)
        }

    }

    void datosprueba(){
        def userAdmin = null
        userAdmin = User.findByUsername('useradmin')
        if(!userAdmin){
            userAdmin = new User(username: 'useradmin',password: 'useradmin',).save(failOnError: true)
            def adminRole = Role.findByAuthority('ROLE_ADMIN')
            if (!adminRole){
                adminRole = new Role(authority: 'ROLE_ADMIN').save(failOnError: true)
                //if(!userAdmin.authorities.contains(adminRole))
            }
            UserRole.create(userAdmin,adminRole)
        }


            //if(ApplicationHolder.application.config.dataSource.dbCreate == "create-drop"){
        /*
                def especie = new Especie(nombre: "BOVINO",porcentajeIVA: 10.5)
                def categoria = new Categoria(nombre: "CATEGORIA 1 - BOVINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 1 - BOVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 1 - BOVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 1 - BOVINO"))
                especie.addToCategorias(categoria)

                categoria = new Categoria(nombre: "CATEGORIA 2 - BOVINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 2 - BOVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 2 - BOVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 2 - BOVINO"))
                especie.addToCategorias(categoria)


                categoria = new Categoria(nombre: "CATEGORIA 3 - BOVINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 3 - BOVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 3 - BOVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 3 - BOVINO"))
                especie.addToCategorias(categoria)

                especie.save(failOnError: true)
                //------------------------------------------------------------------

                especie = new Especie(nombre: "PORCINO",porcentajeIVA: 21)
                categoria = new Categoria(nombre: "CATEGORIA 1 - PORCINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 1 - PORCINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 1 - PORCINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 1 - PORCINO"))
                especie.addToCategorias(categoria)

                categoria = new Categoria(nombre: "CATEGORIA 2 - PORCINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 2 - PORCINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 2 - PORCINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 2 - PORCINO"))
                especie.addToCategorias(categoria)


                categoria = new Categoria(nombre: "CATEGORIA 3 - PORCINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 3 - PORCINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 3 - PORCINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 3 - PORCINO"))
                especie.addToCategorias(categoria)

                especie.save(failOnError: true)
                //----------------------


                //------------------------------------------------------------------

                especie = new Especie(nombre: "OVINO",porcentajeIVA: 10.5)
                categoria = new Categoria(nombre: "CATEGORIA 1 - OVINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 1 - OVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 1 - OVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 1 - OVINO"))
                especie.addToCategorias(categoria)

                categoria = new Categoria(nombre: "CATEGORIA 2 - OVINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 2 - OVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 2 - OVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 2 - OVINO"))
                especie.addToCategorias(categoria)


                categoria = new Categoria(nombre: "CATEGORIA 3 - OVINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 3 - OVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 3 - OVINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 3 - OVINO"))
                especie.addToCategorias(categoria)

                especie.save(failOnError: true)
                //----------------------

                //------------------------------------------------------------------

                especie = new Especie(nombre: "EQUINO",porcentajeIVA: 21,regimen2daVenta: true)
                categoria = new Categoria(nombre: "CATEGORIA 1 - EQUINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 1 - EQUINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 1 - EQUINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 1 - EQUINO"))
                especie.addToCategorias(categoria)

                categoria = new Categoria(nombre: "CATEGORIA 2 - EQUINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 2 - EQUINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 2 - EQUINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 2 - EQUINO"))
                especie.addToCategorias(categoria)


                categoria = new Categoria(nombre: "CATEGORIA 3 - EQUINO")
                categoria.addToRazas(new Raza(nombre: "RAZA 1- CATEGORIA 3 - EQUINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 2- CATEGORIA 3 - EQUINO"))
                categoria.addToRazas(new Raza(nombre: "RAZA 3- CATEGORIA 3 - EQUINO"))
                especie.addToCategorias(categoria)

                especie.save(failOnError: true)
                //----------------------


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
                
                new Operacion(nombre: "Remate").save(failOnError: true)
                new Operacion(nombre: "Hacienda").save(failOnError: true)
                new Operacion(nombre: "Reventa").save(failOnError: true)

                //--------------------------

                new Destino(descripcion:"Faena").save()
                new Destino(descripcion:"Invernada o cría").save()
                new Destino(descripcion:"Puro Pedigree").save()
                new Destino(descripcion:"Puro Pedigree Cruza").save()
                new Destino(descripcion:"Puro Registrado").save()
                new Destino(descripcion:"Reproductores").save()
                new Destino(descripcion:"Reventa").save()
                new Destino(descripcion:"Tambo").save()
                
                new Exposicion(nombre:"EXPO TUCUMAN 2014").save()
                new FormasdePago(descripcion:"CONTADO",porcentajeDescuento: 10).save()
                new FormasdePago(descripcion: "A Plazos",tieneVencimientos: true).save()
                
                new Gasto(descripcion: "Comision",restaBaseImponible: true).save()
                new Gasto(descripcion: "Asociacion Brangus").save()
                new Gasto(descripcion:"Sellado").save()

                new RegimenGanancia(descripcion: "Retención Bienes Muebles",montoImponible: 12000,porcentajeRI: 2
                        ,porcentajeRNI: 10).save()

                new Cliente(cuit: '23',fechaAlta: new java.sql.Date(new java.util.Date().getTime())
                          ,razonSocial: 'PROBANDO CLIENTE',telefono1: 'telefono1',telefono2: 'telefono2',email:'correo@mail.com'
                          ,localidad: Localidad.load(1),direccion: 'DIRECCION',nombreRepresentante: 'NOMBRE REPRESENTANTE'
                        ,apellidoRepresentante: 'APELLIDO REPRESENTANTE',telefonoRepresentante1: 'tel.rep1'
                        ,telefonoRepresentante2: 'TEL.REP2',telefonoRepresentante3: 'TEL.REP3'
                        ,ingresosBrutos: '123456'
                        ,situacionIVA: SituacionIVA.IVA).save(failOnError: true)


                new Numerador(tipoOrden: TipoOrden.COMPRA_A,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.COMPRA_B,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.VENTA_A,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.VENTA_B,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.NOTA_CREDITO_A,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.NOTA_CREDITO_B,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.NOTA_DEBITO_A,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.NOTA_DEBITO_B,maximoNumero: 1).save(failOnError: true)
                new Numerador(tipoOrden: TipoOrden.NUMERO_OPERACION).save(failOnError: true)

                 */
            //}

    }
}
