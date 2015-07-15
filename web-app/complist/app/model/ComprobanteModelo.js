Ext.define('Ganaderia.model.ComprobanteModelo',{
    extend: 'Ext.data.Model',
    idProperty: 'idVenta',
    fields: [
        {name: 'idVenta', type:'int'},
        {name: 'idCompra', type: 'int'},
        {name: 'letraVenta',type:'string'},
        {name: 'letraCompra',type: 'string'},
        {name: 'numeroVenta',type:'int'},
        {name: 'numeroCompra',type:'int'},
        {name: 'clienteVenta',type:'string'},
        {name: 'clienteCompra',type:'string'},
        {name: 'totalVenta', type:'float'},
        {name: 'totalCompra', type:'float'}
    ],
    validations: [],
    proxy:{
        type:'ajax',
        reader:{
            root:'data',
            type:'json'
        },
        api:
        {
            read:listjson
        }
    }
});