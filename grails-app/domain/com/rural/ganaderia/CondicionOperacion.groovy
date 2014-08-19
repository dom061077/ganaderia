package com.rural.ganaderia

class CondicionOperacion {

    String nombre
    static constraints = {
        nombre(nullable: false,blank: false)
    }
    
}
