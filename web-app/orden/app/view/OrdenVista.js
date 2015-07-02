Ext.define('Ganaderia.view.OrdenVista',
    {
        extend : 'Ext.form.Panel',
        requires : ['Ganaderia.view.DetalleGridVista','Ganaderia.view.GastosGridVista'],
        alias : 'widget.OrdenVista',
        constructor : function(config){
            this.initConfig(config);
            return this.callParent(arguments);
        } ,
        initComponent : function(){
            var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

            Ext.apply(this,
                {
                    id : 'StudentMasterId',

                    title : 'Orden de Venta',
                    resizable : false,
                    collapsible : true,
                    bodyPadding : '5',
                    buttonAlign : 'center',
                    border : false,
                    trackResetOnLoad : true,
                    layout :
                    {
                        type : 'vbox'
                    },
                    fieldDefaults:
                    {
                        xtype : 'textfield',
                        msgTarget : 'under',
                        labelWidth:140,
                        labelAlign : 'left',
                        labelStyle : 'font-weight:bold'
                    },
                    items : [{
                           xtype:"tabpanel"
                           ,itemId:'tabpanelItem'
                           ,width:950
                           ,border:false
                           ,height:400
                           ,items:[
                              {title:'Comprador/Vendedor'
                                   ,items:[
                                      {xtype:'panel'
                                       ,layout:'column'
                                       ,border:false
                                       ,items:[
                                            {
                                              xtype:'fieldset',
                                              title:'Información del Vendedor',
                                              layout:'anchor',
                                              items:[
                                                {
                                                    xtype:'combo',
                                                    name:'vendedor',
                                                    fieldLabel:'Cliente',
                                                    allowBlank:false,
                                                    width:400,
                                                    queryMode:'remote',
                                                    emptyText:'',
                                                    typeAhead: true,
                                                    triggerAction:'all',
                                                    valueField:'id',
                                                    displayField:'nombre',
                                                    selectOnTab:true,
                                                    store:'Ganaderia.store.ClienteStore',
                                                    listeners:{
                                                    }
                                                }

                                              ]
                                            },
                                          {
                                              xtype:'fieldset',
                                              title:'Información del Comprador',
                                              layout:'anchor',
                                              items:[
                                                  {
                                                      xtype:'combo',
                                                      name:'comprador',
                                                      fieldLabel:'Cliente',
                                                      allowBlank:false,
                                                      width:400,
                                                      queryMode:'remote',
                                                      emptyText:'',
                                                      typeAhead: true,
                                                      triggerAction:'all',
                                                      valueField:'id',
                                                      displayField:'nombre',
                                                      selectOnTab:true,
                                                      store:'Ganaderia.store.ClienteStore',
                                                      listeners:{
                                                      }

                                                  }
                                              ]
                                          }
                                           ]
                                      },{
                                            xtype:'fieldset'
                                            ,title:'Datos de Exposición'
                                            ,items:[
                                                    {
                                                        xtype:'panel',
                                                        layout:'column',
                                                        border:false,
                                                        items:[
                                                            {
                                                                xtype:'combo',
                                                                margin:'0 20 0 0',
                                                                fieldLabel:'Exposición',
                                                                name:'exposicion.id',
                                                                allowBlank:false,
                                                                width:400,
                                                                queryMode:'remote',
                                                                emptyText:'',
                                                                typeAhead: true,
                                                                triggerAction:'all',
                                                                valueField:'id',
                                                                displayField:'nombre',
                                                                selectOnTab:true,
                                                                store:'Ganaderia.store.ExposicionStore',
                                                                listeners:{
                                                                }

                                                            },{
                                                                xtype:'combo',
                                                                fieldLabel:'Año Exposición',
                                                                name:'anioExposicion.id',
                                                                allowBlank:false,
                                                                width:250,
                                                                queryMode:'remote',
                                                                emptyText:'',
                                                                typeAhead: true,
                                                                triggerAction:'all',
                                                                valueField:'id',
                                                                displayField:'anio',
                                                                selectOnTab:true,
                                                                store:'Ganaderia.store.AnioExposicionStore'
                                                            }
                                                        ]
                                                    }
                                            ]
                                      },{
                                            xtype:'fieldset'
                                            ,title:'Clasificación'
                                            ,items:[
                                                    {
                                                        xtype:'panel',
                                                        layout:'column',
                                                        border:false,
                                                        border:false,
                                                        items:[
                                                            {
                                                                xtype:'combo',
                                                                fieldLabel:'Especie',
                                                                itemId:'cmbEspecie',
                                                                margin:'0 170 0 0',
                                                                name:'especie.id',
                                                                allowBlank:false,
                                                                width:250,
                                                                queryMode:'remote',
                                                                emptyText:'',
                                                                typeAhead: true,
                                                                triggerAction:'all',
                                                                valueField:'id',
                                                                displayField:'nombre',
                                                                selectOnTab:true,
                                                                store:'Ganaderia.store.EspecieStore'

                                                            },{
                                                                xtype:'combo',
                                                                fieldLabel:'Destino',
                                                                name:'destino.id',
                                                                allowBlank:false,
                                                                width:250,
                                                                queryMode:'remote',
                                                                emptyText:'',
                                                                typeAhead: true,
                                                                triggerAction:'all',
                                                                valueField:'id',
                                                                displayField:'descripcion',
                                                                selectOnTab:true,
                                                                store:'Ganaderia.store.DestinoStore'
                                                            }
                                                        ]
                                                    }
                                            ]
                                      },{
                                              xtype:'fieldset',
                                              title:'Datos de la Operación',
                                              items:[
                                                  {   xtype:'panel',
                                                      layout:'column',
                                                      //height:250,
                                                      border:false,
                                                      items:[
                                                          {
                                                              name:'guias',
                                                              margin:'0 100 5 0',
                                                              xtype:'textfield',
                                                              fieldLabel:'Guías'
                                                          },{
                                                              name:'fechaOperacion',
                                                              xtype:'datefield',
                                                              fieldLabel:'Fecha de Operación'
                                                          },{
                                                              xtype:'combo',
                                                              margin:'0 20 5 0',
                                                              itemId:'cmbProvinciaProc',
                                                              fieldLabel:'Provincia Proc.',
                                                              name:'provincia',
                                                              allowBlank:false,
                                                              width:400,
                                                              queryMode:'remote',
                                                              emptyText:'',
                                                              typeAhead: true,
                                                              triggerAction:'all',
                                                              valueField:'id',
                                                              displayField:'nombre',
                                                              selectOnTab:true,
                                                              store:'Ganaderia.store.ProvinciaStore'
                                                          },{
                                                              xtype:'combo',
                                                              margin:'0 0 5 0',
                                                              itemId:'cmbPartidoProc',
                                                              fieldLabel:'Partido Proc',
                                                              name:'partido',
                                                              allowBlank:false,
                                                              width:400,
                                                              queryMode:'remote',
                                                              emptyText:'',
                                                              typeAhead: true,
                                                              triggerAction:'all',
                                                              valueField:'id',
                                                              displayField:'nombre',
                                                              selectOnTab:true,
                                                              store:'Ganaderia.store.PartidoStore'
                                                          },{
                                                              xtype:'combo',
                                                              itemId:'cmbLocalidadProc',
                                                              fieldLabel:'Localidad Proc',
                                                              name:'partido',
                                                              allowBlank:false,
                                                              width:400,
                                                              queryMode:'remote',
                                                              emptyText:'',
                                                              typeAhead: true,
                                                              triggerAction:'all',
                                                              valueField:'id',
                                                              displayField:'nombre',
                                                              selectOnTab:true,
                                                              store:'Ganaderia.store.LocalidadStore'

                                                          }

                                                      ]
                                                  }/*,{
                                                      xtype:'panel',
                                                      layout:'column',
                                                      border:false,
                                                      items:[

                                                      ]

                                                  }*/
                                              ]
                                      }

                                    ]
                              }
                             ,{ title:'Lotes de la Boleta'
                                ,height:400
                                ,width:850
                                ,items:[
                                    {xtype:'DetalleGridVista'}
                                ]
                              }
                             ,{ title:'Gastos de la Boleta'
                                ,height:400
                                ,width:850
                                ,items:[
                                    {xtype:'GastosGridVista'}
                                  ]
                              }
                            ,{title:'Vencimientos de la Boleta'}
                           ]
                        }],
                    buttons : [{
                        text : 'Create',
                        itemId : 'btnCreate',
                        formBind : true
                    },
                        {
                            text : 'Read Data',
                            itemId : 'btnLoad'
                        },

                        {
                            text : 'Update',
                            itemId : 'btnUpdate',
                            formBind : true
                        },
                        {
                            text : 'Delete',
                            itemId : 'btnDelete',
                            formBind : true
                        },
                        {
                            text : 'Reset',
                            itemId : 'btnReset'
                        },
                        {
                            text : 'Clear',
                            itemId : 'btnClear'
                        }]
                });

            this.callParent(arguments);
        }


});