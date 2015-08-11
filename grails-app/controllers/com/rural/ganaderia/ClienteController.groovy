package com.rural.ganaderia

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.deep.JSON
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.context.MessageSource
import grails.converters.JSON
import com.rural.ganaderia.localizacion.Localidad

class ClienteController {
    MessageSource  messageSource

  //  static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        [clienteInstanceList: Cliente.list(params), clienteInstanceTotal: Cliente.count()]
    }

    def create() {
        [clienteInstance: new Cliente(params)]
    }


    def save() {
        def clienteInstance = new Cliente(params)
        if (!clienteInstance.save(flush: true)) {
            render(view: "create", model: [clienteInstance: clienteInstance])
            return
        }

        flash.message = message(code: 'default.created.message', args: [message(code: 'cliente.label', default: 'Cliente'), clienteInstance.id])
        redirect(action: "show", id: clienteInstance.id)
    }

    def show(Long id) {
        def clienteInstance = Cliente.get(id)
        if (!clienteInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'cliente.label', default: 'Cliente'), id])
            redirect(action: "list")
            return
        }

        [clienteInstance: clienteInstance]
    }

    def edit(Long id) {
        def clienteInstance = Cliente.get(id)
        if (!clienteInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'cliente.label', default: 'Cliente'), id])
            redirect(action: "list")
            return
        }

        [clienteInstance: clienteInstance]
    }

    def update(Long id, Long version) {
        def clienteInstance = Cliente.get(id)
        if (!clienteInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'cliente.label', default: 'Cliente'), id])
            redirect(action: "list")
            return
        }

        if (version != null) {
            if (clienteInstance.version > version) {
                clienteInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                        [message(code: 'cliente.label', default: 'Cliente')] as Object[],
                        "Another user has updated this Cliente while you were editing")
                render(view: "edit", model: [clienteInstance: clienteInstance])
                return
            }
        }

        clienteInstance.properties = params

        if (!clienteInstance.save(flush: true)) {
            render(view: "edit", model: [clienteInstance: clienteInstance])
            return
        }

        flash.message = message(code: 'default.updated.message', args: [message(code: 'cliente.label', default: 'Cliente'), clienteInstance.id])
        redirect(action: "show", id: clienteInstance.id)
    }

    def delete(Long id) {
        def clienteInstance = Cliente.get(id)
        if (!clienteInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'cliente.label', default: 'Cliente'), id])
            redirect(action: "list")
            return
        }

        try {
            clienteInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'cliente.label', default: 'Cliente'), id])
            redirect(action: "list")
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'cliente.label', default: 'Cliente'), id])
            redirect(action: "show", id: id)
        }
    }
    
    //-----------------json return-------------
    def listjson(){
        log.info("PARAMETROS: "+params+" devueltos")
        def hashJson = [:]
        def listRows = []
        def clientes = Cliente.createCriteria().list{
            if(params.query){
                ilike("razonSocial",'%'+params.query+'%')
            }
            order("razonSocial","asc")
        }

        clientes.each{
            listRows << [id:it.id,nombre:it.razonSocial,cuit:it.cuit]
        }
        hashJson.success = true
        hashJson.rows = listRows
        render hashJson as JSON
    }

    def updatejson(long id){
        log.info("Parametros: "+params)
        def objJson = [:]
        def errorList = []
        def clienteInstance = Cliente.get(id)
        if (clienteInstance){
            clienteInstance.properties = params
            if (clienteInstance.save(flush: true)){
                objJson.idCliente = clienteInstance.id
                objJson.nombre = clienteInstance.razonSocial
                objJson.errors = errorList
                objJson.success = true
            }else{
                objJson.idCliente = null
                objJson.msgError = "Error de validación:"
                clienteInstance.errors.allErrors.each{
                    errorList << [msg:messageSource.getMessage(it,LocaleContextHolder.locale)]
                }
                objJson.errors=errorList
                objJson.success = false
            }
        }else{
            objJson.idCliente = null
            objJson.msgError = "Error de integridad"
            errorList << [msg: "No se encontró el cliente con Identificador: "+idCliente]
        }
        render objJson as grails.converters.JSON
    }
    
    def savejson(){
        log.info("Parametros: "+request.JSON)
        def clienteParam = request.JSON
        def objJson = [:]
        def errorList = []
        def clienteInstance
        
        if(clienteParam.idCliente)
            clienteInstance = Cliente.get(clienteParam.idCliente)
        else
            clienteInstance = new Cliente()
        clienteInstance.cuit = clienteParam.cuit
        clienteInstance.direccion = clienteParam.direccion
        clienteInstance.email = clienteParam.email
        clienteInstance.telefono1 = clienteParam.telefono1
        clienteInstance.telefono2 = clienteParam.telefono2
        clienteInstance.gananciasIns = clienteParam.ganananciasIns
        clienteInstance.direccion = clienteParam.direccion
        clienteInstance.ingresosBrutos = clienteParam.ingeresosBrutos

        def localidadInstance = Localidad.get(clienteParam.localidad)
        clienteInstance.localidad = localidadInstance



        clienteInstance.situacionIVA = SituacionIVA.load(clienteParam.situacionIVA)
        clienteInstance.razonSocial = clienteParam.razonSocial

        if (clienteInstance.save()){
           objJson.idCliente = clienteInstance.id
           objJson.nombre = clienteInstance.razonSocial
           objJson.errors = errorList
           objJson.success = true
        }else{
           objJson.idCliente = null
           objJson.msgError = "Error de validación:"
           clienteInstance.errors.allErrors.each{
               //log.debug "ERROR: "+it
               errorList << [msg:messageSource.getMessage(it,LocaleContextHolder.locale)]
           }
           objJson.errors=errorList
           objJson.success = false
        }
        render objJson as grails.converters.JSON
    }
    
    def getdatosjson(String cuitDni){
        log.info("Parametros: "+cuitDni)
        def objJson = [:]
        Cliente clienteInstance  
        if (cuitDni)
            clienteInstance =  Cliente.findByCuit(cuitDni);
        if(!clienteInstance)
            clienteInstance = new Cliente()
        objJson.id = clienteInstance.id
        objJson.razonSocial = clienteInstance.razonSocial
        objJson.situacionIVA = [name:clienteInstance.situacionIVA.name,descripcion: clienteInstance.situacionIVA.name.toString()]
        objJson.cuit = clienteInstance.cuit
        objJson.direccion = clienteInstance.direccion
        objJson.ingresosBrutos = clienteInstance.ingresosBrutos
        objJson.localidad = [id:clienteInstance.localidad.id,codigoPostal:clienteInstance.localidad?.codigoPostal
                           ,nombre: clienteInstance.localidad?.nombre
                           ,provincia: [id:clienteInstance.localidad?.provincia?.id,nombre: clienteInstance.localidad?.provincia?.nombre]]

        render objJson as grails.converters.JSON
        //JSON.use("deep"){
        //    render clienteInstance as JSON
        //}
    }
    
    def getdatosjsonbyid(long id){
        Cliente clienteInstance
        if (id)
            clienteInstance =  Cliente.load(id);
        if(!clienteInstance)
            clienteInstance = new Cliente()

        JSON.use("deep"){
            render clienteInstance as JSON
        }
        
    }
    
    def listjsongrid(){
        log.debug('PARAMETROS: '+params)
        def sortJson
        if(params.sort)
            sortJson = JSON.parse(params.sort)
        def pagingConfig = [
                max: params.limit as Integer ?: 10,
                offset: params.start as Integer ?: 0
        ]
        def hashJson = [:]
        def data = []
        def clientes = Cliente.createCriteria().list(pagingConfig){
            ne("razonSocial","")
            if(params.query){
                or{
                    ilike("cuit","%"+params.query+"%")
                    ilike("razonSocial","%"+params.query+"%")
                }
            }
            if(sortJson){
                order(sortJson[0].property,sortJson[0].direction.toString().toLowerCase())
            }
        }
        clientes.each {
            data<<[idCliente: it.id,razonSocial:it.razonSocial,cuit:it.cuit
                    ,ingresosBrutos: it.ingresosBrutos,telefono1: it.telefono1,telefono2:it.telefono2
                    ,email:it.email,provincia:(it.localidad!=null?it.localidad.partido.provincia.id:null)
                    ,partido:(it.localidad!=null?it.localidad.partido.id:null)
                    ,localidad : (it.localidad!=null?it.localidad.id:null)
                    ,localidadNombre: (it.localidad!=null?it.localidad.nombre:null)
                    ,partido: (it.localidad!=null?it.localidad.partido.id:null)
                    ,partidoNombre: (it.localidad!=null?it.localidad.partido.nombre:null)
                    ,provincia: (it.localidad!=null?it.localidad.partido.provincia.id:null)
                    ,provinciaNombre: (it.localidad!=null?it.localidad.partido.provincia.nombre:null)
                    ,direccion:it.direccion
                    ,situacionIVA:it.situacionIVA?.descripcion]
        }

        def total = Cliente.createCriteria().get(){
            ne("razonSocial","")
            if(params.query){
                or{
                    ilike("cuit","%"+params.query+"%")
                    ilike("razonSocial","%"+params.query+"%")
                }
            }

            projections{
                count("id")
            }
        }
                
        hashJson.total=total
        hashJson.data = data
        render hashJson as JSON

    }


}
