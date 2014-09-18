
Ext.onReady(function(){


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
                        storeClienteDetalle.load();
                        storeRaza.load();
                        storeGasto.load();


                        var rec = new ganaderia.model.ClienteGanadero({
                            id : objJson.cliente.id,
                            numero : objJson.numero,
                            tipoOrden:objJson.tipoOrden.name,
                            ordenId : objJson.id,
                            clienteId: objJson.cliente.id,
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
                            detid : det.id,
                            clienteid: det.cliente.id,
                            cliente: det.cliente.razonSocial,
                            categoria: det.categoria.nombre,
                            raza: det.raza.nombre,
                            corral: det.datosCorral,
                            cantidad: det.cantidad,
                            peso: det.peso,
                            preciounitario: det.precio,
                            subtotal:(det.cantidad>0?det.cantidad:det.peso) * det.precio
                        });
                        storeGridDetalle.add(rec);
                    }
                    for(var i = 0;i<objJson.detallegastos.length;i++){
                        det = objJson.detallegastos[i];
                        rec = new ganaderia.model.grid.Gastos({
                            gasto:det.gasto.id,
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
                        storeGridVencVentas.add(rec);
                    }

                    if(objJson.ordenescompra.length>0){
                        for(var i = 0;i<objJson.ordenescompra[0].detallevencimientos.length;i++){
                            det = objJson.ordenescompra[0].detallevencimientos[i];
                            rec = new ganaderia.model.grid.Vencimientos({
                                dias: det.cantidadDias,
                                bruto: det.porcentajeBruto,
                                gastos: det.porcentajeGastos,
                                iva : det.porcentajeIva
                            });
                            storeGridVencVentas.add(rec);
                        }
                        for(var i = 0;i<objJson.ordenescompra[0].detallegastos.length;i++){
                            det = objJson.ordenescompra[0].detallegastos[i];
                            rec = new ganaderia.model.grid.Gastos({
                                gasto:det.gasto.id,
                                porcentaje:det.porcentaje,
                                monto:det.monto,
                                //subtotal:det.subTotal*(-1)
                                subtotal:(det.porcentaje>0?subTotal()*det.porcentaje/100:det.monto)
                            });
                            storeGridGastosCompra.add(rec);
                        }

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
        var detalleGastosVentaArr = [];
        storeGridGastos.data.each(function(row){
            detalleGastosVentaArr.push(row.data);
        });
        var detalleGastosCompraArr = [];
        storeGridGastosCompra.data.each(function(row){
            detalleGastosCompraArr.push(row.data);
        });

        var detalleImpuestosArr = [];
        storeGridImpuestos.data.each(function(row){
            detalleImpuestosArr.push(row.data);
        });
        var detalleVencVentasArr = [];
        storeGridVencVentas.data.each(function(row){
            detalleVencVentasArr.push(row.data);
        });
        var detalleVencComprasArr = [];
        storeGridVencCompras.data.each(function(row){
            detalleVencComprasArr.push(row.data);
        });

        var detalle
        var detalleJson = Ext.encode(detalleArr);
        var detalleVencVentasJson = Ext.encode(detalleVencVentasArr);
        var detalleVencComprasJson = Ext.encode(detalleVencComprasArr);
        var detalleGastosVentaJson = Ext.encode(detalleGastosVentaArr);
        var detalleGastosCompraJson = Ext.encode(detalleGastosCompraArr);
        var wizard = Ext.getCmp('wizardId');
        var fieldValuesFormGanadero = wizard.getComponent('stepFormGanaderoId').getForm().getFieldValues();
        var fieldValuesFormDatosExposicion = wizard.getComponent('stepFormDatosExposicionId').getForm().getFieldValues();
        var fieldValuesFormDatosPagos = wizard.getComponent('stepFormVencimientosId').getForm().getFieldValues();
        var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:'Enviando Información'});
        loadMask.show();
        Ext.Ajax.request({
            url:saveOrdenUrl,
            params:{
                'id' : fieldValuesFormGanadero.ordenId,
                'cliente.id' : fieldValuesFormGanadero.id,
                'cliente.cuit' :fieldValuesFormGanadero.cuit,
                'cliente.situacionIVA':fieldValuesFormGanadero.situacionIVA,
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
                'detalleGastosVenta':detalleGastosVentaJson,
                'detalleGastosCompra':detalleGastosCompraJson,
                'detalleVencVentasJson' : detalleVencVentasJson,
                'detalleVencComprasJson': detalleVencComprasJson
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
                    /*
                     var wincomprobantes = Ext.create('Ext.window.Window',{
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
                    //window.location = 'show/'+jsonObj.idOrden;
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


    Ext.define('ganaderia.model.ClienteGanadero',{
        extend:'Ext.data.Model',
        fields: [
            //-------form cliente-----------
            {name:'clienteId',type:'int'},
            {name:'id',type:'int'},
            {name:'numero',type:'int'},
            {name:'tipoOrden',type:'name'},
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


    Ext.define('ganaderia.model.grid.DetalleOrden', {
        extend: 'Ext.data.Model',
        fields: [
            {name :'detid', type:'int'},
            {name:'clienteid', type:'int'},
            {name: 'cliente', type: 'string'},
            {name: 'categoria', type: 'string'},
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

    var storeGridGastosCompra = new Ext.data.Store({
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

    var storeGridVencVentas = new Ext.data.Store({
        model: ganaderia.model.grid.Vencimientos,
        sortInfo:{field:'dias',direction:'ASC'},
        proxy:{
            type:'memory'
        }
    });

    var storeGridVencCompras = new Ext.data.Store({
        model: ganaderia.model.grid.Vencimientos,
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

    var plugin = new Ext.grid.plugin.CellEditing({
        clicksToEdit: 1,
        listeners:{
            'edit':function( editor, e){
                var selModel = Ext.getCmp('griddetalleId').getSelectionModel();
                var rowSel = selModel.getLastSelected();
                if (e.record.data.cantidad>0 && e.record.data.peso>0){
                    Ext.Msg.show({
                        title:'Error',
                        msg:'Ingese la cantidad o el peso, no ambos a la vez',
                        buttons:Ext.Msg.OK,
                        icon:Ext.Msg.ERROR
                    });
                    e.record.reject();
                    return;
                }
                if(e.record.data.cantidad>0)
                    e.record.data.subtotal = e.record.data.cantidad * e.record.data.preciounitario;
                if(e.record.data.peso>0)
                    e.record.data.subtotal = e.record.data.cantidad * e.record.data.preciounitario;
                e.record.commit();
            }

        }
    });




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
            var rec = new ganaderia.model.grid.Gastos({
                gasto: fieldValues.gasto,
                porcentaje: fieldValues.porcentaje,
                monto: fieldValues.monto,
                subtotal: (fieldValues.porcentaje>0?subTotal()*fieldValues.porcentaje/100:fieldValues.monto)
            });
            form.reset();
            storeGridGastos.add(rec);
        }
    }

    function onAddGastoCompraClick(){
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
            var rec = new ganaderia.model.grid.Gastos({
                gasto: fieldValues.gasto,
                porcentaje: fieldValues.porcentaje,
                monto: fieldValues.monto,
                subtotal: (fieldValues.porcentaje>0?subTotal()*fieldValues.porcentaje/100:fieldValues.monto)
            });
            form.reset();
            storeGridGastosCompra.add(rec);
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

    function onAddVencimientoClick(button,opts){
        var totaliva=0,totalbruto=0,totalgastos=0;
        //Ext.getCmp('formPagosVencimientosVentaId').getForm().getFieldValues(),storeGridVencVentas
        var idform = button.up('form').getId();
        var fieldValues= Ext.getCmp(idform).getForm().getFieldValues();
        var storeGridVencimientos;

        if(idform =='formPagosVencimientosVentaId')
            storeGridVencimientos = storeGridVencVentas;
        else
            storeGridVencimientos = storeGridVencCompras;

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

        if(button.up('form').getForm().isValid()){
            //var form = this.up('form').getForm();
            //var fieldValues = form.getFieldValues();
            var rec = new ganaderia.model.grid.Vencimientos({
                dias: fieldValues.dias,
                bruto: fieldValues.bruto,
                gastos: fieldValues.gastos,
                iva : fieldValues.iva,
                anticipo: fieldValues.anticipo
            });
            button.up('form').getForm().reset();
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
                categoria: fieldValues.categoria,
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
        title:'Modificación de Orden de Venta',
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
                //layout:'anchor',
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
                        forceSelection: true,
                        name:'situacionIVA',
                        width:400,
                        //allowBlank:false,
                        //editable:false,
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
                        style:{textTransform: 'uppercase'},
                        width:400,
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
                        width:500,
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
                        width:400,
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
                            wizard.getLayout().setActiveItem('stepFormDatosExposicionId');
                        //  wizard.getLayout().setActiveItem('stepFormVencimientosId');
                    }
                }]
            },{
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
                        //editable:false,
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
                        forceSelection: true,
                        name:'anioExposicion',
                        //allowBlank:false,
                        //editable:false,
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
                        //editable:false,
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
                        //editable:false,
                        emptyText:'',
                        typeAhead:true,
                        triggerAction:'all',
                        valueField:'id',
                        displayField:'descripcion',
                        selectOnTab: true,
                        store:storeDestino
                    },{
                        fieldLabel:'Provincia Proc./Remitente',
                        width:500,
                        xtype:'combo',
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
                                storeLocalidadRemitente.proxy.extraParams={provinciaId:records[0].data.id};
                                storeLocalidadRemitente.load();
                                Ext.getCmp('localidadRemitenteId').clearValue();
                            }
                        }
                    },{
                        fieldLabel:'Localidad Proc./Remitente',
                        width:500,
                        xtype:'combo',
                        id:'localidadRemitenteId',
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
                                storeCategoria.proxy.extraParams={especieId:records[0].data.id};
                                storeCategoria.load();
                                storeRaza.proxy.extraParams= {especieId:records[0].data.id};
                                storeRaza.load();

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
                tools:[
                    {
                        type:'gear',
                        tooltip:'Permite modificar datos del cliente seleccionado',
                        handler: function(event, toolEl, panelHeader){
                            showEditCliente(Ext.getCmp('comboClienteDetalleId').getValue());
                        }
                    }
                ],
                items:[

                    {
                        xtype:'grid',
                        id:'griddetalleId',
                        title:'Detalle Confeccionado',
                        height:250,
                        width:900,
                        selType: 'cellmodel',
                        frame:false,
                        plugins:[plugin],
                        store: storeGridDetalle,
                        columns:[
                            {
                                header: 'Cliente',
                                dataIndex: 'cliente',
                                width: 150
                            },{
                                header: 'Categoría',
                                dataIndex: 'categoria',
                                width: 100

                            },{
                                header: 'Raza',
                                dataIndex: 'raza',
                                width: 150
                            },{
                                header: 'Leyenda',
                                dataIndex:'corral'
                            },{
                                header: 'Cantidad',
                                dataIndex:'cantidad',
                                editor:{
                                    xtype:'numberfield',
                                    minValue:1
                                },
                                width:60,
                                align:'right'
                            },{
                                header: 'Peso',
                                width:60,
                                editor:{
                                    xtype:'numberfield',
                                    minValue:1
                                },
                                dataIndex:'peso'
                            },{
                                header: '$ x Unidad',
                                dataIndex:'preciounitario',
                                editor:{
                                    xtype:'numberfield',
                                    minValue:1
                                },
                                align:'right'
                            },{
                                header: 'Subtotal',
                                align:'right',
                                dataIndex:'subtotal'
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
                        text:'siguiente',
                        handler: function(){
                            /*reactivar luego estas lineas
                             if (storeGridDetalle.count()==0){
                             Ext.Msg.show({
                             title:'Error',
                             msg:'Agregue al menos una línea de detalle',
                             buttons: Ext.Msg.OK,
                             icon: Ext.Msg.ERROR
                             });
                             return;
                             } */
                            var wizard = this.up('#wizardId');
                            wizard.getLayout().setActiveItem('stepFormGastosVentaId');

                        }
                    }
                ]
            },{
                xtype:'panel',
                margin:'10 10 10 10',
                itemId:'stepFormGastosVentaId',
                title:'Paso 4 - Gastos',

                items:[
                    {
                        xtype:'panel',
                        layout:'column',
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
                                        text:'Agregar Gasto Venta',
                                        handler: onAddGastoClick
                                    }
                                ]
                            }
                            ,
                            {
                                xtype:'form',
                                margin: '0 0 0 150',
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
                                        text:'Agregar Gasto Compra',
                                        handler: onAddGastoCompraClick
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype:'panel',
                        layout:'column',
                        items:[
                            {
                                xtype:'grid',
                                id:'gridDetalleGastosId',
                                title:'Detalle de Gastos de Venta',
                                height:250,
                                width:430,
                                //selType: 'cellmodel',
                                frame:false,
                                store: storeGridGastos,
                                columns:[
                                    {
                                        header: 'Descripción',
                                        dataIndex: 'gasto',
                                        width: 150,
                                        renderer: function(value) {
                                            var rec = storeGasto.getById(value);

                                            if (rec)
                                            {
                                                return rec.data.descripcion;
                                            }

                                            return '';
                                        }

                                    },{
                                        header: 'Porcentaje',
                                        width:80,
                                        dataIndex:'porcentaje'
                                    },{
                                        header: '$ Monto',
                                        dataIndex:'monto',
                                        width:80,
                                        align:'right'
                                    },{
                                        header: 'Subtotal',
                                        width:80,
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
                            ,{
                                xtype:'grid',
                                margin: '0 0 0 10',
                                id:'gridDetalleGastosCompradorId',
                                title:'Detalle de Gastos de Compra',
                                height:250,
                                width:430,
                                //selType: 'cellmodel',
                                frame:false,
                                store: storeGridGastosCompra,
                                columns:[
                                    {
                                        header: 'Descripción',
                                        dataIndex: 'gasto',
                                        width: 150,
                                        renderer: function(value) {
                                            var rec = storeGasto.getById(value);

                                            if (rec)
                                            {
                                                return rec.data.descripcion;
                                            }

                                            return '';
                                        }

                                    },{
                                        header: 'Porcentaje',
                                        width: 80,
                                        dataIndex:'porcentaje'
                                    },{
                                        header: '$ Monto',
                                        dataIndex:'monto',
                                        width:80,
                                        align:'right'
                                    },{
                                        header: 'Subtotal',
                                        align:'right',
                                        width:80,
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
                                                    Ext.getCmp('gridDetalleGastosCompradorId').getStore().removeAt(rowIndex);
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
            },{
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
                        //editable:false,
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
                                xtype:'panel',
                                layout:'column',
                                items:[
                                    {
                                        xtype:'form',
                                        //height:300,
                                        id:'formPagosVencimientosVentaId',

                                        border:false,
                                        layout:'anchor',
                                        defaults:{msgTarget:'under'},
                                        defaultType:'textfield',
                                        items:[
                                            {
                                                xtype:'numberfield',
                                                fieldLabel:'Cantidad días',
                                                name: 'dias'//,
                                                //minValue:5
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
                                                name:'anticipo'
                                            }
                                        ],
                                        buttons:[
                                            {
                                                text:'Agregar Linea',
                                                listeners:{
                                                    'click':onAddVencimientoClick
                                                }
                                            }
                                        ]
                                    }
                                    ,{
                                        xtype:'form',
                                        //height:300,
                                        title:'',
                                        margin: '0 0 0 200',
                                        id:'formPagosVencimientosCompraId',
                                        border:false,
                                        layout:'anchor',
                                        defaults:{msgTarget:'under'},
                                        defaultType:'textfield',
                                        items:[
                                            {
                                                xtype:'numberfield',
                                                fieldLabel:'Cantidad días',
                                                name: 'dias'//,
                                                //minValue:5
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
                                                name:'anticipo'
                                            }

                                        ],
                                        buttons:[
                                            {
                                                text:'Agregar Linea',
                                                listeners:{
                                                    'click':onAddVencimientoClick
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                            ,{
                                xtype:'panel',
                                layout:'column',
                                items:[
                                    {
                                        xtype:'grid',
                                        id:'gridDetalleVencimientosVentaId',
                                        title:'Detalle Venc.Venta',
                                        height:250,
                                        width:400,
                                        //selType: 'cellmodel',
                                        frame:false,
                                        store: storeGridVencVentas,
                                        columns:[
                                            {
                                                header: 'Días',
                                                dataIndex:'dias',
                                                //xtype: 'numericfield',
                                                width:60,
                                                align:'right'
                                            },{
                                                header: '% Bruto',
                                                align:'right',
                                                width:60,
                                                dataIndex:'bruto'
                                            },{
                                                header: '% Gastos',
                                                align:'right',
                                                dataIndex:'gastos'

                                            },{
                                                header: '% IVA',
                                                align:'right',
                                                width:60,
                                                dataIndex:'iva'
                                            },{
                                                header: 'Anticipo',
                                                align:'right',
                                                width:60,
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
                                                            storeGridVencVentas.removeAt(rowIndex);
                                                        }
                                                    }
                                                ]
                                            }
                                        ]

                                    }
                                    ,{
                                        xtype:'grid',
                                        margin: '0 0 0 10',
                                        id:'gridDetalleVencimientosCompraId',
                                        title:'Detalle Venc.Compras',
                                        height:250,
                                        width:400,
                                        //selType: 'cellmodel',
                                        frame:false,
                                        store: storeGridVencCompras,
                                        columns:[
                                            {
                                                header: 'Días',
                                                dataIndex:'dias',
                                                //xtype: 'numericfield',
                                                width:60,
                                                align:'right'
                                            },{
                                                header: '% Bruto',
                                                align:'right',
                                                width:60,
                                                dataIndex:'bruto'
                                            },{
                                                header: '% Gastos',
                                                align:'right',
                                                width:60,
                                                dataIndex:'gastos'

                                            },{
                                                header: '% IVA',
                                                align:'right',
                                                width:60,
                                                dataIndex:'iva'
                                            },{
                                                header: 'Anticipo',
                                                align:'right',
                                                width:60,
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
                                                            storeGridVencCompras.removeAt(rowIndex);
                                                        }
                                                    }
                                                ]
                                            }
                                        ]

                                    }
                                ]
                            }
///--------------------------
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
    storeRaza.load();
    loadOrden();
    Ext.getCmp('regimen2daVentaId').hide();
    //storeRaza.load();
    //Ext.getCmp('regimen2daVentaId').hide();


});