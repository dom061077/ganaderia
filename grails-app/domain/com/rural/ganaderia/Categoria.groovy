package com.rural.ganaderia

class Categoria {
    Especie especie
    String nombre

    static belongsTo = [especie:Especie]
    static hasMany = [razas : Raza]

    static constraints = {
        nombre(nullavalue:false,blank: false, maxSize: 50)
        especie(nullable: false)
    }
}
