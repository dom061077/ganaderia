package com.rural.ganaderia

class Raza {
    
    String nombre
    Categoria categoria

    static belongsTo = [categoria:Categoria]

    static constraints = {
        nombre (blank:false,nullable:false,unique:true,maxLength:50)
        categoria(nullable: false)
    }
}
