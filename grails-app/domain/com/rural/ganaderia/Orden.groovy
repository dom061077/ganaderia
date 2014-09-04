package com.rural.ganaderia

import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden
import com.rural.ganaderia.localizacion.Localidad
import com.rural.ganaderia.enums.TipoNotaDC

class Orden {
    long numero
    TipoOrden tipoOrden
    Cliente cliente
    Orden ordenVenta
    static belongsTo = [ordenVenta:Orden]

    
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
    CondicionOperacion condicionOperacion
    Operacion operacion
    FormasdePago formasdePago
    int numeroOperacion
    String guias
    Destino destino
    Localidad procedencia
    java.sql.Date fechaOperacion
    boolean anulada = false
    boolean regimen2daVenta = false

    public getSubTotal(){//a esto le llaman total bruto, calculado sin los gastos
        def sumatoria=0
        detalle.each{
            sumatoria+=it.subTotal
        }
        return sumatoria
    }

    public getTotal(){
       def totalGastos=0
       def totalNotas=0
       detallegastos.each{
           totalGastos+=it.subTotal
       }
       notas.each {
           if (it.tipo==TipoNotaDC.CREDITO)
              totalNotas-=it.monto
           else
              totalNotas+=it.monto
       }
       return subTotal+totalGastos+totalNotas
    }


    static transients = ['subTotal','total']

    static hasMany = [detalle:DetalleOrden,detallegastos:GastoOrden,detallevencimientos:Vencimiento,ordenescompra:Orden,notas:NotaDC]

    static constraints = {
        exposicion(nullable: false,blank:false)
        cliente(nullable: false,blank:false)
        anioExposicion(nullable: false,false:false)

    }

    static mapping = {
        cliente(cascade: 'save-update')
    }

}
