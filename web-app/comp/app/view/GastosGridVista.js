Ext.define('Ganaderia.view.GastosGridVista',
    {

        extend : 'Ext.grid.Panel',
        alias : 'widget.GastosGridVista',

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
                    store : 'Ganaderia.store.GastosOrdenStore',

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
                            flex : 1,
                            dataIndex: 'compradorvendedor',
                            editor :
                            {
                                xtype:'combo',
                                store:'Ganaderia.store.CompradorVendedorStore',
                                id:'cmbCVgasto',
                                //emptyText:'<Sel.C o V>',
                                typeAhead: true,
                                triggerAction: 'all',
                                valueField:'codigo',
                                displayField:'descripcion',
                                selectOnTab:true
                            }

                        },
                        {
                            text : "Gasto",
                            flex : 1,
                            dataIndex : 'gasto',
                            editor :
                            {
                                xtype:'combo',
                                id:'cmbGasto',
                                //emptyText:'<Seleccione un gasto>',
                                typeAhead: true,
                                triggerAction: 'all',
                                store:'Ganaderia.store.GastoStore',
                                valueField:'id',
                                displayField:'descripcion',
                                selectOnTab:true


                            },
                            renderer:function(value){
                                var store = Ext.getCmp('cmbGasto').getStore();
                                var combo = Ext.getCmp('cmbGasto');
                                var idx = store.find(combo.valueField, value);
                                var rec = store.getAt(idx);
                                if(rec)
                                    return rec.get(combo.displayField);
                                else
                                    return "no encuentra el gasto";
                            }


                        },
                        {
                            text : "Monto",
                            flex : 1,
                            dataIndex : 'monto',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "Porcentaje",
                            flex : 1,
                            dataIndex : 'porcentaje',
                            allowDecimals: false,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "Ac.Base I.V.A",
                            editable: true,
                            width:40,
                            flex : 1,
                            xtype:'checkcolumn',
                            dataIndex : 'acbaseiva'
                        },
                        {
                            text : "Tiene I.V.A",
                            width:50,
                            flex : 1,
                            xtype:'checkcolumn',
                            dataIndex : 'tieneiva'

                        },
                        {
                            text : "Ac.Bsse Ganancia",
                            columnWidth:50,
                            xtype:'checkcolumn',
                            flex : 1,
                            dataIndex : 'acganancia'
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