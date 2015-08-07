Ext.define('Ganaderia.store.ClientesStore',
    {
        extend: 'Ext.data.Store',
        model: 'Ganaderia.model.ClienteModelo',
        autoLoad: true,
        autoSync: false,
        storeId: 'ClientesId',
        remoteSort: true,

        pageSize: 10

    });