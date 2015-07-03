/*var storeGridDetalle = new Ext.data.Store({
    model: ganaderia.model.grid.DetalleOrden,
    proxy:{
        type:'memory'
    }
});*/
Ext.define('Ganaderia.store.DetalleOrdenStore',
    {
        extend:'Ext.data.Store',
        model: 'Ganaderia.model.DetalleOrdenModelo'
    });