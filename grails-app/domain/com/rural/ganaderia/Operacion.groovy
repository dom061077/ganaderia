package com.rural.ganaderia

class Operacion { 
    String nombre
    String codigo

    static constraints = {
        nombre(nullable: false, blank: false)
    }
}
