Ext.define('Ganaderia.store.ComprobantesStore',
    {
        extend: 'Ext.data.Store',
        model: 'Ganaderia.model.ComprobanteModelo',
        autoLoad: true,
        autoSync: false,
        storeId: 'Student',
        pageSize: 5
    });