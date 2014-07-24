package com.rural.ganaderia

class Raza {
    
    String nombre
    Especie especie

    static belongsTo = [especie:Especie]

    static constraints = {
        nombre (blank:false,nullable:false,unique:true,maxLength:50)
    }
}
