Ext.define('Ganaderia.model.OrdenModelo', {
    extend: 'Ext.data.Model',
    idProperty:'Id',
    fields: [
        { name: 'Id', type: 'int'},
        { name: 'vendedor', type: 'int' },
        { name: 'comprador', type: 'int' },
        { name: 'exposicion', type: 'int' },
        { name: 'anioExposicion', type: 'int' },
        { name: 'especie', type: 'int' },
        { name: 'destino', type: 'int' },
        { name: 'guias', type: 'string' },
        { name: 'operacion', type: 'int'},
        { name: 'fechaOperacion', type: 'date' },
        { name: 'procedenciaProvincia', type: 'int'},
        { name: 'procedenciaPartido', type:'int'},
        { name: 'procedenciaLocalidad', type:'int'},
        { name: 'lotesjson', type:'auto'},
        { name: 'gastosjson', type:'auto'},
        { name: 'vencimientosjson', type:'auto'}
    ],
    proxy: {
        type: 'ajax',
        idParam: 'id',
        reader:{
            type:'json',
            root: 'data'
        },
        api:{
            create: savecompUrl
        },
        writer:{
            type:'json',
            encode:true,
            dateFormat:'Y-m-d',
            root:'comprobante'
        }
    },
    validations: []
});