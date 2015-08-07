Ext.define('Ganaderia.model.ClienteModelo', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',type:'int'},
        {name: 'direccion', type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'telefono1', type: 'string'},
        {name: 'telefono2',  type: 'string'},
        {name: 'cuit',  type: 'string'},
        {name: 'razonSocial',  type: 'string'},
        {name: 'ingresosBrutos',  type: 'string'},
        {name:'situacionIVA', type:'string'},
        {name:'codigoPostal',type:'String'},
        {name:'localidad',type:'int'}

    ],
    proxy:{
        type:'ajax',
        reader:{
            root:'data',
            type:'json'
        },
        api:
        {
            read:listjson,
            save:''
        }
    },

    validations:[]
});