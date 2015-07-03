Ext.define('Ganaderia.store.EspecieStore',
    {
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy: {
            type:'ajax',
            url:especiesUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']

    });