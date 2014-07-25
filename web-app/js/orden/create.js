Ext.onReady(function(){
    var flagLoadEspecies = false
    Ext.define('ganaderia.model.grid.DetalleOrden', {
        extend: 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'especie', type: 'int'},
            {name: 'raza', type: 'int'},
            {name: 'cantidad',type:'int'},
            {name: 'peso',type:'int'},
            {name: 'precio', type: 'float'}
        ]
    });

    //http://stackoverflow.com/questions/8531538/extjs4-grid-editor-remote-combobox-displayvalue
    Ext.define('ganaderia.model.combo.RazaStore',{
        extend:'Ext.data.Store',
        autoLoad:false,
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
            'beforeload':function(){
                var selModel = Ext.getCmp('griddetalleId').getSelectionModel();
                var rowSel = selModel.getLastSelected();
                storeRaza.baseParams = {
                    especieId : rowSel.data.especie
                }

            }

            /*'load':function(){
                if(flagLoadEspecies==true){
                    var selModel = Ext.getCmp('griddetalleId').getSelectionModel();
                    var rowSel = selModel.getLastSelected();
                    var firstRaza = storeRaza.first();
                    rowSel.data.raza = firstRaza.data.id;
                    rowSel.commit();
                    flagLoadEspecies = false;
                }
            } */
        }
    });

    /*storeRaza.on("beforeload",function(){
        var selModel = Ext.getCmp('griddetalleId').getSelectionModel();
        var rowSel = selModel.getLastSelected();
        storeRaza.baseParams = {
            especieId : rowSel.data.especie
        }
    }); */


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

  var plugin = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
    });

  function onAddClick(){
      var rec = new ganaderia.model.grid.DetalleOrden({
          especie: 0,
          raza: 0,
          cantidad: 0,
          peso:0,
          precio:0
      });

      Ext.getCmp('griddetalleId').getStore().insert(0, rec);
      plugin.startEditByPosition({
          row: 0,
          column: 0
      });
  }

  Ext.widget('panel',{
      title:'Registro de Orden de Compra',
      itemId:'wizardId',
      renderTo:'formpanelId',
      layout:'card',
      width:700,
      style: "margin: auto auto auto auto;",
      defaults:{
          border:false
      },
      items:[
          {
              itemId:'stepFormGanaderoId',
              xtype:'form',
              title:'Paso 1 - Registro de datos del Cliente',
              layout:'anchor',
              defaultType: 'textfield',
              items:[
                  {
                      fieldLabel:'C.U.I.T',
                      name:'cuit'
                  },{
                      fieldLabel:'Razon Social',
                      name:'razonSocial'
                  },{
                      fieldLabel:'Nombre Fantasía',
                      name:'nombreFantasia'
                  }
              ],
              buttons: [{
                  text: 'Siguiente',
                  handler: function() {
                      var wizard = this.up('#wizardId');
                      if(this.up('form').getForm().isValid())
                        wizard.getLayout().setActiveItem('stepFormDetalleOrdenId');
                  }
              }]

          },{
              itemId:'stepFormDetalleOrdenId',
              title:'Confección de Detalle de la Orden',
              xtype:'form',
              itemId:'stepFormDetalleOrdenId',
              title:'Paso 2 - Confección del Detalle',
              items:[
                  {
                     xtype:'grid',
                     id:'griddetalleId',
                     height:350,
                     width:700,
                     frame:true,
                      plugins:[plugin],
                     store: storeGridDetalle,
                      tbar: [{
                          text: 'Agregar Línea',
                          scope: this,
                          handler: onAddClick
                      }],
                     columns:[
                         {
                             header: 'Especie',
                             dataIndex: 'especie',
                             editor: new Ext.form.field.ComboBox({
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
                                           flagLoadEspecies = true;
                                           storeRaza.load();

                                     }
                                 }

                             }),
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
                             editor: new Ext.form.field.ComboBox({
                                 queryMode:'remote',
                                 emptyText:'',
                                 typeAhead: true,
                                 triggerAction:'all',
                                 valueField:'id',
                                 displayField:'nombre',
                                 selectOnTab: true,
                                 store: storeRaza
                             }),
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
                             dataIndex:'cantidad'
                         },{
                             header: 'Precio x Unidad',
                             dataIndex:'float'
                         },{
                             header: 'Peso',
                             dataIndex:'peso'
                         }
                     ]

                  }
              ],
              buttons:[{
                  text:'Anterior',
                  handler: function(){
                        var wizard = this.up('#wizardId');
                        wizard.getLayout().setActiveItem('stepFormGanaderoId');
                  }
              }]
          }
      ]
  });




});