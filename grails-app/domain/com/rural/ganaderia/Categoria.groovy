package com.rural.ganaderia

class Categoria {
    Especie especie
    String nombre

    static belongsTo = [especie:Especie]

    static constraints = {
        nombre(nullavalue:false,blank: false, maxSize: 50)
        especie(nullable: false)
    }
}
