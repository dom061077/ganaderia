package com.rural.ganaderia

class Operacion { 
    String nombre

    static constraints = {
        nombre(nullable: false, blank: false)
    }
}
