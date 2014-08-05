Ext.apply(Ext.form.VTypes,{
    cuitVal: /^\d{2}\-\d{8}\-\d{1}$/,

    //cuitMask:/^\d{2}\-\d{8}\-\d{1}$/,
    //cuitRe:/^\d{2}\-\d{8}\-\d{1}$/,
    cuitText:'Ingrese un C.U.I.T correcto',
    cuit :		function CPcuitValido(cuit) {
        if (!Ext.form.VTypes.cuitVal.test(cuit))
            return false;
        if (typeof(cuit) == 'undefined')
            return true;
        if (cuit == '')
            return true;
        var vec= new Array(10);
        esCuit=false;
        cuit_rearmado="";
        errors = ''
        for (i=0; i < cuit.length; i++) {
            caracter=cuit.charAt( i);
            if ( caracter.charCodeAt(0) >= 48 && caracter.charCodeAt(0) <= 57 )     {
                cuit_rearmado +=caracter;
            }
        }
        cuit=cuit_rearmado;
        if ( cuit.length != 11) {  // si to estan todos los digitos
            esCuit=false;
            //errors = 'Cuit <11 ';
            //alert( "CUIT Menor a 11 Caracteres" );
        } else {
            x=i=dv=0;
            // Multiplico los d�gitos.
            vec[0] = cuit.charAt(  0) * 5;
            vec[1] = cuit.charAt(  1) * 4;
            vec[2] = cuit.charAt(  2) * 3;
            vec[3] = cuit.charAt(  3) * 2;
            vec[4] = cuit.charAt(  4) * 7;
            vec[5] = cuit.charAt(  5) * 6;
            vec[6] = cuit.charAt(  6) * 5;
            vec[7] = cuit.charAt(  7) * 4;
            vec[8] = cuit.charAt(  8) * 3;
            vec[9] = cuit.charAt(  9) * 2;

            // Suma cada uno de los resultado.

            for( i = 0;i<=9; i++) {
                x += vec[i];
            }
            dv = (11 - (x % 11)) % 11;
            if ( dv == cuit.charAt( 10) ) {
                esCuit=true;
            }
        }
        return esCuit;
    }
});



