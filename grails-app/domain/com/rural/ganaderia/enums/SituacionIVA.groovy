package com.rural.ganaderia.enums

public enum SituacionIVA {
    IVA("I.V.A Resp. Inscripto"),
    IVARNI("I.V.A Resp.no Ins."),
    EXENTO("Exento"),
    CONSUMIDOR_FINAL("Consumidor Final"),
    MONOTRIBUTO("Monotributo")
    /*
    * HACER MARCA EN IVA PARA INDICAR EL PORCENTAJE DE GANACIAS
    *
    *
    * */
    
    String name
    
    public SituacionIVA(String name){
        this.name = name
    }

    static list(){
        [IVA,IVARNI,EXENTO,CONSUMIDOR_FINAL,MONOTRIBUTO]
    }
}
