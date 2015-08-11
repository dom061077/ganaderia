Ext.define('Ganaderia.model.ClienteModelo', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'idCliente',type:'int'},
        {name: 'direccion', type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'telefono1', type: 'string'},
        {name: 'telefono2',  type: 'string'},
        {name: 'cuit',  type: 'string'},
        {name: 'razonSocial',  type: 'string'},
        {name: 'ingresosBrutos',  type: 'string'},
        {name: 'ganananciasIns', type: 'boolean'},
        {name:'situacionIVA', type:'int'},
        {name:'codigoPostal',type:'String'},
        {name:'localidad',type:'int'},
        {name:'localidadNombre',type:'string'},
        {name:'partido',type:'int'},
        {name:'partidoNombre',type:'string'},
        {name:'provincia',type:'int'},
        {name:'provinciaNombre',type:'string'}


    ],
    proxy:{
        type:'ajax',
        reader:{
            root:'data',
            type:'json'
        },
        writer:{
            //root:'data',
            type:'json'
        },

        api:
        {
            read:listjson,
            create:savejson
        }
    },

    validations:[]
});