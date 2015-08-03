Ext.application({
    requires: ['Ext.panel.Panel','Ext.grid.Panel'],
    name:'Ganaderia',
    appFolder:'../cliente/app',
    views:['Ganaderia.view.ClientesList'],
    //controllers:['ClienteControlador'],
    stores:['Ganaderia.store.ClientesStore'],
    launch: function () {
        Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            renderTo:'formpanelId',
            title:'titulo',
            //width:950,
            items: [
                {
                    xtype: 'ClientesList'

                }
                //,{xtype:'DetalleGridVista'}
            ]
        });
    }
});