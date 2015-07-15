package com.rural.ganaderia.parametros

import com.rural.ganaderia.SituacionIVA
import com.rural.ganaderia.enums.TipoComprobante
import com.rural.ganaderia.Especie
import com.rural.ganaderia.Destino

class GastoEspecieDestinoOper {
    SituacionIVA situacionIVA
    TipoComprobante tipoComprobante
    TipoComprobante tipoComprobanteOrigen
    String codigoIvaEspecie
    String codigoIvaDestino
    BigDecimal alicuota

    static constraints = {
        tipoComprobanteOrigen(nullable: true,blank:true)
    }
}
