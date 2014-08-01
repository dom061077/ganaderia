Ext.onReady(function(){

    function confirmarorden(){
        var detalleArr=[];
        storeGridDetalle.data.each(function(row){
             detalleArr.push(row.data);
        });
        var detalleJson = Ext.encode(detalleArr);
        alert('Json generado '+detalleJson);
        storeGridDetalle.removeAll();
    }


    Ext.define('ganaderia.model.grid.DetalleOrden', {
        extend: 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'especie', type: 'int'},
            {name: 'raza', type: 'int'},
            {name: 'cantidad',type:'int'},
            {name: 'peso',type:'int'},
            {name: 'preciounitario', type: 'float'}
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
        proxy:{
            type: 'ajax',
            url: provinciaUrl,
            root: 'rows',
            idProperty:'id'
        },
        fields:['id','nombre']
    });

    Ext.define('ganaderia.model.combo.LocalidadStore',{
        extend: 'Ext.data.Store',
        root: 'rows',
        proxy:{
            type:'ajax',
            url: localidadUrl,
            root: 'rows',
            idProperty:'id'
        },
        fields:['id','nombre']

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
             cantidad: fieldValues.cantidad,
             peso: fieldValues.peso,
             preciounitario: fieldValues.preciounitario
          });
          form.reset();
          storeGridDetalle.add(rec);
      }
  }

  Ext.widget('panel',{
      title:'Registro de Orden de Compra',
      itemId:'wizardId',
      renderTo:'formpanelId',
      layout:'card',
      width:750,
      style: "margin: auto auto auto auto;",
      defaults:{
          border:false
      },
      items:[
          {
              itemId:'stepFormGanaderoId',
              xtype:'form',
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
                      name:'name'
                  },{
                      fieldLabel:'sitioWeb',
                      maxLengthText:60,
                      name:'sitioWeb'
                  },{
                      fieldLabel:'Provincia',
                      xtype:'combo',
                      store:storeEspecie,
                      name:'provincia',
                      allowBlank:false,
                      queryMode:'remote',
                      emptyText:'',
                      typeAhead: true,
                      triggerAction:'all',
                      valueField:'id',
                      displayField:'nombre',
                      selectOnTab:true
                  },{
                      fieldLabel:'Localidad',
                      xtype:'combo',
                      allowBlank:false,
                      store:storeLocalidad,
                      queryMode:'remote',
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
                             wizard.getLayout().setActiveItem('stepFormDetalleOrdenId');
                     }
                  }
              ]


          },{
              itemId:'stepFormDetalleOrdenId',
              title:'Confección de Detalle de la Orden',
              xtype:'panel',
              margin:'10 10 10 10',
              itemId:'stepFormDetalleOrdenId',
              title:'Paso 2 - Confección del Detalle',
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
                              queryMode:'remote',
                              emptyText:'',
                              typeAhead: true,
                              triggerAction:'all',
                              valueField:'id',
                              displayField:'nombre',
                              selectOnTab: true,
                              store: storeRaza
                          },{
                              xtype:'numberfield',
                              name:'cantidad',
                              fieldLabel:'Cantidad'
                          },{
                              xtype:'numberfield',
                              name:'peso',
                              fieldLabel:'Peso'
                          },{
                              xtype:'numberfield',
                              name:'preciounitario',
                              fieldLabel:'Precio Unitario'
                          }
                      ],
                      buttons:[
                          {
                              text:'Agregar Línea',
                              handler: onAddClick
                          }
                      ]
                  },{
                     xtype:'grid',
                     id:'griddetalleId',
                     height:250,
                     width:750,
                     selType: 'cellmodel',
                     frame:true,
                      plugins:[plugin],
                     store: storeGridDetalle,
                     columns:[
                         {
                             header: 'Especie',
                             dataIndex: 'especie',
                             width: 150,
                             /*editor: new Ext.form.field.ComboBox({
                                 queryMode:'remote',
                                 emptyText:'',
                                 typeAhead: true,
                                 triggerAction:'all',
                                 valueField:'id',
                                 displayField:'nombre',
                                 selectOnTab: true ,
                                 store: storeEspecie,
                                 listeners:{
                                     //'select':function(combo,records,options){
                                     //    storeRaza.load();

                                     //}
                                 }

                             }),*/
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
                             /*editor: new Ext.form.field.ComboBox({
                                 queryMode:'remote',
                                 emptyText:'',
                                 typeAhead: true,
                                 triggerAction:'all',
                                 valueField:'id',
                                 displayField:'nombre',
                                 selectOnTab: true,
                                 store: storeRaza,
                                 listeners:{
                                     'beforerender':function(combo,opts){
                                         //var selModel = Ext.getCmp('griddetalleId').getSelectionModel();
                                         //var rowSel = selModel.getLastSelected();
                                         //storeRaza.proxy.extraParams = {especieId:rowSel.data.especie};
                                     }
                                 }
                             }),*/
                             renderer: function(value) {
                                 var rec = storeRaza.getById(value);

                                 if (rec)
                                 {
                                     return rec.data.nombre;
                                 }

                                 return '';
                             }
                         },{
                             header: 'Cantidad',
                             dataIndex:'cantidad',
                             align:'right'
                         },{
                             header: 'Precio x Unidad',
                             dataIndex:'preciounitario',
                             align:'right'
                         },{
                             header: 'Peso',
                             dataIndex:'peso'
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
                        wizard.getLayout().setActiveItem('stepFormRepresentanteId');
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