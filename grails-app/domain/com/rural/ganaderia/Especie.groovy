package com.rural.ganaderia

class Especie {
    String nombre
    boolean evaluaIvaen2daVenta = false
    BigDecimal porcentajeIVA
    static hasMany = [categorias:Categoria]

    static constraints = {
        nombre (blank:false,nullable:false,unique:true,maxLength:50)
    }
}
