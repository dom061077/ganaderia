Ext.onReady(function(){
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
                     frame:true,
                     store: new Ext.data.Store({
                         model: ColocarModel,
                         proxy:{
                             type:'memory'
                         }
                     }),
                     columns:[
                         {
                             header: 'Ganado',
                             dataIndex: 'ganado',
                             editor: {allowBlank:false}
                         },{
                             header: 'Cantidad',
                             dataIndex: 'cantidad'
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
                        var wizard = this.up('#wizard');
                        wizard.getLayout().setActiveItem('stepFormGanaderoId');
                  }
              }]
          }
      ]
  });




});