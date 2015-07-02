package com.rural.ganaderia.enums

public enum TipoComprobante {
    CREDITO("NOTA DE CREDITO"),
    DEBITO("NOTA DE DEBITO"),
    ORDENCOMPRA("ORDEN DE COMPRA"),
    ORDENVENTA("ORDEN DE VENTA")
    String name

    public TipoComprobante(String name){
        this.name = name
    }

    public list(){
        [CREDITO,DEBITO,ORDENCOMPRA,ORDENVENTA]
    }
}
