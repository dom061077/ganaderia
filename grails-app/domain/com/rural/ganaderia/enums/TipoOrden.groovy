package com.rural.ganaderia.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 20/08/14
 * Time: 8:31
 * To change this template use File | Settings | File Templates.
 */
public enum TipoOrden {
    COMPRA("Orden de Compra"),
    VENTA("Orden de Venta")
    String name
    
    public TipoOrden(String name){
        this.name = name
    }

    static list(){
        [COMPRA,VENTA]
    }
}
