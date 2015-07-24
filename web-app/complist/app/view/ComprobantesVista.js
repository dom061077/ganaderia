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

                    columns: [
                        {
                            text: "Letra Venta",
                            dataIndex: 'letraVenta',
                            width: 80
                        },
                        {
                        text: "N° Venta",
                        dataIndex: 'numeroVenta',
                        hidden: false,
                        width: 80
                        },
                        {
                            text: "Letra Compra",
                            dataIndex: 'letraCompra',
                            width: 70
                        },
                        {
                            text: "N° Compra",
                            dataIndex: 'numeroCompra',
                            width: 70
                        },
                        {
                            text:'Cliente Venta',
                            width:300,
                            dataIndex:'clienteVenta'
                        },
                        {
                            text:'Cliente Compra',
                            width:300,
                            dataIndex:'clienteCompra'
                        },
                        {
                            text:'Total Venta',
                            width:110,
                            dataIndex:'totalVenta'
                        },
                        {
                            text:'Total Compra',
                            width:110,
                            dataIndex:'totalCompra'
                        },
                        {
                            text:'Imp.Venta',
                            width:80,
                            xtype:'actioncolumn',
                            icon: selectImg,
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                window.open(imprimirUrl+'/'+rec.data.idVenta,'_blank');
                            }
                        },{
                            text:'Imp.Compra',
                            xtype:'actioncolumn',
                            icon: selectImg,
                            handler: function(grid,rowIndex,colIndex){
                                var rec = grid.getStore().getAt(rowIndex);
                                window.open(imprimirUrl+'/'+rec.data.idCompra,'_blank');
                            },
                            width:80

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