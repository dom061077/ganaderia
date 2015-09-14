Ext.define('Ganaderia.store.GastoStore',
    {
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url: gastosUrl,
            reader: {
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion']

    });