Ext.define('Ganaderia.model.DetalleOrdenModelo',
    {
        extend : 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'categoria', type: 'int',defaultValue:undefined},
            {name: 'raza', type: 'int'},
            {name: 'corral', type: 'string'},
            {name: 'cantidad',type:'int'},
            {name: 'peso',type:'int'},
            {name: 'preciounitario', type: 'float'},
            {name: 'subtotal', type: 'float'}
        ],
        proxy :  {
            type:'memory'
        }
    });