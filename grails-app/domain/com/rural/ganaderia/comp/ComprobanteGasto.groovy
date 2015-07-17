package com.rural.ganaderia.comp

import com.rural.ganaderia.Gasto

class ComprobanteGasto {
    Comprobante comprobante
    Gasto gasto
    BigDecimal importe
    BigDecimal porcentaje
    boolean acumulaBaseIva
    boolean tieneIva
    boolean acumulaGanancia
    
    BigDecimal getSubTotal(){
        def retorno = 0
        if(importe>0)
            retorno += importe + (tieneIva?importe*comprobante.alicuota/100:0)
        else
            retorno += comprobante.importeBruto * porcentaje / 100 + (tieneIva?(comprobante.importeBruto * porcentaje / 100)*comprobante.alicuota/100:0)
        
        return retorno
    }

    static belongsTo = [comprobante:Comprobante]
    
    static transients = ['subTotal']
    
    static constraints = {
    }
}
