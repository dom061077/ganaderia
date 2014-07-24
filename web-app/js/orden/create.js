Ext.onReady(function(){
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

    http://stackoverflow.com/questions/8531538/extjs4-grid-editor-remote-combobox-displayvalue
  Ext.define('ganaderia.model.combo.EspecieStore',{
      extend:'Ext.data.Store',

  });

  var plugin = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1
    });

  function onAddClick(){
      var rec = new ganaderia.model.grid.DetalleOrden({
          ganadoid: 0,
          descripcionganado: '',
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
      width:500,
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
                     frame:true,
                      plugins:[plugin],
                     store: new Ext.data.Store({
                         model: ganaderia.model.grid.DetalleOrden,
                         proxy:{
                             type:'memory'
                         }
                     }),
                      tbar: [{
                          text: 'Add Plant',
                          scope: this,
                          handler: onAddClick
                      }],
                     columns:[
                         {
                             header: 'Especie',
                             dataIndex: 'descripcionganado',
                             editor: new Ext.form.field.ComboBox({
                                 typeAhead: true,
                                 triggerAction:'all',
                                 selectOnTab: true

                             }),
                             renderer: function(value) {
                                 var rec = comboStore.getById(value);

                                 if (rec)
                                 {
                                     return rec.get('label');
                                 }

                                 return '&mdash;';
                             }
                         },{
                             header: 'Raza',
                             dataIndex: 'raza'
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