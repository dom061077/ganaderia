Ext.define('Ganaderia.controller.OrdenControlador',
    {
        extend : 'Ext.app.Controller',
        //models : ['Ganaderia.model.OrdenModelo'],
        views : ['Ganaderia.view.OrdenVista','Ganaderia.view.DetalleGridVista','Ganaderia.view.VencimientosGridVista'],
        refs: [
            {ref :'cmbProvinciaProc',selector: 'panel > OrdenVista combo[itemId=cmbProvinciaProc]'},
            {ref :'cmbPartidoProc',selector: 'panel > OrdenVista combo[itemId=cmbPartidoProc]'},
            {ref :'cmbLocalidadProc',selector: 'panel > OrdenVista combo[itemId=cmbLocalidadProc]'},
            {ref :'gridDetalleOrden',selector: 'DetalleGridVista'},
            {ref :'gridGasto',selector:'GastosGridVista'},
            {ref :'gridVencimientos',selector:'VencimientosGridVista'},
            {ref :'cmbCategoria',selector:'DetalleGridVista combo[itemId=cmbCategoria]'},
            {ref :'cmbEspecie',selector:'OrdenVista combo[itemId=cmbEspecie]'},
            {ref : 'ordenVista', selector:'panel > OrdenVista'}

        ],
        init : function(){
            this.control({
                'panel > OrdenVista combo[itemId=cmbProvinciaProc]':{
                    select :  this.onSelectProvCmb
                },
                'panel > OrdenVista combo[itemId=cmbPartidoProc]':{
                    select :  this.onSelectPartCmb
                },
                'DetalleGridVista button[itemId=btnCreate]':{
                    click : this.onCreateClick
                },
                'OrdenVista combo[itemId=cmbEspecie]':{
                    select: this.onSelectEspecieCmb
                },
                'DetalleGridVista':{
                    beforeedit : this.onBeforeEdit,
                    edit : this.onEdit
                },

                'DetalleGridVista button[itemId=btnDelete]':{
                    click : this.onDeleteClick
                },
                'GastosGridVista button[itemId=btnCreate]':{
                    click: this.onCreateGastoClick
                },
                'GastosGridVista button[itemId=btnDelete]':{
                    click: this.onDeleteGastoClick
                },
                'VencimientosGridVista button[itemId=btnCreate]':{
                    click: this.onCreateVencimientoClick
                },
                'VencimientosGridVista button[itemId=btnDelete]':{
                    click: this.onDeleteVencimientoClick
                },
                'OrdenVista button[itemId=btnGenerar]': {
                    click: this.onConfirm
                }



            });

        },
        onSelectProvCmb:function(combo,records,options){
            var storePartido = this.getCmbPartidoProc().getStore();

            storePartido.proxy.extraParams={provinciaId:records[0].data.id};
            storePartido.load();
            //Ext.getCmp('localidadEditClienteId').clearValue();
            this.getCmbPartidoProc().clearValue();
            this.getCmbLocalidadProc().clearValue();
        },
        onSelectPartCmb:function(combo,records,options){
            var storeLocalidad = this.getCmbLocalidadProc().getStore();
            storeLocalidad.proxy.extraParams={partidoId:records[0].data.id};
            storeLocalidad.load();
            //Ext.getCmp('localidadEditClient
            // eId').clearValue();
        },
        onSelectEspecieCmb: function(combo,records,options){
            this.getGridDetalleOrden().getStore().removeAll();

        },
        onDeleteClick:function(){
            var detalleStore = this.getGridDetalleOrden().getStore();

            //delete selected rows if selModel is checkboxmodel
            var selectedRows = this.getGridDetalleOrden().getSelectionModel().getSelection();

            if (selectedRows.length)
                detalleStore.remove(selectedRows);
            else
                Ext.Msg.show({
                    title:'Error',
                    msg:'Seleccione una fila de la grilla para eliminar',
                    icon:Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    fn:function(){

                    }
                });
        },
        onCreateClick:function(){
            var ordenVista = this.getOrdenVista();
            if (this.getCmbEspecie().getValue()==null){
                Ext.Msg.show({
                    title:'Error',
                    msg:'Seleccione primero una especie antes de cargar los lotes',
                    icon:Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    fn:function(){
                        ordenVista.down('#tabpanelItem').setActiveTab(0);
                        ordenVista.down('#tabpanelItem').down('#cmbEspecie').focus();
                        ordenVista.down('#tabpanelItem').down('#cmbEspecie').isValid();

                    }
                });

                return;
            }

            var detalleOrdenGrid = this.getGridDetalleOrden();
            var detalleOrdenStore = detalleOrdenGrid.getStore();

            var detalleOrdenModelo = Ext.create('Ganaderia.model.DetalleOrdenModelo');

            detalleOrdenModelo.set("categoria", undefined);
            detalleOrdenModelo.set("raza", null);
            detalleOrdenModelo.set("corral", "");
            detalleOrdenModelo.set("cantidad", 0);
            detalleOrdenModelo.set("peso", 0);
            detalleOrdenModelo.set("preciounitario", 0);
            detalleOrdenModelo.set("subtotal",0);


            detalleOrdenStore.add(detalleOrdenModelo);
        },
        onBeforeEdit: function(editor,context,options){
            var especieId =  this.getCmbEspecie().getValue();
            var storeCategoria = Ext.getCmp('cmbCategoria').getStore();
            storeCategoria.proxy.extraParams={especieId:especieId};
            storeCategoria.load();
            var storeRaza = Ext.getCmp('cmbRaza').getStore();
            storeRaza.proxy.extraParams={especieId:especieId};
            storeRaza.load();
            if(Ext.getCmp('cmbCategoria').getValue()==0)
                Ext.getCmp('cmbCategoria').setRawValue('');

        },
        onEdit: function(editor,context,eptions){
            //alert('OnEdit');
            //editor.record.commit();
            if(context.record.data.peso>0)
                context.record.data.subtotal= context.record.data.peso*context.record.data.preciounitario;
            else
                context.record.data.subtotal=context.record.data.cantidad*context.record.data.preciounitario;

            context.record.commit();
        },
        onDeleteGastoClick:function(){
            var detalleStore = this.getGridGasto().getStore();

            //delete selected rows if selModel is checkboxmodel
            var selectedRows = this.getGridGasto().getSelectionModel().getSelection();

            if (selectedRows.length)
                detalleStore.remove(selectedRows);
            else
                Ext.Msg.show({
                    title:'Error',
                    msg:'Seleccione una fila de la grilla para eliminar',
                    icon:Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    fn:function(){

                    }
                });

        },
        onCreateGastoClick:function(){
            var detalleGastoGrid = this.getGridGasto();
            var detalleGastoStore = detalleGastoGrid.getStore();

            var detalleOrdenModelo = Ext.create('Ganaderia.model.GastoOrdenModelo');
            detalleGastoStore.add(detalleOrdenModelo);
        },
        onCreateVencimientoClick:function(){
            var detalleVencimientoGrid = this.getGridVencimientos();
            var detalleVencimientoStore = detalleVencimientoGrid.getStore();

            var detalleVencimientoModelo = Ext.create('Ganaderia.model.VencimientoOrdenModelo');
            detalleVencimientoStore.add(detalleVencimientoModelo);

        },
        onDeleteVencimientoClick:function(){
            var detalleStore = this.getGridDetalleOrden().getStore();

            //delete selected rows if selModel is checkboxmodel
            var selectedRows = this.getGridDetalleOrden().getSelectionModel().getSelection();

            if (selectedRows.length)
                detalleStore.remove(selectedRows);
            else
                Ext.Msg.show({
                    title:'Error',
                    msg:'Seleccione una fila de la grilla para eliminar',
                    icon:Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK,
                    fn:function(){

                    }
                });

        },
       onConfirm:function(){
           var lotesjson,gastosjson,vencimientosjson;
           var lotesStore = this.getGridDetalleOrden().getStore();
           var ordenVista = this.getOrdenVista();
           if(lotesStore.getCount()<=0) {
               Ext.Msg.show({
                   title:'Error',
                   msg:'Debe cargar al menos un lote',
                   icon:Ext.MessageBox.ERROR,
                   buttons:Ext.MessageBox.OK,
                   fn:function(btn){
                      ordenVista.down('#tabpanelItem').setActiveTab(1);
                   }
               });
               return;
           }
            var lotesArray = [];
            lotesStore.data.each(function(row){
                lotesArray.push(row.data);
            });
            var gastosStore = this.getGridGasto().getStore();
           if(gastosStore.getCount()<=0) {
               Ext.Msg.show({
                   title:'Error',
                   msg:'Debe cargar al menos un gasto',
                   icon:Ext.MessageBox.ERROR,
                   buttons:Ext.MessageBox.OK,
                   fn:function(btn){
                       ordenVista.down('#tabpanelItem').setActiveTab(2);
                   }
               });
               return;
           }
            var gastosArray = [];
            gastosStore.data.each(function(row){
                gastosArray.push(row.data);
            });
            var vencimientosStore = this.getGridVencimientos().getStore();
           if(vencimientosStore.getCount()<=0) {

               Ext.Msg.show({
                   title:'Error',
                   msg:'Debe cargar al menos un vencimiento',
                   icon:Ext.MessageBox.ERROR,
                   buttons:Ext.MessageBox.OK,
                   fn:function(btn){
                       ordenVista.down('#tabpanelItem').setActiveTab(3);
                   }
               });
               return;
           }
            var vencimientosArray = [];
            vencimientosStore.data.each(function(row){
                vencimientosArray.push(row.data);
            });



            lotesjson = Ext.encode(lotesArray);
            gastosjson = Ext.encode(gastosArray);
            vencimientosjson = Ext.encode(vencimientosArray);

            var ordenForm = this.getOrdenVista();
            var ordenModelo = Ext.create('Ganaderia.model.OrdenModelo');

            ordenModelo.set(ordenForm.getValues());
            ordenModelo.set('lotesjson',lotesjson);
            ordenModelo.set('gastosjson',gastosjson);
            ordenModelo.set('vencimientosjson',vencimientosjson)
            var mask = new Ext.LoadMask(ordenForm,{msg:'Guardando...'});
            mask.show();
            ordenModelo.save({
                scope: this,
                success: function(record, operation){
                    Ext.Msg.alert('Estado','Registro salvado');
                    mask.hide();
                },
                failure: function(record, operation){
                    mask.hide();
                    Ext.Msg.alert('Estado','Fallo en petición');
                }
            });
        }


});
