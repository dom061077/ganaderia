package com.rural.ganaderia.enums

/**
 * Created by IntelliJ IDEA.
 * User: danielmedina
 * Date: 20/08/14
 * Time: 8:31
 * To change this template use File | Settings | File Templates.
 */
public enum TipoOrden {
    COMPRA_A("Orden de Compra A"),
    VENTA_A("Orden de Venta A"),
    COMPRA_B("Orden de Compra B"),
    VENTA_B("Orden de Venta B"),
    NOTA_DEBITO_A("Nota de Débito A"),
    NOTA_DEBITO_B("Nota de Débito B"),
    NOTA_CREDITO_A("Nota de Crédito A"),
    NOTA_CREDITO_B("Nota de Crédito B")
    String name
    
    public TipoOrden(String name){
        this.name = name
    }

    static list(){
        [COMPRA_A,VENTA_A, COMPRA_B,VENTA_B,NOTA_CREDITO_A,NOTA_CREDITO_B,NOTA_DEBITO_A,NOTA_DEBITO_B]
    }
}
