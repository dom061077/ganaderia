Ext.define('Ganaderia.view.VencimientosGridVista',
    {

        extend : 'Ext.grid.Panel',
        alias : 'widget.VencimientosGridVista',

        config :
        {
            // width : '100%',
            height : 400//,
            //selType : 'checkboxmodel'
        },

        constructor : function(config){
            this.initConfig(config);
            return this.callParent(arguments);
        },
        viewConfig :
        {
            stripeRows : true
        },
        initComponent : function(){
            Ext.apply(this,
                {
                    store : 'Ganaderia.store.VencimientosOrdenStore',

                    plugins : [Ext.create('Ext.grid.plugin.RowEditing',
                        {
                            clicksToEdit : 2

                            //if you have checkbox in first row then take clicksToEdit=2 otherwise it will go on edit mode
                        })],
                    selType : 'cellmodel',
                    height : this.config.height,
                    width : this.config.width,
                    height:400,

                    selModel :
                    {
                       // mode : 'MULTI'
                    },
                    columns : [
                        {
                            text:'C/V',
                            flex : 1,
                            with:100,
                            dataIndex: 'compradorvendedor',
                            editor :
                            {
                                xtype:'combo',
                                store:'Ganaderia.store.CompradorVendedorStore',
                                id:'cmbCVVencimiento',
                                //emptyText:'<Sele.C o V>',
                                typeAhead: true,
                                triggerAction: 'all',
                                valueField:'codigo',
                                displayField:'descripcion',
                                selectOnTab:true
                            }

                        },
                        {
                            text : "Días",
                            flex : 1,
                            dataIndex : 'cantidaddias',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "% Bruto",
                            flex : 1,
                            dataIndex : 'porcentajebruto',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "% Gastos",
                            flex : 1,
                            dataIndex : 'porcentajegastos',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "% I.V.A",
                            flex : 1,
                            dataIndex : 'porcentajeiva',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        }/*,
                        {
                            text : "Anticipo",
                            flex : 1,
                            dataIndex : 'anticipo',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        } */
                    ],
                    dockedItems : [{
                        xtype : 'toolbar',
                        //dock : 'bottom',
                        ui : 'footer',
                        layout :
                        {
                            pack : 'center'
                        },
                        defaults :
                        {
                            minWidth : 80
                        },
                        items : [{
                            text : 'Agregar',
                            itemId : 'btnCreate'
                        },
                            {
                                text : 'Eliminar',
                                itemId : 'btnDelete'
                            }]
                    }]
                });

            this.callParent(arguments);
        }
    });