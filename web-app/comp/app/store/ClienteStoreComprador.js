Ext.define('Ganaderia.store.ClienteStoreComprador',
    {
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url:clienteListUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre','cuit']

    });