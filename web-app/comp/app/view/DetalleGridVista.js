Ext.define('Ganaderia.view.DetalleGridVista',
    {

        extend : 'Ext.grid.Panel',
        alias : 'widget.DetalleGridVista',

        config :
        {
           // width : '100%',
            height : 400,
            selType : 'checkboxmodel'
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
                    store : 'Ganaderia.store.DetalleOrdenStore',

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
                            text : "Categoría",
                            itemId:'colCategoria',
                            flex : 1,
                            dataIndex : 'categoria',
                            //columnWidth:200,
                            editor :
                            {
                                xtype:'combo',
                                id:'cmbCategoria',
                                emptyText:'<Seleccione una Categoría>',
                                typeAhead: true,
                                triggerAction: 'all',
                                store:'Ganaderia.store.CategoriaStore',
                                valueField:'id',
                                displayField:'nombre',
                                selectOnTab:true


                            },
                            renderer:function(value){
                                var store = Ext.getCmp('cmbCategoria').getStore();
                                var combo = Ext.getCmp('cmbCategoria');
                                var idx = store.find(combo.valueField, value);
                                var rec = store.getAt(idx);
                                if(rec)
                                    return rec.get(combo.displayField);
                                else
                                    return "no encuentra categoria";
                            }


                        },
                        {
                            text : "Cabezas",
                            flex : 1,
                            dataIndex : 'cantidad',
                            allowDecimals: false,
                            columnWidth:40,
                            editor:{
                                xtype:'numberfield',
                                allowDecimals:false
                            }
                        },
                        {
                            text : "Kilos",
                            width:80,
                            allowDecimals: false,
                            flex : 1,
                            dataIndex : 'peso',
                            editor:{
                                xtype:'numberfield'
                            }
                        },
                        {
                            text : "$ Unitario",
                            width:50,
                            flex : 1,
                            dataIndex : 'preciounitario',
                            editor:{
                                xtype:'numberfield'


                            }
                        },
                        {
                            text : "Total",
                            columnWidth:50,
                            flex : 1,
                            dataIndex : 'subtotal'
                        },
                        {
                            text: 'Raza',
                            dataIndex : 'raza',
                            columnWidth:200,
                            editor :
                            {
                                xtype:'combo',
                                id:'cmbRaza',
                                typeAhead: true,
                                triggerAction: 'all',
                                store:'Ganaderia.store.RazaStore',
                                valueField:'id',
                                displayField:'nombre',
                                selectOnTab:true


                            },
                            renderer:function(value){
                                var store = Ext.getCmp('cmbRaza').getStore();
                                var combo = Ext.getCmp('cmbRaza');
                                var idx = store.find(combo.valueField, value);
                                var rec = store.getAt(idx);
                                if(rec)
                                    return rec.get(combo.displayField);
                                else
                                    return "";
                            }

                        },
                        {
                            text : 'Leyenda',
                            columnWidth:80,
                            dataIndex : 'corral'
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