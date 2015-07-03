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
                        mode : 'MULTI'
                    },
                    columns : [
                        {
                            text:'C/V',
                            dataIndex: 'compradorvendedor',
                            editor :
                            {
                                xtype:'combo',
                                store:'Ganaderia.store.CompradorVendedorStore',
                                id:'cmbCVgasto',
                                emptyText:'<Seleccione una C o V>',
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
                            columnWidth:40,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "% Bruto",
                            flex : 1,
                            dataIndex : 'procentajebruto',
                            allowDecimals: false,
                            columnWidth:40,
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
                            columnWidth:40,
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
                            columnWidth:40,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "Anticipo",
                            flex : 1,
                            dataIndex : 'anticipo',
                            allowDecimals: false,
                            columnWidth:40,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        }
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