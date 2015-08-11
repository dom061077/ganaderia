
//http://www.techzoo.org/wp-content/samples/ExtJS4-MVC-CRUD/extjs-book-mvc-layout.htm
Ext.define('Ganaderia.view.ClientesList',
    {

        extend: 'Ext.grid.Panel',
        alias: 'widget.clienteslist',
        requires: ['Ext.ux.form.SearchField'],
        config: {},
        constructor: function (config) {
            this.initConfig(config);
            return this.callParent(arguments);
        },
        width: '100%',
        height: 400,
        selType: 'rowmodel',
        loadMask: true,

        selModel:
        {
            mode: 'SINGLE'
        },
        viewConfig:
        {
            stripeRows: true
        },
        initComponent: function () {
            var storeGrid = Ext.StoreManager.lookup('Ganaderia.store.ClientesStore');
            Ext.apply(this,
                {
                    dockedItems: [{
                        dock: 'top',
                        xtype: 'toolbar',
                        items: [{
                            width: 500,
                            fieldLabel: 'Filtrar por C.U.I.T o Razón Social',
                            labelWidth: 250,
                            xtype: 'searchfield',
                            store: storeGrid
                        }, '->', {
                            xtype: 'component',
                            itemId: 'status',
                            tpl: 'Matching threads: {count}',
                            style: 'margin-right:5px'
                        }]
                    }],

                    tbar  : [
                        {text : 'Nuevo Cliente',
                         action : 'add',
                         iconCls : 'client-add'
                        }
                    ],
                    store: 'Ganaderia.store.ClientesStore',
                    columns: [
                        {
                            text: "Id",
                            dataIndex: 'idCliente',
                            hidden:false,
                            width: 80,
                            filter: true
                        },{
                            text:'C.U.I.T',
                            dataIndex:'cuit',
                            width: 110,
                            filter: true
                        },{

                            text:'Razón Social',
                            dataIndex:'razonSocial',
                            width:250,
                            filter:{
                                type: 'string'
                            }
                        },{

                            text:'Ingresos Brutos',
                            dataIndex:'ingresosBrutos',
                            width:80
                        },{

                            text:'Teléfono',
                            dataIndex:'telefono1',
                            width:120
                        },{

                            text:'Condición I.V.A',
                            dataIndex:'situacionIVA',
                            width:170
                        },{

                            text:'Provincia',
                            dataIndex:'provinciaNombre',
                            sortable:false,
                            width:170
                        },{

                            text:'Partido',
                            dataIndex:'partidoNombre',
                            sortable:false,
                            width:170
                        },{

                            text:'Localidad',
                            dataIndex:'localidadNombre',
                            sortable:false,
                            width:170

                        }
                    ],
                     bbar: {
                        xtype: 'pagingtoolbar',
                        store: 'Ganaderia.store.ClientesStore',
                        displayInfo: true//,
                        //displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                        //emptyMsg: "No records to display&nbsp;"
                    }
                });
            this.callParent(arguments);
        }

    });