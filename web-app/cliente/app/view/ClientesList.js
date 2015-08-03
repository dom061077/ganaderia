
//http://www.techzoo.org/wp-content/samples/ExtJS4-MVC-CRUD/extjs-book-mvc-layout.htm
Ext.define('Ganaderia.view.ClientesList',
    {

        extend: 'Ext.grid.Panel',
        alias: 'widget.ClientesList',
        config: {},
        constructor: function (config) {
            this.initConfig(config);
            return this.callParent(arguments);
        },
        width: '100%',
        height: 300,
        selType: 'rowmodel',
        selModel:
        {
            mode: 'SINGLE'
        },
        viewConfig:
        {
            stripeRows: true
        },
        initComponent: function () {
            Ext.apply(this,
                {
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
                            dataIndex: 'id',
                            hidden:true,
                            width: 80
                        },{
                            text:'C.U.I.T',
                            dataIndex:'cuit',
                            width: 110
                        },{

                            text:'Razón Social',
                            dataIndex:'razonSocial',
                            width:250
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