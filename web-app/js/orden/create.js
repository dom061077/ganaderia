

Ext.onReady(function(){
    var tempCuit;

    Ext.apply(Ext.form.VTypes,{
        //cuitVal: /^\d{2}\-\d{8}\-\d{1}$/,

        numdocexistsText:'Número de documento ya existe',
        numdocexists :		function CPcuitValido(numdoc) {

            var vec= new Array(10);
            if( tempCuit!=numdoc ){
                    Ext.Ajax.request(
                        {
                            url: getDatosClientesUrl,
                            method: 'POST',
                            async:false,
                            params : {
                                cuitDni: numdoc
                            },  // end-params

                            success: function(response, opts) {
                                var objJson = Ext.decode(response.responseText);
                                if (objJson.id != null) {
                                    tempCuit = objJson.cuit;
                                    storeProvincia.load();
                                    storeLocalidad.load({params:{provinciaId:(objJson.localidad!=null?objJson.localidad.provincia.id:null)}});
                                    var rec = new ganaderia.model.ClienteGanadero({
                                        id : objJson.id,
                                        cuit : objJson.cuit,
                                        razonSocial: objJson.razonSocial,
                                        telefono1 : objJson.telefono1,
                                        telefono2 : objJson.telefono2,
                                        email : objJson.email,
                                        provincia: (objJson.localidad!=null? objJson.localidad.provincia.id:null),
                                        localidad :(objJson.localidad!=null?objJson.localidad.id:null),
                                        direccion : objJson.direccion,
                                        nombreRepresentante : objJson.nombreRepresentante,
                                        apellidoRepresentate : objJson.apellidoRepresentate,
                                        telefonoRepresentante1 : objJson.telefonoRepresentante1,
                                        telefonoRepresentante2 : objJson.telefonoRepresentante2,
                                        telefonoRepresentante3 : objJson.telefonoRepresentante3

                                    });
                                    var wizard = Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').loadRecord(rec);
                                }

                            }, // end-function

                            failure: function (response, options) {
                                Ext.Msg.show({
                                    title:'Error',
                                    msg:'Se produjo un error de comunicación',
                                    icon:Ext.MessageBox.ERROR,
                                    buttons:Ext.MessageBox.OK,
                                    fn:function(btn){
                                        //wizard.cardPanel.getLayout().setActiveItem(wizard.currentCard - 1);
                                        console.log("Error al traer datos del cliente ganadero");
                                    }
                                });
                            }

                        } // end-ajax

                    );
            }


            return true;
            // return true;//true determina que la validacion pase false indica error en la validacion
        }
    });
    function confirmarorden(){
        if (storeGridDetalle.count()==0){
            Ext.Msg.show({
                title:'Error',
                msg:'Agregue al menos una línea de detalle',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }
        var detalleArr=[];
        storeGridDetalle.data.each(function(row){
             detalleArr.push(row.data);
        });
        var detalleJson = Ext.encode(detalleArr);
        var wizard = Ext.getCmp('wizardId');
        var fieldValuesFormGanadero = wizard.getComponent('stepFormGanaderoId').getForm().getFieldValues();
        var fieldValuesFormRepresentante = wizard.getComponent('stepFormRepresentanteId').getForm().getFieldValues();
        var fieldValuesFormDatosExposicion = wizard.getComponent('stepFormDatosExposicionId').getForm().getFieldValues();
        var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});
        loadMask.show();
        Ext.Ajax.request({
            url:saveOrdenUrl,
            params:{
                'cliente.id' : fieldValuesFormGanadero.id,
                'cliente.cuit' :fieldValuesFormGanadero.cuit,
                'cliente.razonSocial':fieldValuesFormGanadero.razonSocial,
                'cliente.telefono1':fieldValuesFormGanadero.telefono1,
                'cliente.telefono2':fieldValuesFormGanadero.telefono2,
                'cliente.email':fieldValuesFormGanadero.email,
                'cliente.direccion':fieldValuesFormGanadero.direccion,
                'cliente.localidad.id':fieldValuesFormGanadero.localidad,
                'cliente.nombreRepresentante':fieldValuesFormRepresentante.nombreRepresentante,
                'cliente.apellidoRepresentante':fieldValuesFormRepresentante.apellidoRepresentante,
                'cliente.telefonoRepresentante1':fieldValuesFormRepresentante.telefonoRepresentante1,
                'cliente.telefonoRepresentante2':fieldValuesFormRepresentante.telefonoRepresentante2,
                'cliente.telefonoRepresentante3':fieldValuesFormRepresentante.telefonoRepresentante3,
                'exposicion.id':fieldValuesFormDatosExposicion.exposicion,
                'anioExposicion.id':fieldValuesFormDatosExposicion.anioExposicion,
                'detalleJson': detalleJson

            },
            success: function(xhr){
                loadMask.hide();
                var jsonObj = Ext.decode(xhr.responseText);
                console.log(xhr);
                if(jsonObj.idOrden==null){
                    console.log('Error al generar la orden: '+jsonObj.responseText);
                    var msgError='Error de carga: <br>';
                    for(var i=0;i<jsonObj.errors.length;i++){
                        msgError = msgError+'-'+jsonObj.errors[i].msg+'<br>';
                    }
                    Ext.Msg.show({
                        title:'Error',
                        msg:msgError,
                        icon:Ext.MessageBox.ERROR,
                        buttons:Ext.MessageBox.OK
                    });
                    return;
                }
                //----limpiar datos-----
                storeGridDetalle.removeAll();
                Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').getForm().reset();
                Ext.getCmp('wizardId').getComponent('stepFormRepresentanteId').getForm().reset();
                Ext.getCmp('wizardId').getComponent('stepFormDatosExposicionId').getForm().reset();
                Ext.getCmp('wizardId').getLayout().setActiveItem('stepFormGanaderoId');
                var t = new Ext.ToolTip({
                    anchor: 'bottom',
                    anchorToTarget: false,
                    targetXY: [ Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').getWidth()-200,
                        Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').getHeight()+200],
                    title: 'Mensaje',
                    html: 'La orden se Genero correctamente',
                    hideDelay: 15000,
                    closable: true
                });
                t.show();

            },
            failure: function(xhr){
                console.log("Error: "+xhr.statusText);
            }
        });

    }

    Ext.define('ganaderia.model.ClienteGanadero',{
            extend:'Ext.data.Model',
            fields: [
                    //-------form cliente-----------
                    {name:'clienteId',type:'int'},
                    {name:'cuit',type:'string'},
                    {name:'razonSocial',type:'string'},
                    {name:'telefono1',type:'string'},
                    {name:'telefono2',type:'string'},
                    {name:'email',type:'string'},
                    {name:'provincia',type:'int'},
                    {name:'localidad',type:'int'},
                    {name:'direccion',type:'string'},
                    //--------form representante-----
                    {name:'nombreRepresentante',type:'string'},
                    {name:'apellidoRepresentante',type:'string'},
                    {name:'telefonoRepresentante1',type:'string'},
                    {name:'telefonoRepresentante2',type:'string'},
                    {name:'telefonoRepresentante3',type:'string'},
                    //-------form datos exposicion-----------
                    {name:'exposicion',type:'int'},
                    {name:'anioExposicion',type:'int'}
            ]


    });

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

  Ext.define('ganaderia.model.combo.SituacionIVAStore',{
        extend:'Ext.data.Store',
        autoLoad:false,
      root:'rows',
        proxy:{
            type:'ajax',
            url:situacionIVAUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion']
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
  var storeSituacionIVA = Ext.create('ganaderia.model.combo.SituacionIVAStore');

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
                      name:'id',
                      xtype:'hidden'
                  },{
                      fieldLabel:'C.U.I.T o D.N.I',
                      name:'cuit',
                      //vtype:'cuit',
                      vtype:'numdocexists',
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
                      forceSelection : true,
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
                      forceSelection:true,
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
                      allowBlank:true
                  },{
                      fieldLabel:'Apellido Representante',
                      name:'apellidoRepresentante',
                      maxLengthText:60,
                      allowBlank:true
                  },{
                      fieldLabel:'Teléfono 1 Representante',
                      name:'telefonoRepresentante1',
                      maxLengthText:20,
                      allowBlank:true
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
                              forceSelection:true,
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
                              forceSelection: true,
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
                          },{
                              xtype:'combo',
                              fieldLabel:'Situación IVA',
                              forceSelection: true,
                              name:'situacionIVA',
                              allowBlank:false,
                              editable:false,
                              queryMode:'remote',
                              emptyText:'',
                              typeAhead: true,
                              triggerAction: 'all',
                              valueField:'id',
                              displayField:'descripcion',
                              store: storeSituacionIVA
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