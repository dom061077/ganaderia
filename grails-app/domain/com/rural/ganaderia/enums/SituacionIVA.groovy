package com.rural.ganaderia.enums

public enum SituacionIVA {
    IVA("I.V.A"),
    IVARNI("I.V.A RNI"),
    EXENTO("EXENTO"),
    CONSUMIDOR_FINAL("CONSUMIDOR FINAL"),
    MONOTRIBUTO("MONOTRIBUTO")
    
    String name
    
    public SituacionIVA(String name){
        this.name = name
    }

    static list(){
        [IVA,IVARNI,EXENTO,CONSUMIDOR_FINAL,MONOTRIBUTO]
    }
}
