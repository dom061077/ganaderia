Ext.define('Ganaderia.store.PartidoStore',
    {
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url:partidoUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']

    });