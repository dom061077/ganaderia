Ext.define('Ganaderia.model.VencimientoOrdenModelo',
    {
        extend : 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'compradorvendedor',type:'string'},
            {name: 'cantidaddias',type:'int'},
            {name: 'procentajebruto', type: 'float'},
            {name: 'porcentajegastos', type: 'float'},
            {name: 'porcentajeiva', type: 'float'},
            {name: 'anticipo',type:'float'}
        ],
        proxy :  {
            type:'memory'
        }
    });