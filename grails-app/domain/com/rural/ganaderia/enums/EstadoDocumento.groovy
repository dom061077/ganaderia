package com.rural.ganaderia.enums

/**
 * Created by IntelliJ IDEA.
 * User: daniel
 * Date: 6/09/14
 * Time: 21:28
 * To change this template use File | Settings | File Templates.
 */
public enum EstadoDocumento {
    GENERADO("Documento Generado"),
    IMPRESO("Documento Impreso"),
    ANULADO("Documento Anulado")
    
    String name

    public EstadoDocumento(String name){
        this.name = name
    }

    static list(){
        [GENERADO,IMPRESO,ANULADO]
    }
}
