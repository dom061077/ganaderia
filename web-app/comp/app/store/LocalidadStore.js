Ext.define('Ganaderia.store.LocalidadStore',
    {
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url:localidadUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']

    });