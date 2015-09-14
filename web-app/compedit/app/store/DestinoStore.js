Ext.define('Ganaderia.store.DestinoStore',
    {
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url: destinoUrl,
            reader: {
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion']

    });