package com.rural.ganaderia

class Categoria {
    String codigo //codigo legacy
    Especie especie
    String nombre

    static belongsTo = [especie:Especie]

    static constraints = {
        nombre(nullavalue:false,blank: false, maxSize: 50)
        especie(nullable: false)
    }
}
