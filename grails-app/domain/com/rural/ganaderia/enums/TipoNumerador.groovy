package com.rural.ganaderia.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 20/08/14
 * Time: 9:42
 * To change this template use File | Settings | File Templates.
 */
public enum TipoNumerador {
    ORDEN_COMPRA("Orden de Compra"),
    ORDEN_VENTA("Orden de Venta")
    String name
    public TipoNumerador(String name){
        this.name = name
    }

    static list(){
        [ORDEN_COMPRA,ORDEN_VENTA]
    }
}
