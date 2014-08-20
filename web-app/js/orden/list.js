Ext.define('ganaderia.model.grid.Orden',{
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'numero',type:'int'},
        {name:'cliente', type:'string'},
        {name:'exposición', type:'string'},
        {name:'anio', type:'int'},
        {name:'fechacarga', type:'date'},
        {name:'total' , type:'numeric'}
    ]
});

Ext.onReady(function(){
    Ext.QuickTips.init();
    var storeGrid = Ext.create('Ext.data.JsonStore',{
        autoDestroy:true,
        model: 'ganaderia.model.grid.Orden',
        proxy : {
            type:'ajax',
            url: listordenUrl,
            reader:{
                type:'json',
                root: 'rows',
                idProperty: 'id',
                totalProperty: 'total'
            }
        },
        remoteSort: true,
        pageSize:50
    });

    var filters = {
        ftype:'filters',
        encode: false,
        local:false
    }

    var grid = Ext.create('Ext.grid.Panel',{
        border:false,
        store: storeGrid,
        loadMask: true,
        renderTo:'gridordencompraId',
        columns :[
            {text:'Número', dataIndex: 'numero', width: 150},
            {header:'Cliente', dataIndex:'cliente', width:250},
            {header:'Exposición', dataIndex:'exposicion', width:250},
            {header:'Año', dataIndex:'anio',width:100},
            {header:'Fecha Carga',dataIndex:'fechacarga',width:100}
        ]
    });

});