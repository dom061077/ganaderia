
Ext.onReady(function(){
    /*
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
     var rec;
     if (objJson.id != null) {
     tempCuit = objJson.cuit;
     storeProvincia.load();
     storeLocalidad.load({params:{provinciaId:(objJson.localidad!=null?objJson.localidad.provincia.id:null)}});
     rec = new ganaderia.model.ClienteGanadero({
     id : objJson.id,
     clienteId: objJson.id,
     cuit : objJson.cuit,
     ingresosBrutos: objJson.ingresosBrutos,
     razonSocial: objJson.razonSocial,
     telefono1 : objJson.telefono1,
     telefono2 : objJson.telefono2,
     email : objJson.email,
     situacionIVA: objJson.situacionIVA.name,
     provincia: (objJson.localidad!=null? objJson.localidad.provincia.id:null),
     localidad :(objJson.localidad!=null?objJson.localidad.id:null),
     direccion : objJson.direccion
     });
     Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').loadRecord(rec);
     }else{
     Ext.getCmp('clienteId').setValue('Cliente Nueva');
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
     */

    Ext.QuickTips.init();
    var tempCuit;
    function subTotal(){
        var sumSubTotal=0
        storeGridDetalle.data.each(function(row){
            sumSubTotal = sumSubTotal + row.data.subtotal;
        });
        return sumSubTotal;
    }

    function buscarClienteVenta(){
        Ext.define('ganaderia.model.grid.BuscarCliente',{
            extend: 'Ext.data.Model',
            fields: [
                {name:'id',type:'int'},
                {name:'cuit',type:'string'},
                {name:'razonSocial', type:'string'},
                {name:'situacionIVA', type:'string'}
            ]
        });
        var storeGrid = Ext.create('Ext.data.JsonStore',{
            autoDestroy:true,
            autoLoad:true,
            model: ganaderia.model.grid.BuscarCliente,
            proxy : {
                type:'ajax',
                url: clientegridUrl,
                reader:{
                    type:'json',
                    root: 'data',
                    idProperty: 'id',
                    totalProperty: 'total'
                }
            },
            remoteSort: true,
            pageSize:50
        });
        var grid = Ext.create('Ext.grid.Panel',{
            border:false,
            margin: '10 10 10 10',
            loadMask: true,
            height:350,
            emptyText:'No hay Registros',
            dockedItems: [Ext.create('Ext.toolbar.Paging', {
                dock: 'bottom',
                store: storeGrid
            })],
            store:storeGrid,
            columns :[
                {text:'C.U.I.T', dataIndex: 'cuit', width: 100},
                {text:'Razón Social', dataIndex:'razonSocial', width:250},
                {text:'Situación I.V.A', dataIndex:'situacionIVA', width:100},
                {
                    xtype:'actioncolumn',
                    width:30,
                    sortable:false,
                    menuDisabled:true,
                    items:[
                        {
                            icon:selectImg,
                            tooltip:'Seleccionar',
                            handler: function(grid,rowIndex){
                                var clienteSeleccionado = storeGrid.getAt(rowIndex);
                                Ext.getCmp('cuitclienteId').setValue(clienteSeleccionado.data.cuit);
                                win.close();
                                /*var rec = new ganaderia.model.ClienteGanadero({
                                 id : clienteSeleccionado.data.id,
                                 clienteId: clienteSeleccionado.data.id,
                                 cuit : clienteSeleccionado.data.cuit,
                                 ingresosBrutos: clienteSeleccionado.data.ingresosBrutos,
                                 razonSocial: clienteSeleccionado.data.razonSocial,
                                 telefono1 : clienteSeleccionado.data.telefono1,
                                 telefono2 : clienteSeleccionado.data.telefono2,
                                 email : clienteSeleccionado.data.email,
                                 provincia: (clienteSeleccionado.data.localidad!=null? clienteSeleccionado.data.localidad.provincia.id:null),
                                 localidad :(clienteSeleccionado.data.localidad!=null?clienteSeleccionado.data.localidad.id:null),
                                 direccion : clienteSeleccionado.data.direccion
                                 });
                                 var wizard = Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').loadRecord(rec);
                                 */

                            }
                        }
                    ]
                }
            ]
        });


        var win = Ext.create('Ext.window.Window',{
            modal:true,
            width:600,
            x:400,
            y:200,

            title:'Buscar Cliente',
            items:[
                {
                    xtype:'panel',
                    width:600,
                    height:400,
                    border:false,
                    items:[
                        {xtype:'textfield',id:'filtroRazonSocialId',fieldLabel:'Filtrar por razón social'},
                        {xtype:'button',text:'Buscar',
                            handler:function(){
                                storeGrid.load({params:{razonSocial:Ext.getCmp('filtroRazonSocialId').getValue()}});
                            }
                        },
                        grid
                    ]
                }

            ]
        });
        win.show();
    }

    function showEditCliente(idCliente){
        if(!idCliente){
            Ext.Msg.show({
                title:'Error',
                msg:'Seleccione un cliente para modificar',
                buttons:Ext.Msg.OK,
                icon:Ext.Msg.ERROR
            });
            return;
        }
        var winEditCliente = Ext.create('Ext.window.Window',{
            //height:200,
            width:400,
            modal:true,
            autoDestroy:false,
            x:400,
            y:200,
            title:'Modificación de Cliente',
            items:[
                {
                    xtype:'form',
                    id:'formEditClienteId',
                    url:editClienteDetalleUrl,
                    defaultType:'textfield',
                    listeners:{
                        'afterrender':function(form,opts){
                            loadCliente(idCliente);

                        }
                    },
                    defaults:{autoScroll:true,msgTarget:'under'},
                    items:[
                        {
                            xtype:'hidden',
                            fieldLabel:'id',
                            id:'idEditClienteId',
                            name:'id'
                        },{
                            fieldLabel:'C.U.I.T o D.N.I',
                            allowBlank:false,
                            id:'cuitEditClienteId',
                            name:'cuit'
                        },{
                            fieldLabel:'Razon Social o Apellido y Nombre',
                            allowBlank:false,
                            id:'razonSocialEditClienteId',
                            name:'razonSocial'
                        },{

                            xtype:'combo',
                            fieldLabel:'Situación I.V.A',
                            forceSelection: true,
                            name:'situacionIVA',
                            id:'situacionIVAEditClienteId',
                            allowBlank:false,
                            editable:false,
                            queryMode:'remote',
                            emptyText:'',
                            typeAhead: true,
                            triggerAction: 'all',
                            valueField:'id',
                            displayField:'descripcion',
                            store: storeSituacionIVA
                        },{
                            fieldLabel:'Ing.Brutos',
                            id:'ingresosBrutosEditClienteId',
                            name:'ingresosBrutos',
                            allowBlank:false
                        },{
                            fieldLabel:'Provincia',
                            xtype:'combo',
                            store:storeProvinciaAltaCliente,
                            forceSelection : true,
                            id:'provinciaEditClienteId',
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
                                    storeLocalidadAltaCliente.proxy.extraParams={provinciaId:records[0].data.id};
                                    storeLocalidadAltaCliente.load();
                                    Ext.getCmp('localidadAltaClienteId').clearValue();
                                }
                            }
                        },{
                            fieldLabel:'Localidad',
                            xtype:'combo',
                            id:'localidadEditClienteId',
                            allowBlank:false,
                            store:storeLocalidadAltaCliente,
                            forceSelection:true,
                            queryMode:'remote',
                            anyMatch:true,
                            emptyText:'',
                            typeAhead: true,
                            triggerAction:'all',
                            valueField:'id',
                            displayField:'nombre',
                            selectOnTab: true,
                            name:'localidad.id',
                            allowBlank:false
                        },{
                            fieldLabel:'Dirección',
                            name:'direccion',
                            id:'direccionEditClienteId',
                            allowBlank:false
                        }
                    ]
                }
            ],
            buttons:[
                {
                    text:'Guardar',
                    handler:function(){
                        Ext.getCmp('formEditClienteId').getForm().submit({
                            success:function(f,a){
                                storeClienteDetalle.load();
                                Ext.getCmp('comboClienteDetalleId').setValue(a.result.idCliente);
                                winEditCliente.close();
                            },
                            failure:function(f,a){
                                var errores = a.result.errors;
                                var msgError = a.result.msgError+'<br>';
                                for(var i = 0; i < errores.length; i++){
                                    msgError = msgError + '-'+errores[i].msg+'<br>';
                                }
                                Ext.Msg.show({
                                    title:'Error',
                                    msg:msgError,
                                    icon:Ext.MessageBox.ERROR,
                                    buttons:Ext.MessageBox.OK,
                                    fn:function(){
                                        winEditCliente.close();
                                    }
                                });
                            }
                        });
                    }
                },{
                    text:'Cancelar',
                    handler:function(){
                        winEditCliente.close();


                    }
                }
            ]
        });
        winEditCliente.show();

    }

    function showAddCliente(){
        var winClienteDetalle = Ext.create('Ext.window.Window',{
            //height:200,
            width:400,
            modal:true,
            autoDestroy:false,
            x:400,
            y:200,
            title:'Alta de Cliente',
            items:[
                {
                    xtype:'form',
                    id:'formClienteDetalleId',
                    url:altaClienteDetalleUrl,
                    defaultType:'textfield',
                    defaults:{autoScroll:true,msgTarget:'under'},
                    items:[
                        {
                            fieldLabel:'C.U.I.T o D.N.I',
                            allowBlank:false,
                            name:'cuit'
                        },{
                            fieldLabel:'Razon Social o Apellido y Nombre',
                            allowBlank:false,
                            name:'razonSocial'
                        },{

                            xtype:'combo',
                            fieldLabel:'Situación I.V.A',
                            forceSelection: true,
                            name:'situacionIVA',
                            id:'situacionIVAId',
                            allowBlank:false,
                            editable:false,
                            queryMode:'remote',
                            emptyText:'',
                            typeAhead: true,
                            triggerAction: 'all',
                            valueField:'id',
                            displayField:'descripcion',
                            store: storeSituacionIVA
                        },{
                            fieldLabel:'Ing.Brutos',
                            name:'ingresosBrutos',
                            allowBlank:false
                        },{
                            fieldLabel:'Provincia',
                            xtype:'combo',
                            store:storeProvinciaAltaCliente,
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
                                    storeLocalidadAltaCliente.proxy.extraParams={provinciaId:records[0].data.id};
                                    storeLocalidadAltaCliente.load();
                                    Ext.getCmp('localidadAltaClienteId').clearValue();
                                }
                            }
                        },{
                            fieldLabel:'Localidad',
                            xtype:'combo',
                            id:'localidadAltaClienteId',
                            allowBlank:false,
                            store:storeLocalidadAltaCliente,
                            forceSelection:true,
                            queryMode:'remote',
                            anyMatch:true,
                            emptyText:'',
                            typeAhead: true,
                            triggerAction:'all',
                            valueField:'id',
                            displayField:'nombre',
                            selectOnTab: true,
                            name:'localidad.id',
                            allowBlank:false
                        },{
                            fieldLabel:'Dirección',
                            name:'direccion',
                            allowBlank:false
                        }
                    ]
                }
            ],
            buttons:[
                {
                    text:'Guardar',
                    handler:function(){
                        Ext.getCmp('formClienteDetalleId').getForm().submit({
                            success:function(f,a){
                                storeClienteDetalle.load();
                                Ext.getCmp('comboClienteDetalleId').setValue(a.result.idCliente);
                                winClienteDetalle.close();
                            },
                            failure:function(f,a){
                                var errores = a.result.errors;
                                var msgError = a.result.msgError+'<br>';
                                for(var i = 0; i < errores.length; i++){
                                    msgError = msgError + '-'+errores[i].msg+'<br>';
                                }
                                Ext.Msg.show({
                                    title:'Error',
                                    msg:msgError,
                                    icon:Ext.MessageBox.ERROR,
                                    buttons:Ext.MessageBox.OK,
                                    fn:function(){
                                        //winClienteDetalle.close();
                                    }
                                });
                            }
                        });
                    }
                },{
                    text:'Cancelar',
                    handler:function(){
                        winClienteDetalle.close();
                    }
                }
            ]
        });
        winClienteDetalle.show();

    }

    function loadOrden(){
        Ext.Ajax.request(
            {
                url: loadordenUrl,
                method: 'POST',
                async:false,
                //params : {
                //    id: idOrden
                //},  // end-params

                success: function(response, opts) {
                    var objJson = Ext.decode(response.responseText);
                    if (objJson.msg) {
                        Ext.Msg.show({
                            title:'Error',
                            msg:objJson.msg,
                            icon:Ext.MessageBox.ERROR,
                            fn:function(btn){
                                window.location='list';
                            }
                        });
                        return;
                    }
                    //------datos del form del cliente de venta---

                    storeSituacionIVA.load();
                    storeProvincia.load();
                    storeLocalidad.proxy.extraParams={provinciaId:(objJson.cliente.localidad!=null?objJson.cliente.localidad.provincia.id:null)};
                    storeLocalidad.load();
                    storeExposicion.load();
                    storeAnioExposicion.load();
                    storeOperacion.load();
                    storeDestino.load();
                    storeEspecie.load();
                    //storeClienteDetalle.load();
                    //storeRaza.load();
                    storeGasto.load();


                    var rec = new ganaderia.model.ClienteGanadero({
                        id : objJson.cliente.id,
                        ordenId : objJson.id,
                        numero : objJson.numero,
                        clienteId: objJson.cliente.id,
                        tipoOrden:objJson.tipoOrden.name,
                        cuit : objJson.cliente.cuit,
                        ingresosBrutos: objJson.cliente.ingresosBrutos,
                        razonSocial: objJson.cliente.razonSocial,
                        telefono1 : objJson.cliente.telefono1,
                        telefono2 : objJson.cliente.telefono2,
                        email : objJson.cliente.email,
                        situacionIVA: objJson.cliente.situacionIVA.name,
                        provincia: (objJson.cliente.localidad!=null? objJson.cliente.localidad.provincia.id:null),
                        localidad :(objJson.cliente.localidad!=null? objJson.cliente.localidad.id:null),
                        direccion : objJson.cliente.direccion
                    });
                    Ext.getCmp('wizardId').getComponent('stepFormGanaderoId').loadRecord(rec);

                    ///------------------------------------------
                    //--------------------------load del segundo paso datos de exposicion-----------------
                    storeProvinciaRemitente.load();
                    storeLocalidadRemitente.proxy.extraParams={tipo:'carga procedencia',provinciaId:objJson.procedencia.provincia.id}
                    storeLocalidadRemitente.load();
                    storeFormasdePago.load();

                    rec = new ganaderia.model.DatosExposicion({
                        exposicion: objJson.exposicion.id,
                        anioExposicion: objJson.anioExposicion.id,
                        operacion: objJson.operacion.id,
                        guias: objJson.guias,
                        destino: objJson.destino.id,
                        provincia: (objJson.procedencia!=null? objJson.procedencia.provincia.id:null),
                        localidad :(objJson.procedencia!=null? objJson.procedencia.id:null),
                        fechaOperacion: objJson.fechaOperacion,
                        especie:objJson.especie.id,
                        regiment2daVenta: objJson.cobrarIva
                    });

                    Ext.getCmp('wizardId').getComponent('stepFormDatosExposicionId').loadRecord(rec);
                    Ext.getCmp('localidadRemitenteId').setValue(objJson.procedencia.id);
                    //------------------------------------------------------
                    //-------------load grilla de detalle de animales------------
                    var det;
                    for(var i=0;i<objJson.detalle.length;i++){
                        det = objJson.detalle[i];
                        rec = new ganaderia.model.grid.DetalleOrden({
                            cliente: det.cliente.razonSocial,
                            raza: det.raza.nombre,
                            categoria: det.categoria.nombre,
                            corral: det.datosCorral,
                            cantidad: det.cantidad,
                            peso: det.peso,
                            preciounitario: det.preciounitario,
                            subtotal:(det.cantidad>0?det.cantidad:det.peso) * det.precio
                        });
                        storeGridDetalle.add(rec);
                    }
                    for(var i = 0;i<objJson.detallegastos.length;i++){
                        det = objJson.detallegastos[i];
                        rec = new ganaderia.model.grid.Gastos({
                            gasto:det.gasto.id,
                            gastodesc:det.gasto.descripcion,
                            porcentaje:det.porcentaje,
                            monto:det.monto,
                            //subtotal:det.subTotal*(-1)
                            subtotal:(det.porcentaje>0?subTotal()*det.porcentaje/100:det.monto)
                        });
                        storeGridGastos.add(rec);
                    }

                    for(var i = 0;i<objJson.detallevencimientos.length;i++){
                        det = objJson.detallevencimientos[i];
                        rec = new ganaderia.model.grid.Vencimientos({
                            dias: det.cantidadDias,
                            bruto: det.porcentajeBruto,
                            gastos: det.porcentajeGastos,
                            iva : det.porcentajeIva
                        });
                        storeGridVencimientos.add(rec);
                    }

                    Ext.getCmp('formadePagoId').setValue(objJson.formasdePago.id);
                    if(objJson.formasdePago.tieneVencimientos==true)
                        Ext.getCmp('panelPagosVencimientosId').setDisabled(false);
                    else
                        Ext.getCmp('panelPagosVencimientosId').setDisabled(true);

                    Ext.getCmp('ordenIdId').setValue(objJson.id);

                }, // end-function
                failure: function (response, options) {
                    Ext.Msg.show({
                        title:'Error',
                        msg:'Se produjo un error de comunicación: '+response.responseText,
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

    function loadCliente(idCliente){
        Ext.Ajax.request(
            {
                url: getDatosClientesByIdUrl,
                method: 'POST',
                async:false,
                params : {
                    id: idCliente
                },  // end-params

                success: function(response, opts) {
                    var objJson = Ext.decode(response.responseText);
                    if (objJson.id != null) {
                        Ext.getCmp('idEditClienteId').setValue(objJson.id);
                        Ext.getCmp('cuitEditClienteId').setValue(objJson.cuit);
                        Ext.getCmp('razonSocialEditClienteId').setValue(objJson.razonSocial);
                        Ext.getCmp('situacionIVAEditClienteId').setValue(objJson.situacionIVA.name);
                        Ext.getCmp('ingresosBrutosEditClienteId').setValue(objJson.ingresosBrutos);
                        Ext.getCmp('provinciaEditClienteId').setValue(objJson.localidad!=null? objJson.localidad.provincia.id:null);
                        Ext.getCmp('localidadEditClienteId').setValue(objJson.localidad!=null?objJson.localidad.id:null);
                        Ext.getCmp('direccionEditClienteId').setValue( objJson.direccion);

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


    function confirmarorden(){
        if (storeGridDetalle.count()==0){
            Ext.Msg.show({
                title:'Error',
                msg:'Agregue al menos una línea de detalle de Animales',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }
        var detalleArr=[];
        storeGridDetalle.data.each(function(row){
            detalleArr.push(row.data);
        });
        var detalleGastosArr = [];
        storeGridGastos.data.each(function(row){
            detalleGastosArr.push(row.data);
        });
        var detalleImpuestosArr = [];
        storeGridImpuestos.data.each(function(row){
            detalleImpuestosArr.push(row.data);
        });
        var detalleVencimientosArr = [];
        storeGridVencimientos.data.each(function(row){
            detalleVencimientosArr.push(row.data);
        });

        var detalle
        var detalleJson = Ext.encode(detalleArr);
        var detalleGastosJson = Ext.encode(detalleGastosArr);
        var detalleImpuestosJson = Ext.encode(detalleImpuestosJson);
        var detalleVencimientosJson = Ext.encode(detalleVencimientosArr);
        var wizard = Ext.getCmp('wizardId');
        var fieldValuesFormGanadero = wizard.getComponent('stepFormGanaderoId').getForm().getFieldValues();
        var fieldValuesFormDatosExposicion = wizard.getComponent('stepFormDatosExposicionId').getForm().getFieldValues();
        var fieldValuesFormDatosPagos = wizard.getComponent('stepFormVencimientosId').getForm().getFieldValues();
        var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});
        loadMask.show();
        Ext.Ajax.request({
            url:updateOrdenUrl,
            params:{
                'id' : fieldValuesFormGanadero.ordenId,
                'cliente.id' : fieldValuesFormGanadero.id,
                'cliente.cuit' :fieldValuesFormGanadero.cuit,
                'cliente.ingresosBrutos' : fieldValuesFormGanadero.ingresosBrutos,
                'cliente.razonSocial':fieldValuesFormGanadero.razonSocial,
                'cliente.telefono1':fieldValuesFormGanadero.telefono1,
                'cliente.telefono2':fieldValuesFormGanadero.telefono2,
                'cliente.email':fieldValuesFormGanadero.email,
                'cliente.direccion':fieldValuesFormGanadero.direccion,
                'cliente.localidad.id':fieldValuesFormGanadero.localidad,
                'exposicion.id':fieldValuesFormDatosExposicion.exposicion,
                'especie.id':fieldValuesFormDatosExposicion.especie,
                'cobrarIva':fieldValuesFormDatosExposicion.regimen2daVenta,
                'anioExposicion.id':fieldValuesFormDatosExposicion.anioExposicion,
                'operacion.id':fieldValuesFormDatosExposicion.operacion,
                'destino.id': fieldValuesFormDatosExposicion.destino,
                'procedencia.id': fieldValuesFormDatosExposicion.procedencia,
                'fechaoperacion' : fieldValuesFormDatosExposicion.fechaOperacion,
                'guias':fieldValuesFormDatosExposicion.guias,
                //'tipoOrden':fieldValuesFormGanadero.tipoOrden,
                'formasdePago.id' : fieldValuesFormDatosPagos.formadePago,
                'detalleJson': detalleJson,
                'detalleGastosJson': detalleGastosJson,
                'detalleImpuestosJson' : detalleImpuestosJson,
                'detalleVencimientosJson' : detalleVencimientosJson
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
                        buttons:Ext.Msg.OK,
                        icon:Ext.Msg.ERROR
                    });
                    return;
                }else{
                    /*var wincomprobantes = Ext.create('Ext.window.Window',{
                     modal:true,
                     width:600,
                     x:400,
                     y:200,
                     title:'Impresión de Comprobantes',
                     items:[
                     { xtype:'panel',
                     html:jsonObj.html
                     ,buttons:[
                     {
                     text:'Cerrar',
                     handler: function(){
                     }
                     }
                     ]
                     }
                     ]
                     });
                     wincomprobantes.show();
                     */
                    window.location = '../show/'+jsonObj.idOrden;

                }

            },
            failure: function(xhr){
                loadMask.hide();
                Ext.Msg.show({
                    title:'Error',
                    msg:'Error: '+xhr.statusText,
                    buttons:Ext.Msg.OK,
                    icon:Ext.Msg.ERROR
                });
                console.log("Error: "+xhr.statusText);
            }
        });

    }

    Ext.define('ganaderia.model.DatosExposicion',{
        extend:'Ext.data.Model',
        fields:[
            {name:'exposicion',type:'int'},
            {name:'anioExposicion',type:'int'},
            {name:'operacion',type:'int'},
            {name:'guias',type:'string'},
            {name:'destino', type:'int'},
            {name:'provincia',type:'int'},
            {name:'localidad',type:'int'},
            {name:'fechaOperacion',type:'date'},
            {name:'especie',type:'int'},
            {name:'regimen2daVenta', type:'boolean'}

        ]

    });

    Ext.define('ganaderia.model.ClienteGanadero',{
        extend:'Ext.data.Model',
        fields: [
            //-------form cliente-----------
            {name:'clienteId',type:'int'},
            {name:'id',type:'int'},
            {name:'numero',type:'int'},
            {name:'tipoOrden',type:'string'},
            {name:'cuit',type:'string'},
            {name:'ingresosBrutos',type:'string'},
            {name:'situacionIVA',type:'string'},
            {name:'razonSocial',type:'string'},
            {name:'telefono1',type:'string'},
            {name:'telefono2',type:'string'},
            {name:'email',type:'string'},
            {name:'provincia',type:'int'},
            {name:'localidad',type:'int'},
            {name:'direccion',type:'string'}
        ]


    });

    Ext.define('ganaderia.model.grid.DetalleOrden', {
        extend: 'Ext.data.Model',
        fields: [
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'cliente', type: 'string'},
            {name: 'categoria', type:'string'},
            {name: 'raza', type: 'string'},
            {name: 'corral', type: 'string'},
            {name: 'cantidad',type:'int'},
            {name: 'peso',type:'int'},
            {name: 'preciounitario', type: 'float'},
            {name: 'subtotal', type: 'float'}
        ]
    });

    Ext.define('ganaderia.model.grid.Gastos',{
        extend: 'Ext.data.Model',
        fields:[
            {name:'gasto',type: 'int'},
            {name:'gastodesc',type: 'string'},
            {name:'porcentaje',type:'float'},
            {name:'monto',type:'float'},
            {name:'subtotal',type:'float'}
        ]
    });

    Ext.define('ganaderia.model.grid.Impuestos',{
        extend:'Ext.data.Model',
        fields:[
            {name:'descripcion',type:'string'},
            {name:'vencimiento',type:'date'},
            {name:'porcentaje' ,type:'float'},
            {name:'subtotal'   ,type:'float'}
        ]
    });

    Ext.define('ganaderia.model.grid.Vencimientos',{
        extend:'Ext.data.Model',
        fields:[
            {name:'dias',type:'int'},
            {name:'bruto',type:'float'},
            {name:'gastos',type:'float'},
            {name:'iva',type:'float'},
            {name:'anticipo',type:'float'}
        ]
    });


    //http://stackoverflow.com/questions/8531538/extjs4-grid-editor-remote-combobox-displayvalue
    Ext.define('ganaderia.model.combo.RazaStore',{
        extend:'Ext.data.Store',
        //autoLoad:true,
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

    Ext.define('ganaderia.model.combo.GastoStore',{
        extend:'Ext.data.Store',
        autoLoad:true,
        root:'rows',
        proxy: {
            type:'ajax',
            url:gastosUrl,
            reader:{
                type: 'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion'],
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
        fields:['id','nombre','regimen2daVenta']
    });

    Ext.define('ganaderia.model.combo.CategoriaStore',{
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy: {
            type:'ajax',
            url:categoriasUrl,
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
        autoLoad:true,
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

    Ext.define('ganaderia.model.combo.Operacion',{
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url:operacionUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion']
    });
    Ext.define('ganaderia.model.combo.Destino',{
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url: destinoUrl,
            reader: {
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion']
    });

    Ext.define('ganaderia.model.combo.FormasdePago',{
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url: formasdePagoUrl,
            reader: {
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion','porcentajeDescuento','tieneVencimientos']
    });

    Ext.define('ganaderai.model.combo.TipoOrden',{
        extend:'Ext.data.Store',
        autoLoad:true,
        proxy:{
            type:'ajax',
            url:tipoOrdenUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','descripcion']
    });


    Ext.define('ganaderia.model.combo.Cliente',{
        extend:'Ext.data.Store',
        autoLoad:false,
        root:'rows',
        proxy:{
            type:'ajax',
            url:clienteListUrl,
            reader:{
                type:'json',
                root:'rows',
                idProperty:'id'
            }
        },
        fields:['id','nombre']
    });
    var storeClienteDetalle = Ext.create('ganaderia.model.combo.Cliente');

    var storeGridDetalle = new Ext.data.Store({
        model: ganaderia.model.grid.DetalleOrden,
        proxy:{
            type:'memory'
        }
    });
    var storeGridGastos = new Ext.data.Store({
        model: ganaderia.model.grid.Gastos,
        proxy:{
            type:'memory'
        }
    });
    var storeGridImpuestos = new Ext.data.Store({
        model: ganaderia.model.grid.Impuestos,
        proxy:{
            type:'memory'
        }
    });

    var storeGridVencimientos = new Ext.data.Store({
        model: ganaderia.model.grid.Vencimientos,
        sortInfo:{field:'dias',direction:'ASC'},
        proxy:{
            type:'memory'
        }
    });


    var storeEspecie = Ext.create('ganaderia.model.combo.EspecieStore');
    var storeCategoria =Ext.create('ganaderia.model.combo.CategoriaStore');
    var storeRaza = Ext.create('ganaderia.model.combo.RazaStore');
    var storeGasto = Ext.create('ganaderia.model.combo.GastoStore');
    var storeProvincia = Ext.create('ganaderia.model.combo.ProvinciaStore');
    var storeProvinciaRemitente = Ext.create('ganaderia.model.combo.ProvinciaStore');
    var storeProvinciaAltaCliente = Ext.create('ganaderia.model.combo.ProvinciaStore');
    var storeLocalidad = Ext.create('ganaderia.model.combo.LocalidadStore');
    var storeLocalidadRemitente =Ext.create('ganaderia.model.combo.LocalidadStore');
    var storeLocalidadAltaCliente =Ext.create('ganaderia.model.combo.LocalidadStore');
    var storeExposicion = Ext.create('ganaderia.model.combo.ExposicionStore');
    var storeAnioExposicion = Ext.create('ganaderia.model.combo.AnioExposicionStore');
    var storeSituacionIVA = Ext.create('ganaderia.model.combo.SituacionIVAStore');
    var storeOperacion = Ext.create('ganaderia.model.combo.Operacion');
    var storeDestino = Ext.create('ganaderia.model.combo.Destino');
    var storeFormasdePago = Ext.create('ganaderia.model.combo.FormasdePago');
    var storeTipoOrden = Ext.create('ganaderai.model.combo.TipoOrden');






    function onAddGastoClick(){
        var form = this.up('form').getForm();
        var fieldValues = form.getFieldValues();
        if(this.up('form').getForm().isValid()){
            if(fieldValues.porcentaje!=0 && fieldValues.monto!=0){
                Ext.Msg.show({
                    title:'Error',
                    msg:'Solo puede ser mayor a cero el porcentaje o el monto no los dos al mismo tiempo',
                    icon:Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    fn:function(){
                    }
                });
                return;
            }
            var recgasto = storeGasto.getById(fieldValues.gasto);
            var rec = new ganaderia.model.grid.Gastos({
                gasto: fieldValues.gasto,
                gastodesc: recgasto.data.descripcion,
                porcentaje: fieldValues.porcentaje,
                monto: fieldValues.monto,
                subtotal: (fieldValues.porcentaje>0?subTotal()*fieldValues.porcentaje/100:fieldValues.monto)
            });
            form.reset();
            storeGridGastos.add(rec);
        }
    }

    function onAddImpuestoClick(){
        if(this.up('form').getForm().isValid()){
            var form = this.up('form').getForm();
            var fieldValues = form.getFieldValues();
            var rec = new ganaderia.model.grid.Impuestos({
                descripcion: fieldValues.descripcion,
                vencimiento: fieldValues.vencimiento,
                porcentaje: fieldValues.porcentaje,
                subtotal: 0
            });
            form.reset();
            storeGridImpuestos.add(rec);

        }
    }

    function onAddVencimientoClick(){
        var totaliva=0,totalbruto=0,totalgastos=0;
        storeGridVencimientos.data.each(function(row){
            totaliva+=row.data.iva;
            totalbruto+=row.data.bruto;
            totalgastos+=row.data.gastos
        });
        totaliva+=fieldValues.iva;
        totalbruto+=fieldValues.bruto;
        totalgastos+=fieldValues.gastos;
        if(totalbruto>100){
            Ext.Msg.show({
                title:'Error',
                msg:'El porcentaje total del pago del bruto no puede ser superior al 100%',
                icon:Ext.MessageBox.ERROR,
                buttons:Ext.MessageBox.OK,
                fn:function(){

                }
            });
            return;
        }
        if(totaliva>100){
            Ext.Msg.show({
                title:'Error',
                msg:'El porcentaje total del pago de I.V.A no puede ser superior al 100%',
                icon:Ext.MessageBox.ERROR,
                buttons:Ext.MessageBox.OK,
                fn:function(){

                }
            });
            return;

        }
        if(totalgastos>100){
            Ext.Msg.show({
                title:'Error',
                msg:'El porcentaje total del pago de gastos no puede ser superior al 100%',
                icon:Ext.MessageBox.ERROR,
                buttons:Ext.MessageBox.OK,
                fn:function(){

                }
            });
            return;

        }

        if(this.up('form').getForm().isValid()){
            var form = this.up('form').getForm();
            var fieldValues = form.getFieldValues();
            var rec = new ganaderia.model.grid.Vencimientos({
                dias: fieldValues.dias,
                bruto: fieldValues.bruto,
                gastos: fieldValues.gastos,
                iva : fieldValues.iva,
                anticipo : fieldValues.anticipo
            });
            form.reset();
            storeGridVencimientos.add(rec);
        }
    }

    function onAddClick(){
        if(this.up('form').getForm().isValid()){
            var form=this.up('form').getForm();
            var fieldValues=form.getFieldValues();
            if(fieldValues.cantidad==0 && fieldValues.peso==0){
                Ext.Msg.show({
                    title:'Error',
                    msg:'Ingrese una Cantidad o un valor para el Peso',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                return;
            }
            if(fieldValues.cantidad>0 && fieldValues.peso>0){
                Ext.Msg.show({
                    title:'Error',
                    msg:'Tiene que dejar en cero la cantidado el peso, no puede ingresar un valor mayor a cero para ambos',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                return;
            }

            var rec = new ganaderia.model.grid.DetalleOrden({
                cliente: fieldValues.clienteDetalle,
                raza: fieldValues.raza,
                corral: fieldValues.corral,
                cantidad: fieldValues.cantidad,
                peso: fieldValues.peso,
                preciounitario: fieldValues.preciounitario,
                subtotal:(fieldValues.cantidad>0?fieldValues.cantidad:fieldValues.peso) * fieldValues.preciounitario
            });
            form.reset();
            storeGridDetalle.add(rec);
        }
    }

    Ext.widget('panel',{
        title:'Modificación de la Orden de Compra',
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
                        name: 'ordenId',
                        id:'ordenIdId',
                        xtype:'hidden'
                    },{
                        name:'numero',
                        id:'numeroordenId',
                        xtype:'displayfield',
                        fieldLabel:'Nº de Orden'
                    },{
                        name:'clienteId',
                        id: 'clienteId',
                        xtype:'displayfield',
                        value:'Cliente Nuevo',
                        fieldLabel:'Código de Cliente'
                    },{
                        name:'tipoOrden',
                        id:'tipoordenId',
                        width:400,
                        disabled:true,
                        xtype:'combo',
                        fieldLabel:'Tipo de Orden',
                        emptyText:'',
                        typeAhead: true,
                        triggerAction: 'all',
                        valueField:'id',
                        displayField:'descripcion',
                        store: storeTipoOrden

                    },{
                        fieldLabel:'C.U.I.T o D.N.I',
                        name:'cuit',
                        id:'cuitclienteId',
                        //vtype:'cuit',
                        xtype:'displayfield',
                        allowBlank:false
                    },{
                        fieldLabel:'Ingresos Brutos',
                        name:'ingresosBrutos'
                    },{
                        xtype:'combo',
                        fieldLabel:'Situación I.V.A',
                        width:400,
                        forceSelection: true,
                        name:'situacionIVA',
                        //allowBlank:false,
                        editable:false,
                        queryMode:'remote',
                        emptyText:'',
                        typeAhead: true,
                        triggerAction: 'all',
                        valueField:'id',
                        displayField:'descripcion',
                        store: storeSituacionIVA

                    },{
                        fieldLabel:'Razon Social/Apellido y Nombre',
                        name:'razonSocial',
                        width:500,
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
                        width:400,
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
                        width:500,
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
                        width:500,
                        maxLengthText:60,
                        allowBlank:false
                    }
                ],
                buttons: [{
                    text: 'Siguiente',
                    handler: function() {
                        var wizard = this.up('#wizardId');
                        if(this.up('form').getForm().isValid())
                            wizard.getLayout().setActiveItem('stepFormDatosExposicionId');
                        //  wizard.getLayout().setActiveItem('stepFormVencimientosId');
                    }
                }]
            }

            ,{
                xtype:'form',
                itemId:'stepFormDatosExposicionId',
                layout:'anchor',
                margin:'10 10 10 10',
                title:'Paso 2 - Datos de Exposición',
                defaults : {
                    autoScroll : true,
                    msgTarget:'under',
                    xtype:'textfield'
                },
                items:[
                    {
                        xtype:'combo',
                        fieldLabel:'Exposición',
                        forceSelection:true,
                        name:'exposicion',
                        editable:false,
                        disabled:true,
                        width:300,
                        //allowBlank:false,
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
                        disabled:true,
                        forceSelection: true,
                        name:'anioExposicion',
                        //allowBlank:false,
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
                        fieldLabel:'Operación',
                        forceSelection:true,
                        name:'operacion',
                        //allowBlank:false,
                        editable:false,
                        queryMode:'remote',
                        emtpytext:'',
                        typeAhead: true,
                        triggerAction:'all',
                        valueField:'id',
                        displayField:'descripcion',
                        store:storeOperacion
                    },{
                        name:'guias',
                        fieldLabel:'Guías'
                    },{
                        name:'destino',
                        fieldLabel:'Destino',
                        xtype:'combo',
                        //allowBlank:false,
                        queryMode:'remote',
                        forceSelection:true,
                        editable:false,
                        emptyText:'',
                        typeAhead:true,
                        triggerAction:'all',
                        valueField:'id',
                        displayField:'descripcion',
                        selectOnTab: true,
                        store:storeDestino
                    },{
                        fieldLabel:'Provincia Proc./Remitente',
                        xtype:'combo',
                        width:450,
                        store:storeProvinciaRemitente,
                        forceSelection : true,
                        name:'provincia',
                        //allowBlank:false,
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
                                storeLocalidadRemitente.proxy.extraParams={tipo:'proce del combo',provinciaId:records[0].data.id};
                                storeLocalidadRemitente.load();
                                Ext.getCmp('localidadRemitenteId').clearValue();
                            }
                        }
                    },{
                        fieldLabel:'Localidad Proc./Remitente',
                        xtype:'combo',
                        width:500,
                        id:'localidadRemitenteId',
                        name:'localidad',
                        //allowBlank:false,
                        store:storeLocalidadRemitente,
                        forceSelection:true,
                        queryMode:'remote',
                        anyMatch:true,
                        emptyText:'',
                        typeAhead: true,
                        triggerAction:'all',
                        valueField:'id',
                        displayField:'nombre',
                        selectOnTab: true,
                        name:'procedencia'
                    },{
                        xtype:'datefield',
                        name:'fechaOperacion',
                        //allowBlank:false,
                        fieldLabel:'Fecha Operación'
                    },{
                        xtype:'combo',
                        name:'especie',
                        fieldLabel:'Especie',
                        //allowBlank:false,
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
                                if(records[0].data.regimen2daVenta==true){
                                    Ext.getCmp('regimen2daVentaId').show();
                                }else
                                    Ext.getCmp('regimen2daVentaId').hide();
                                //storeCategoria.proxy.extraParams={especieId:records[0].data.id};
                                // storeCategoria.load();

                            }
                        }
                    },{
                        xtype:'checkboxfield',
                        id:'regimen2daVentaId',
                        fieldLabel:'Se cobra I.V.A',
                        name:'regimen2daVenta',
                        checked:true

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
            }

            ,{
                xtype:'panel',
                margin:'10 10 10 10',
                itemId:'stepFormDetalleOrdenId',
                title:'Paso 3 - Confección del Detalle',
                items:[
                    {
                        xtype:'grid',
                        id:'griddetalleId',
                        title:'Detalle Confeccionado',
                        height:250,
                        width:900,
                        selType: 'cellmodel',
                        frame:false,
                        //plugins:[plugin],
                        store: storeGridDetalle,
                        columns:[
                            {
                                header: 'Cliente',
                                dataIndex: 'cliente',
                                width: 150
                            },{
                                header: 'Categoria',
                                dataIndex:'categoria',
                                width:150
                            },{
                                header: 'Raza',
                                dataIndex: 'raza',
                                width: 200
                            },{
                                header: 'Leyenda',
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
                            }/*,
                             {

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
                             }*/
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
                        text:'siguiente',
                        handler: function(){
                            if (storeGridDetalle.count()==0){
                                Ext.Msg.show({
                                    title:'Error',
                                    msg:'Agregue al menos una línea de detalle',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR
                                });
                                return;
                            }
                            var wizard = this.up('#wizardId');
                            wizard.getLayout().setActiveItem('stepFormGastosVentaId');

                        }
                    }
                ]
            }

            ,{
                xtype:'panel',
                margin:'10 10 10 10',
                itemId:'stepFormGastosVentaId',
                title:'Paso 4 - Gastos de Venta',

                items:[
                    {
                        xtype:'form',
                        //height:300,
                        border:false,
                        layout:'anchor',
                        defaults:{msgTarget:'under'},
                        defaultType:'textfield',
                        items:[
                            {
                                xtype:'combo',
                                name:'gasto',
                                fieldLabel:'Gasto',
                                allowBlank:false ,
                                width:300,
                                queryMode:'remote',
                                emptyText:'',
                                typeAhead: true,
                                forceSelection:true,
                                triggerAction:'all',
                                valueField:'id',
                                displayField:'descripcion',
                                selectOnTab: true,
                                store: storeGasto

                            },{
                                xtype:'numberfield',
                                fieldLabel:'Porcentaje',
                                value:0,
                                name: 'porcentaje'
                            },{
                                xtype:'numberfield',
                                fieldLabel:'Monto',
                                value:0,
                                name: 'monto'
                            }
                        ],
                        buttons:[
                            {
                                text:'Agregar Linea',
                                handler: onAddGastoClick
                            }
                        ]
                    },
                    {
                        xtype:'grid',
                        id:'gridDetalleGastosId',
                        title:'Detalle de Gastos Confeccionado',
                        height:250,
                        width:700,
                        //selType: 'cellmodel',
                        frame:false,
                        store: storeGridGastos,
                        columns:[
                            {
                                header: 'Descripción',
                                dataIndex: 'gastodesc',
                                width: 150

                            },{
                                header: 'Porcentaje',
                                dataIndex:'porcentaje'
                            },{
                                header: '$ Monto',
                                dataIndex:'monto',
                                width:80,
                                align:'right'
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
                                            Ext.getCmp('gridDetalleGastosId').getStore().removeAt(rowIndex);
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
                        handler:function(){
                            var wizard = this.up('#wizardId');
                            wizard.getLayout().setActiveItem('stepFormDetalleOrdenId');
                        }
                    },{
                        text:'Siguiente',
                        handler:function(){
                            var wizard = this.up('#wizardId');
                            wizard.getLayout().setActiveItem('stepFormVencimientosId');
                        }
                    }
                ]
            }

            ,{
                xtype:'form',
                margin:'10 10 10 10',
                itemId:'stepFormVencimientosId',
                title:'Paso 5 - Pago',
                defaults:{msgTarget:'under'},
                items:[
                    {
                        xtype:'combo',
                        fieldLabel:'Condición de Operación',
                        forceSelection:true,
                        name:'formadePago',
                        id:'formadePagoId',
                        allowBlank:false,
                        editable:false,
                        queryMode:'remote',
                        emtpyText:'',
                        typeAhead:true,
                        triggerAction:'all',
                        valueField:'id',
                        displayField:'descripcion',
                        store: storeFormasdePago,
                        listeners:{
                            'select':function(combo,records,options){
                                if(records[0].data.tieneVencimientos==true){
                                    Ext.getCmp('panelPagosVencimientosId').setDisabled(false);
                                }else
                                    Ext.getCmp('panelPagosVencimientosId').setDisabled(true);
                            }
                        }

                    },{
                        xtype:'panel',
                        id:'panelPagosVencimientosId',
                        border:false,
                        disabled:true,
                        items:[
                            {
                                xtype:'form',
                                //height:300,
                                border:false,
                                layout:'anchor',
                                defaults:{msgTarget:'under'},
                                defaultType:'textfield',
                                items:[
                                    {
                                        xtype:'numberfield',
                                        fieldLabel:'Cantidad días',
                                        name: 'dias',
                                        minValue:5
                                    },{
                                        xtype:'numberfield',
                                        fieldLabel:'% Bruto',
                                        minValue:10,
                                        maxValue:100,
                                        name: 'bruto'
                                    },{
                                        xtype:'numberfield',
                                        fieldLabel:'% Gastos',
                                        minValue:10,
                                        maxValue:100,
                                        name: 'gastos'
                                    },{
                                        xtype:'numberfield',
                                        fieldLabel:'% I.V.A',
                                        minValue:10,
                                        maxValue:100,
                                        name: 'iva'
                                    },{
                                        xtype:'numberfield',
                                        fieldLabel:'Anticipo',
                                        minValue:10,
                                        maxValue:100,
                                        name: 'anticipo'
                                    }
                                ],
                                buttons:[
                                    {
                                        text:'Agregar Linea',
                                        handler: onAddVencimientoClick
                                    }
                                ]
                            },{
                                xtype:'grid',
                                id:'gridDetalleVencimientosId',
                                title:'Detalle Confeccionado',
                                height:250,
                                width:700,
                                //selType: 'cellmodel',
                                frame:false,
                                store: storeGridVencimientos,
                                columns:[
                                    {
                                        header: 'Días',
                                        dataIndex:'dias',
                                        //xtype: 'numericfield',
                                        width:100,
                                        align:'right'
                                    },{
                                        header: '% Bruto',
                                        align:'right',
                                        dataIndex:'bruto'
                                    },{
                                        header: '% Gastos',
                                        align:'right',
                                        dataIndex:'gastos'

                                    },{
                                        header: '% IVA',
                                        align:'right',
                                        dataIndex:'iva'
                                    },{
                                        header: 'Anticipo',
                                        align:'right',
                                        dataIndex:'anticipo'
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
                                                    Ext.getCmp('gridDetalleVencimientosId').getStore().removeAt(rowIndex);
                                                }
                                            }
                                        ]
                                    }
                                ]

                            }

                        ]
                    }
                ],
                buttons:[
                    {
                        text:'Anterior',
                        handler:function(){
                            var wizard = this.up('#wizardId');
                            wizard.getLayout().setActiveItem('stepFormGastosVentaId');
                        }
                    },{
                        text:'Confirmar',
                        handler:function(){
                            confirmarorden();
                        }
                    }
                ]
            }
        ]
    });
    loadOrden();
    Ext.getCmp('regimen2daVentaId').hide();
    //storeRaza.load();
    //Ext.getCmp('regimen2daVentaId').hide();


});