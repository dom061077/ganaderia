package com.rural.ganaderia

class Especie {
    String nombre

    static hasMany = [razas:Raza]

    static constraints = {
        nombre (blank:false,nullable:false,unique:true,maxLength:50)
    }
}