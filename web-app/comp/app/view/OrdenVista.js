Ext.define('Ganaderia.view.OrdenVista',
    {
        extend : 'Ext.form.Panel',
        requires : ['Ganaderia.view.DetalleGridVista','Ganaderia.view.GastosGridVista','Ganaderia.view.VencimientosGridVista'],
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
                    margins : '30 30 30 30',
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
                            ,width : '100%'
                           ,height:450
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
                                                                margin:'0 20 5 0',
                                                                fieldLabel:'Exposición',
                                                                name:'exposicion',
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
                                                                name:'anioExposicion',
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
                                                                margin:'0 20 5 0',
                                                                name:'especie',
                                                                allowBlank:false,
                                                                width:400,
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
                                                                name:'destino',
                                                                allowBlank:false,
                                                                width:400,
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
                                                              xtype:'combo',
                                                              name:'operacion',
                                                              margin: '0 20 5 0',
                                                              itemId:'cmbOperacion',
                                                              fieldLabel:'Operación',
                                                              name:'operacion',
                                                              allowBlank:false,
                                                              width:400,
                                                              queryMode:'remote',
                                                              typeAhead: true,
                                                              triggerAction: 'all',
                                                              valueField:'id',
                                                              displayField:'nombre',
                                                              store:'Ganaderia.store.OperacionStore'
                                                          },{
                                                              name:'guias',
                                                              margin:'0 100 5 0',
                                                              xtype:'textfield',
                                                              fieldLabel:'Guías'
                                                          },{
                                                              name:'fechaOperacion',
                                                              margin: '0 100 5 0',
                                                              xtype:'datefield',
                                                              fieldLabel:'Fecha de Operación'
                                                          }
                                                      ]
                                                  },{
                                                      xtype:'panel',
                                                      layout:'column',
                                                      border:false,
                                                      items:[
                                                          {
                                                              name:'pagoContado',
                                                              itemId:'pagoContadoItemId',
                                                              fieldLabel:'Pago de Contado',
                                                              xtype:'checkbox',
                                                              margin: '0 100 5 0'
                                                          },{
                                                              name:'porcentajeDesc',
                                                              itemId:'porcentajeDescItemId',
                                                              fieldLabel:'Porcentaje',
                                                              xtype: 'numberfield',
                                                              margin: '0 100 5 0'
                                                          }
                                                      ]
                                                  }
                                              ]
                                      },{
                                            xtype:'panel',

                                            layout:'column',
                                            border: false,
                                            items:[
                                                {
                                                    xtype:'fieldset',
                                                    itemId:'procedenciaVendedorFieldsetItemId',
                                                    title:'Procedencia Vendedor',
                                                    items:[
                                                        {
                                                            xtype:'combo',
                                                            margin:'0 20 5 0',
                                                            itemId:'cmbProvinciaProc',
                                                            fieldLabel:'Provincia Proc.',
                                                            name:'procedenciaProvincia',
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
                                                            margin:'0 20 5 0',
                                                            itemId:'cmbPartidoProc',
                                                            fieldLabel:'Partido Proc',
                                                            name:'procedenciaPartido',
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
                                                            name:'procedenciaLocalidad',
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
                                                },{
                                                    xtype:'fieldset',
                                                    title:'Procedencia Comprador',
                                                    itemId:'procedenciaCompradorFieldsetItemId',
                                                    items:[
                                                        {
                                                            xtype:'combo',
                                                            margin:'0 20 5 0',
                                                            itemId:'cmbProvinciaProcComprador',
                                                            fieldLabel:'Provincia Proc.',
                                                            name:'procedenciaProvinciaComprador',
                                                            allowBlank:false,
                                                            width:400,
                                                            queryMode:'remote',
                                                            emptyText:'',
                                                            typeAhead: true,
                                                            triggerAction:'all',
                                                            valueField:'id',
                                                            displayField:'nombre',
                                                            selectOnTab:true,
                                                            store:'Ganaderia.store.ProvinciaStoreComprador'
                                                        },{
                                                            xtype:'combo',
                                                            margin:'0 20 5 0',
                                                            itemId:'cmbPartidoProcComprador',
                                                            fieldLabel:'Partido Proc',
                                                            name:'procedenciaPartidoComprador',
                                                            allowBlank:false,
                                                            width:400,
                                                            queryMode:'remote',
                                                            emptyText:'',
                                                            typeAhead: true,
                                                            triggerAction:'all',
                                                            valueField:'id',
                                                            displayField:'nombre',
                                                            selectOnTab:true,
                                                            store:'Ganaderia.store.PartidoStoreComprador'
                                                        },{
                                                            xtype:'combo',
                                                            itemId:'cmbLocalidadProcComprador',
                                                            fieldLabel:'Localidad Proc',
                                                            name:'procedenciaLocalidadComprador',
                                                            allowBlank:false,
                                                            width:400,
                                                            queryMode:'remote',
                                                            emptyText:'',
                                                            typeAhead: true,
                                                            triggerAction:'all',
                                                            valueField:'id',
                                                            displayField:'nombre',
                                                            selectOnTab:true,
                                                            store:'Ganaderia.store.LocalidadStoreComprador'

                                                        }
                                                    ]
                                                }
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
                            ,{  title:'Vencimientos de la Boleta'
                                ,itemId:'tabVencimientosItemId'
                                ,height:400
                                ,width:850
                                ,items:[
                                    {xtype:'VencimientosGridVista'}
                                ]
                            }
                           ]
                        }],
                    buttons : [{
                        text : 'Generar',
                        itemId : 'btnGenerar',
                        formBind : true
                        },
                        {
                            text : 'Cancelar',
                            itemId : 'btnCancelar'
                        }]
                });

            this.callParent(arguments);
        }


});