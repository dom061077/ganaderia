import com.rural.ganaderia.Especie
import com.rural.ganaderia.Raza
import grails.util.Environment
import org.codehaus.groovy.grails.commons.ApplicationHolder

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


            }

    }
}
