Ext.define('Ganaderia.controller.ClienteControlador',{
    extend:'Ext.app.Controller',
    views:['Ganaderia.view.ClientesList','Ganaderia.view.ClienteFormVista'],
    refs:[
        {
            ref:'formWindow',
            xtype: 'clienteformvista',
            selector: 'clienteformvista',
            autoCreate: true
        },
        {ref :'cmbProvinciaProc',selector: 'clienteformvista combo[itemId=cmbProvinciaProc]'},
        {ref :'cmbPartidoProc',selector: 'clienteformvista combo[itemId=cmbPartidoProc]'},
        {ref :'cmbLocalidadProc',selector: 'clienteformvista combo[itemId=cmbLocalidadProc]'},

    ],
    init: function () {
        this.control({
            'clienteslist > toolbar > button[action=add]': {
                click: this.showAddForm
            },
            'clienteslist': {
                itemdblclick: this.onRowdblclick
            },
            'clienteformvista button[action=add]': {
                click: this.doAddBook
            },
            'clienteformvista combo[itemId=cmbProvinciaProc]':{
                select: this.onSelectProvCmb
            },
            'clienteformvista combo[itemId=cmbPartidoProc]':{
                select: this.onSelectPartCmb
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
        this.getCmbLocalidadProc().clearValue();
        //Ext.getCmp('localidadEditClient
        // eId').clearValue();
    },
    onRowdblclick: function(me, record, item, index) {
        var win = this.getFormWindow();
        win.setTitle('Editar Cliente');
        win.setAction('edit');
        win.setRecordIndex(index);
        var provinciaStore = Ext.StoreManager.lookup('Ganaderia.store.ProvinciaStore');
        var partidoStore = Ext.StoreManager.lookup('Ganaderia.store.PartidoStore');
        partidoStore.proxy.extraParams={provinciaId:record.data.provincia};
        var localidadStore = Ext.StoreManager.lookup('Ganaderia.store.LocalidadStore');
        localidadStore.proxy.extraParams={partidoId:record.data.partido};
        provinciaStore.load();
        partidoStore.load();
        localidadStore.load();
        win.down('form').getForm().setValues(record.getData());
        win.show();
    },
    showAddForm: function () {
        var win = this.getFormWindow();
        win.setTitle('Alta del Cliente');
        win.setAction('add');
        win.down('form').getForm().reset();
        win.show();
    },
    doAddBook: function () {
        var mask = new Ext.LoadMask(this.getFormWindow(),{msg:'Guardando...'});
        mask.show();
        var win = this.getFormWindow();
        var store = Ext.StoreManager.lookup('Ganaderia.store.ClientesStore');
        var values = win.down('form').getValues();

        var action = win.getAction();
        var cliente = Ext.create('Ganaderia.model.ClienteModelo', values);
        /*if(action == 'edit') {
            store.removeAt(win.getRecordIndex());
            store.insert(win.getRecordIndex(), book);
        }
        else {
            store.add(book);
        } */
        cliente.save({
            success :  function(record, operation){
                mask.hide();
                win.close();
            },
            failure: function(record, operation){
                mask.hide();
                var mensaje = '';
                operation.request.scope.reader.jsonData.errors.forEach(function(msg){
                    mensaje+='- '+msg.msg+'<br>';
                });
                Ext.Msg.show({
                    title:operation.request.scope.reader.jsonData.msgError,
                    msg:mensaje,
                    icon:Ext.MessageBox.ERROR,
                    buttons:Ext.MessageBox.OK

                });
            }
        });

    }

});