Ext.application({
    requires: ['Ext.panel.Panel','Ext.grid.Panel'],
    name: 'Ganaderia',
    appFolder: '../comp/app',
    views:['Ganaderia.view.OrdenVista'],
    controllers:['OrdenControlador'],
    stores: ['Ganaderia.store.ClienteStore','Ganaderia.store.ExposicionStore','Ganaderia.store.AnioExposicionStore'
            ,'Ganaderia.store.EspecieStore','Ganaderia.store.DestinoStore'
            ,'Ganaderia.store.ProvinciaStore'
            ,'Ganaderia.store.PartidoStore'
            ,'Ganaderia.store.LocalidadStore'
            ,'Ganaderia.store.CategoriaStore'
            ,'Ganaderia.store.RazaStore'
            ,'Ganaderia.store.DetalleOrdenStore'
            ,'Ganaderia.store.GastosOrdenStore'
            ,'Ganaderia.store.CompradorVendedorStore'
            ,'Ganaderia.store.GastoStore'
            ,'Ganaderia.store.VencimientosOrdenStore'
            ,'Ganaderia.store.OperacionStore'
    ],

    launch: function () {
        Ext.create('Ext.panel.Panel', {
            layout: 'fit',
            renderTo:'formpanelId',
            width:950,
            items: [
                {
                    xtype: 'OrdenVista'
                }
                //,{xtype:'DetalleGridVista'}
                ]
        });
    }
});