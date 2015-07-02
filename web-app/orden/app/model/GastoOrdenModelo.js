Ext.define('Ganaderia.model.GastoOrdenModelo',
    {
        extend : 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'compradorvendedor',type:'string'},
            {name: 'gasto',type:'int'},
            {name: 'porcentaje', type: 'float'},
            {name: 'monto', type: 'float'},
            {name: 'acbaseiva', type: 'boolean'},
            {name: 'tieneiva',type:'boolean'},
            {name: 'acganancia',type:'boolean'}
        ],
        proxy :  {
            type:'memory'
        }
    });