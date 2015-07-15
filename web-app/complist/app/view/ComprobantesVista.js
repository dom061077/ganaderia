Ext.define('Ganaderia.view.ComprobantesVista',
    {

        extend: 'Ext.grid.Panel',
        alias: 'widget.ComprobantesVista',
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
                    store: 'Ganaderia.store.ComprobantesStore',

                    columns: [{
                        text: "N° Venta",
                        dataIndex: 'numeroVenta',
                        hidden: false,
                        width: 70
                        },
                        {
                            text: "Letra Venta",
                            flex: 1,
                            dataIndex: 'letraVenta',
                            width: 70,
                            editor:
                            {
                                // defaults to textfield if no xtype is supplied
                                allowBlank: true
                            }
                        },
                        {
                            text: "Letra Compra",
                            flex: 1,
                            dataIndex: 'letraCompra',
                            width: 70
                        },
                        {
                            text: "N° Compra",
                            flex: 1,
                            dataIndex: 'numeroCompra',
                            width: 70
                        },
                        {
                            text:'Cliente Venta',
                            flex:1,
                            dataIndex:'clienteVenta'
                        },
                        {
                            text:'Cliente Compra',
                            flex:1,
                            dataIndex:'clienteCompra'
                        },
                        {
                            text:'Total Venta',
                            flex:1,
                            dataIndex:'totalVenta'
                        },
                        {
                            text:'Total Compra',
                            flex:1,
                            dataIndex:'totalCompra'
                        }
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        store: 'Ganaderia.store.ComprobantesStore',
                        displayInfo: true,
                        displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                        emptyMsg: "No records to display&nbsp;"
                    }
                });
            this.callParent(arguments);
        }

    });