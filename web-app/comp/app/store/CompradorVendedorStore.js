Ext.define('Ganaderia.store.CompradorVendedorStore',
    {
    extend:'Ext.data.Store',
    fields: ['codigo', 'descripcion'],
    data : [
        {"codigo":"C", "descripcion":"Comprador"},
        {"codigo":"V", "descripcion":"Vendedor"}
    ]
});
