package com.rural.ganaderia.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 20/08/14
 * Time: 9:42
 * To change this template use File | Settings | File Templates.
 */
public enum TipoNumerador {
    ORDEN_COMPRA_A("Orden de Compra A"),
    ORDEN_VENTA_A("Orden de Venta A"),
    ORDEN_COMPRA_B("Orden de Compra B"),
    ORDEN_VENTA_B("Orden de Venta B"),
    NOTA_DEBITO("Nota de Débito"),
    NOTA_CREDITO("Nota de Crédito"),
    OPERACION("Nº de Operación")
    String name
    public TipoNumerador(String name){
        this.name = name
    }

    static list(){
        [ORDEN_COMPRA_A,ORDEN_VENTA_A,ORDEN_COMPRA_B,ORDEN_VENTA_B,NOTA_CREDITO,NOTA_DEBITO]

    }
}
