Ext.define('Ganaderia.store.CategoriaStore',
    {
            extend:'Ext.data.Store',
            autoLoad:false,
            root:'rows',
            proxy:{
                type:'ajax',
                url:categoriasUrl,
                reader:{
                    type:'json',
                    root:'rows',
                    idProperty:'id'
                }
            },
            fields:['id','nombre']

    });