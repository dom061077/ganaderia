Ext.define('ganaderia.model.grid.Orden',{
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'int'},
        {name:'numero',type:'string'},
        {name:'tipo',type:'string'},
        {name:'cliente', type:'string'},
        {name:'exposicion', type:'string'},
        {name:'anio', type:'int'},
        {name:'numeroOperacion',type:'int'},
        {name:'fechacarga', type:'date'},
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
        emptyText:'No hay Registros',
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: storeGrid
        })],
        store:storeGrid,
        columns :[
            {text:'Número', dataIndex: 'numero', width: 80},
            {text:'Tipo', dataIndex: 'tipo', width: 150},
            {header:'Cliente', dataIndex:'cliente', width:250},
            {header:'Exposición', dataIndex:'exposicion', width:150},
            {header:'Año', dataIndex:'anio',width:50},
            {text:'Nº de Operación',width:100,dataIndex:'numeroOperacion'},
            {header:'Fecha Carga',dataIndex:'fechacarga',width:100, xtype: 'datecolumn',   format:'d/m/Y'},
            {header:'Total',dataIndex:'total',width:100, xtype: 'numbercolumn'},
            {text:'Ver',xtype:'actioncolumn',sortable:'false',menuDisabled:true,
                  items:[
                      {
                          icon:selectImg,
                          tooltip:'Seleccionar',
                          handler: function(grid,rowIndex){
                              var orden = storeGrid.getAt(rowIndex);
                              window.location='show/'+orden.data.id;
                          }
                      }
                  ]}
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