Ext.define('Ganaderia.store.AnioExposicionStore',{
    extend: 'Ext.data.Store',
    autoLoad:true,
    root:'rows',
    proxy: {
        type:'ajax',
        url:anioExposicionUrl,
        reader:{
            type: 'json',
            root:'rows',
            idProperty:'id'
        }
    },
    fields:['id','anio']
});