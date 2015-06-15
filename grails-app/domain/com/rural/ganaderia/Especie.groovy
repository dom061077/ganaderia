package com.rural.ganaderia

class Especie {
    String nombre
    boolean evaluaIvaen2daVenta = false
    BigDecimal porcentajeIVA
    String codigo
    String codigoIva
    static hasMany = [categorias:Categoria,razas:Raza]

    static constraints = {
        nombre (blank:false,nullable:false,unique:true,maxLength:50)
    }
}
