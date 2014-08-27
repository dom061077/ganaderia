Ext.define('ganaderia.model.grid.Orden',{
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'numero',type:'int'},
        {name:'cliente', type:'string'},
        {name:'exposicion', type:'string'},
        {name:'anio', type:'int'},
        {name:'fechacarga', type:'date'},
        {name:'anulada', type:'boolean'},
        {name:'total' , type:'numeric'}
    ]
});

Ext.onReady(function(){
    Ext.QuickTips.init();
    var storeGrid = Ext.create('Ext.data.JsonStore',{
        autoDestroy:true,
        autoLoad:true,
        model: ganaderia.model.grid.Orden,
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
        margin: '10 10 10 10',
        //loadMask: true,
        //renderTo: 'gridordencompraId',

        store:storeGrid,
        columns :[
            {text:'Número', dataIndex: 'numero', width: 60},
            {header:'Cliente', dataIndex:'cliente', width:250},
            {header:'Exposición', dataIndex:'exposicion', width:250},
            {header:'Año', dataIndex:'anio',width:100},
            {header:'Fecha Carga',dataIndex:'fechacarga',width:100, xtype: 'datecolumn',   format:'d/m/Y'},
            {header:'Anulada', dataIndex:'anulada',width:50,xtype:'booleancolumn',trueText:'Si',falseText:'No'}
        ]
    });


    Ext.create('Ext.panel.Panel',{
        title: 'Ordenes de Compra',
        height: 400,
        style: "margin: auto auto auto auto;",
        width: 875,
        layout: 'fit',
        renderTo:'gridordencompraId',
        items: grid
    });

});