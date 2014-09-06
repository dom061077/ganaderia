
package com.rural.ganaderia

import com.rural.ganaderia.enums.TipoNumerador
import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden

class Numerador {
    long maximoNumero
    TipoOrden tipoOrden
    static constraints = {
    }

    static long sigNumero(TipoOrden tipoOrdenparam) throws Exception{
        def numeradorInstance = Numerador.findByTipoOrden(tipoOrdenparam)
        long numeroRetornado
        if (numeradorInstance){
            numeroRetornado = numeradorInstance.maximoNumero
            numeradorInstance.maximoNumero += 1
            numeradorInstance.save()
        }else{
            throw new Exception("No está definido el numerador de Orden "+tipoOrdenparam.name)
        }
        return numeroRetornado
    }
}
