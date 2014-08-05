Ext.onReady(function(){

    function confirmarorden(){
        var detalleArr=[];
        storeGridDetalle.data.each(function(row){
             detalleArr.push(row.data);
        });
        var detalleJson = Ext.encode(detalleArr);
        var wizard = Ext.getCmp('wizardId');
        var fieldValuesFormGanadero = wizard.getComponent('stepFormGanaderoId').getForm().getFieldValues();
        var fieldValuesFormRepresentante = wizard.getComponent('stepFormRepresentanteId').getForm().getFieldValues();
        var fieldValuesFormDatosExposicion = wizard.getComponent('stepFormDatosExposicionId').getForm().getFieldValues();
        Ext.Ajax.request({
            url:saveOrdenUrl,
            params:{
                'cliente.cuit':fieldValuesFormGanadero.cuit,
                'cliente.razonSocial':fieldValuesFormGanadero.razonSocial,
                'cliente.telefono1':fieldValuesFormGanadero.telefono1,
                'cliente.telefono2':fieldValuesFormGanadero.telefono2,
                'cliente.email':fieldValuesFormGanadero.email,
                'cliente.localidad.id':fieldValuesFormGanadero.localidad
            },
            success: function(xhr){
                console.log(xhr.reponseText);
            },
            failure: function(xhr){
                console.log("Error: "+xhr.statusText);
            }
        });
        //----limpiar datos-----
        storeGridDetalle.removeAll();
        Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').getForm().reset();
        Ext.getCmp('wizardId').getComponent('stepFormRepresentanteId').getForm().reset();
        Ext.getCmp('wizardId').getComponent('stepFormDatosExposicionId').getForm().reset();
        Ext.getCmp('wizardId').getComponent('stepFormDetalleOrdenId').getForm().reset();
    }


    Ext.define('ganaderia.model.grid.DetalleOrden', {
        extend: 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'especie', type: 'int'},
            {name: 'raza', type: 'int'},
            {name: 'corral', type: 'string'},
            {name: 'cantidad',type:'int'},
            {name: 'peso',type:'int'},
            {name: 'preciounitario', type: 'float'},
            {name: 'subtotal', type: 'float'}
        ]
    });

    //http://stackoverflow.com/questions/8531538/extjs4-grid-editor-remote-combobox-displayvalue
    Ext.define('ganaderia.model.combo.RazaStore',{
        extend:'Ext.data.Store',
        autoLoad:true,
        root:'rows',
        proxy: {
            type:'ajax',
            url:razaUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre'],
        listeners:{
        }
    });

    Ext.define('ganaderia.model.combo.ProvinciaStore',{
        extend:'Ext.data.Store',
        autoLoad:true,
        root:'rows',
        proxy: {
            type:'ajax',
            url:provinciaUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']

    });

    Ext.define('ganaderia.model.combo.LocalidadStore',{
        extend: 'Ext.data.Store',
        autoLoad:true,
        root:'rows',
        proxy: {
            type:'ajax',
            url:localidadUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']
    });

    Ext.define('ganaderia.model.combo.ExposicionStore',{
        extend: 'Ext.data.Store',
        autoLoad:true,
        root:'rows',
        proxy: {
            type:'ajax',
            url:exposicionUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']
    });

    Ext.define('ganaderia.model.combo.AnioExposicionStore',{
        extend: 'Ext.data.Store',
        autoLoad:true,
        root:'rows',
        proxy: {
            type:'ajax',
            url:anioExposicionUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','anio']
    });

  Ext.define('ganaderia.model.combo.EspecieStore',{
      extend:'Ext.data.Store',
      autoLoad:false,
      root:'rows',
      proxy: {
          type:'ajax',
          url:especiesUrl,
          reader:{
             type: 'json',
             root:'rows',
             idProperty:'id'
          }
      },

      fields:['id','nombre']

  });

  var storeGridDetalle = new Ext.data.Store({
      model: ganaderia.model.grid.DetalleOrden,
      proxy:{
          type:'memory'
      }
  });

  var storeEspecie = Ext.create('ganaderia.model.combo.EspecieStore');
  var storeRaza = Ext.create('ganaderia.model.combo.RazaStore');
  var storeProvincia = Ext.create('ganaderia.model.combo.ProvinciaStore');
  var storeLocalidad = Ext.create('ganaderia.model.combo.LocalidadStore');
  var storeExposicion = Ext.create('ganaderia.model.combo.ExposicionStore');
  var storeAnioExposicion = Ext.create('ganaderia.model.combo.AnioExposicionStore');

  var plugin = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1,
        listeners:{
            'edit':function( editor, e){
                var selModel = Ext.getCmp('griddetalleId').getSelectionModel();
                var rowSel = selModel.getLastSelected();

                //storeRaza.load({params:{especieId:records[0].data.id}});
                storeRaza.proxy.extraParams = {especieId:rowSel.data.especie};

                storeRaza.load();
                e.record.commit();
            }

        }
    });






  function onAddClick(){
      if(this.up('form').getForm().isValid()){
          var form=this.up('form').getForm();
          var fieldValues=form.getFieldValues();

          var rec = new ganaderia.model.grid.DetalleOrden({
             especie: fieldValues.especie,
             raza: fieldValues.raza,
             corral: fieldValues.corral,
             cantidad: fieldValues.cantidad,
             peso: fieldValues.peso,
             preciounitario: fieldValues.preciounitario,
             subtotal:fieldValues.cantidad * fieldValues.preciounitario
          });
          form.reset();
          storeGridDetalle.add(rec);
      }
  }

  Ext.widget('panel',{
      title:'Registro de Orden de Compra',
      itemId:'wizardId',
      id:'wizardId',
      renderTo:'formpanelId',
      layout:'card',
      width:900,
      style: "margin: auto auto auto auto;",
      defaults:{
          border:false
      },
      items:[
          {
              itemId:'stepFormGanaderoId',
              xtype:'form',
              width:700,
              margin: '10 10 10 10',
              title:'Paso 1 - Registro de datos del Cliente',
              layout:'anchor',
              defaultType: 'textfield',
              defaults:{
                    autoScroll : true,
                    msgTarget:'under',
                    labelWidth:200
              },
              items:[
                  {
                      fieldLabel:'C.U.I.T o D.N.I',
                      name:'cuit',
                      //vtype:'cuit',
                      allowBlank:false
                  },{
                      fieldLabel:'Razon Social/Apellido y Nombre',
                      name:'razonSocial',
                      maxLengthText:60,
                      allowBlank:false
                  },{
                      fieldLabel:'Teléfono 1',
                      maxLengthText:20,
                      name:'telefono1'
                  },{
                      fieldLabel:'Teléfono 2',
                      maxLengthText:20,
                      name:'telefono2'
                  },{
                      fieldLabel:'E-mail',
                      maxLengthText:20,
                      name:'email'
                  },{
                      fieldLabel:'Provincia',
                      xtype:'combo',
                      store:storeProvincia,
                      name:'provincia',
                      allowBlank:false,
                      anyMatch:true,
                      queryMode:'remote',
                      emptyText:'',
                      typeAhead: true,
                      triggerAction:'all',
                      valueField:'id',
                      displayField:'nombre',
                      selectOnTab:true,
                      listeners:{
                          'select':function(combo,records,options){
                                storeLocalidad.proxy.extraParams={provinciaId:records[0].data.id};
                                storeLocalidad.load();
                                Ext.getCmp('localidadId').clearValue();
                          }
                      }
                  },{
                      fieldLabel:'Localidad',
                      xtype:'combo',
                      id:'localidadId',
                      allowBlank:false,
                      store:storeLocalidad,
                      queryMode:'remote',
                      anyMatch:true,
                      emptyText:'',
                      typeAhead: true,
                      triggerAction:'all',
                      valueField:'id',
                      displayField:'nombre',
                      selectOnTab: true,
                      name:'localidad',
                      allowBlank:false
                  },{
                      fieldLabel:'Direccion',
                      name:'direccion',
                      maxLengthText:60,
                      allowBlank:false
                  }
              ],
              buttons: [{
                  text: 'Siguiente',
                  handler: function() {
                      var wizard = this.up('#wizardId');
                      if(this.up('form').getForm().isValid())
                        wizard.getLayout().setActiveItem('stepFormRepresentanteId');
                  }
              }]
          },{
              itemId:'stepFormRepresentanteId',
              xtype:'form',
              margin:'10 10 10 10',
              title:'Paso 2 - Registro de datos del Representante',
              layout:'anchor',
              defaultType:'textfield',
              defaults:{
                  autoScroll :  true,
                  msgTarget:'under'
              },
              items:[
                  {
                      fieldLabel:'Nombre del Representante',
                      name:'nombreRepresentante',
                      maxLengthText:60,
                      allowBlank:false
                  },{
                      fieldLabel:'Apellido Representante',
                      name:'apellidoNombre',
                      maxLengthText:60,
                      allowBlank:false
                  },{
                      fieldLabel:'Teléfono 1 Representante',
                      name:'telefonoRepresentante1',
                      maxLengthText:20,
                      allowBlank:false
                  },{
                      fieldLabel:'Teléfono 2 Representante',
                      maxLengthText:20,
                      name:'telefonoRepresentante2'
                  },{
                      fieldLabel:'Teléfono 3 Representante',
                      maxLengthText:20,
                      name:'telefonoRepresentante3'
                  }
              ],
              buttons:[
                  {
                     text:'Anterior',
                     handler:function(){
                         var wizard = this.up('#wizardId');
                         wizard.getLayout().setActiveItem('stepFormGanaderoId');
                     }
                  },{
                     text:'Siguiente',
                     handler:function(){
                         var wizard = this.up('#wizardId');
                         if(this.up('form').getForm().isValid())
                             wizard.getLayout().setActiveItem('stepFormDatosExposicionId');
                     }
                  }
              ]

          },
                  {
                      xtype:'form',
                      itemId:'stepFormDatosExposicionId',
                      title:'Paso 3 - Datos de Exposición',
                      height:300,
                      defaults : {
                          msgTarget:'under'
                      },
                      items:[
                          {
                              xtype:'combo',
                              fieldLabel:'Exposición',
                              name:'exposicion',
                              editable:false,
                              width:300,
                              allowBlank:false,
                              queryMode:'remote',
                              emptyText:'',
                              typeAhead: true,
                              triggerAction:'all',
                              valueField:'id',
                              displayField:'nombre',
                              selectOnTab: true,
                              store:storeExposicion
                          },{
                              xtype:'combo',
                              fieldLabel:'Año de Exposición',
                              name:'anioExposicion',
                              allowBlank:false,
                              editable:false,
                              queryMode:'remote',
                              emptyText:'',
                              typeAhead: true,
                              triggerAction:'all',
                              valueField:'id',
                              displayField:'anio',
                              selectOnTab: true,
                              store:storeAnioExposicion
                          }
                      ],
                      buttons:[
                          {
                            text:'Anterior',
                            handler:function(){
                                var wizard = this.up('#wizardId');
                                wizard.getLayout().setActiveItem('stepFormRepresentanteId');
                            }
                          },{
                            text:'Siguiente',
                            handler:function(){
                                var wizard = this.up('#wizardId');
                                if(this.up('form').getForm().isValid())
                                    wizard.getLayout().setActiveItem('stepFormDetalleOrdenId');
                            }
                          }
                      ]
                  }

          ,{
              xtype:'panel',
              margin:'10 10 10 10',
              itemId:'stepFormDetalleOrdenId',
              title:'Paso 4 - Confección del Detalle',
              items:[
                  {
                      xtype:'form',
                      defaults:{
                            msgTarget:'under'
                      },
                      items:[
                          {
                              xtype:'combo',
                              name:'especie',
                              fieldLabel:'Especie',
                              allowBlank:false,
                              width:300,
                              queryMode:'remote',
                              emptyText:'',
                              typeAhead: true,
                              triggerAction:'all',
                              valueField:'id',
                              displayField:'nombre',
                              selectOnTab: true ,
                              store: storeEspecie,
                              listeners:{
                                  'select':function(combo,records,options){
                                      storeRaza.proxy.extraParams={especieId:records[0].data.id};
                                      storeRaza.load();

                                  }
                              }

                          },{
                              xtype:'combo',
                              name:'raza',
                              fieldLabel:'Raza',
                              allowBlank:false ,
                              width:300,
                              queryMode:'remote',
                              emptyText:'',
                              typeAhead: true,
                              triggerAction:'all',
                              valueField:'id',
                              displayField:'nombre',
                              selectOnTab: true,
                              store: storeRaza
                          },{
                              xtype:'textfield',
                              fieldLabel:'Datos del Corral',
                              name:'corral',
                              allowBlank:false,
                              width:300
                          },{
                              xtype:'numberfield',
                              name:'cantidad',
                              allowBlank:false,
                              fieldLabel:'Cantidad'
                          },{
                              xtype:'numberfield',
                              name:'peso',
                              allowBlank:false,
                              fieldLabel:'Peso'
                          },{
                              xtype:'numberfield',
                              name:'preciounitario',
                              allowBlank:false,
                              fieldLabel:'Precio Unitario'
                          }
                      ],
                      buttons:[
                          {
                              text:'Agregar Línea',
                              handler: onAddClick
                          }
                      ]
                  },
                  {
                     xtype:'grid',
                     id:'griddetalleId',
                     height:250,
                     width:900,
                     selType: 'cellmodel',
                     frame:false,
                      plugins:[plugin],
                     store: storeGridDetalle,
                     columns:[
                         {
                             header: 'Especie',
                             dataIndex: 'especie',
                             width: 150,
                             renderer: function(value) {
                                 var rec = storeEspecie.getById(value);

                                 if (rec)
                                 {
                                     return rec.data.nombre;
                                 }

                                 return '';
                             }
                         },{
                             header: 'Raza',
                             dataIndex: 'raza',
                             width: 200,
                             renderer: function(value) {
                                 var rec = storeRaza.getById(value);

                                 if (rec)
                                 {
                                     return rec.data.nombre;
                                 }

                                 return '';
                             }
                         },{
                             header: 'Corral',
                             dataIndex:'corral'
                         },{
                             header: 'Cantidad',
                             dataIndex:'cantidad',
                             width:80,
                             align:'right'
                         },{
                             header: '$ x Unidad',
                             dataIndex:'preciounitario',
                             align:'right'
                         },{
                             header: 'Peso',
                             width:80,
                             dataIndex:'peso'
                         },{
                             header: 'Subtotal',
                             align:'right',
                             dataIndex:'subtotal'
                         },{

                             xtype:'actioncolumn',
                             width:30,
                             sortable:false,
                             menuDisabled:true,
                             items:[
                                 {
                                     icon:deleteImg,
                                     tooltip:'Eliminar Línea',
                                     handler: function(grid,rowIndex){
                                         Ext.getCmp('griddetalleId').getStore().removeAt(rowIndex);
                                     }
                                 }
                             ]
                         }
                     ]

                  }
              ],
              buttons:[
                {
                  text:'Anterior',
                  handler: function(){
                        var wizard = this.up('#wizardId');
                        wizard.getLayout().setActiveItem('stepFormDatosExposicionId');
                  }
                },{
                  text:'Confirmar',
                  handler: function(){
                         confirmarorden();
                  }
                }
              ]
          }
      ]
  });
  storeRaza.load();



});