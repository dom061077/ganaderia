Ext.application({
    requires: ['Ext.panel.Panel','Ext.grid.Panel'],
    name:'Ganaderia',
    appFolder:'../cliente/app',
    views:['Ganaderia.view.ClientesList','Ganaderia.view.ClienteFormVista'],
    controllers:['ClienteControlador'],
    stores:[
        'Ganaderia.store.ClientesStore',
        'Ganaderia.store.ProvinciaStore',
        'Ganaderia.store.PartidoStore',
        'Ganaderia.store.LocalidadStore',
        'Ganaderia.store.SituacionIVAStore'

    ],
    launch: function () {
        Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            renderTo:'formpanelId',
            title:'titulo',
            //width:950,
            items: [
                {
                    xtype: 'clienteslist'

                }
                //,{xtype:'DetalleGridVista'}
            ]
        });
    }
});