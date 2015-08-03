Ext.application({
    requires: ['Ext.panel.Panel','Ext.grid.Panel'],
    name: 'Ganaderia',
    appFolder: '../complist/app',

    views:['Ganaderia.view.ComprobantesVista'],
    //controllers:['Ganaderia.controller.ComprobantesController'],
    stores: [
        'Ganaderia.store.ComprobantesStore'

    ],

    launch: function() {
        Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            renderTo:'formpanelId',
            title:'Comprobantes generados',
            //width:950,
            items: [
                {
                    xtype: 'ComprobantesVista'
                }
                //,{xtype:'DetalleGridVista'}
            ]
        });
    }
});