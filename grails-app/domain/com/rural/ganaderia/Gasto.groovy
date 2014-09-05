package com.rural.ganaderia

class Gasto {
    //los gastos en las compras siempre suman en las ventas restan

    String descripcion
    boolean restaBaseImponible=false //si es true significa que hay que restar el monto al bruto y de ahi calcular el IVA

    static constraints = {
    }
}
