
package com.rural.ganaderia

import com.rural.ganaderia.enums.TipoNumerador
import com.rural.ganaderia.enums.SituacionIVA
import com.rural.ganaderia.enums.TipoOrden
import com.rural.ganaderia.enums.TipoComprobante

class Numerador {
    long maximoNumero
    //TipoOrden tipoOrden
    TipoComprobante tipoComprobante
    static constraints = {
    }

   /* static long sigNumero(TipoComprobante tipoComprobante_param) throws Exception{
        def numeradorInstance = Numerador.findByTipoComprobante(tipoComprobante_param)
        long numeroRetornado
        if (numeradorInstance){
            numeroRetornado = numeradorInstance.maximoNumero
            numeradorInstance.maximoNumero += 1
            numeradorInstance.save()
        }else{
            throw new Exception("No está definido el numerador de Orden "+tipoComprobante_param.name)
        }
        return numeroRetornado
    }   */
}
