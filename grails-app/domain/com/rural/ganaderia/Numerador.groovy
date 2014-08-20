package com.rural.ganaderia

import com.rural.ganaderia.enums.TipoNumerador

class Numerador {
    long maximoNumero
    TipoNumerador tipoNumerador
    static constraints = {
    }

    static long sigNumero(TipoNumerador tipo) throws Exception{
        def numeradorInstance = Numerador.findByTipoNumerador(tipo)
        long numeroRetornado
        if (numeradorInstance){
            numeroRetornado = numeradorInstance.maximoNumero
            numeradorInstance.maximoNumero += 1
            numeradorInstance.save()
        }else{
            throw new Exception("No está definido el numerador de Orden "+tipo.name)
        }
        return numeroRetornado
    }
}
