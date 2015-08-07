Ext.define('Ganaderia.controller.ClienteControlador',{
    extend:'Ext.app.Controller',
    views:['Ganaderia.view.ClientesList','Ganaderia.view.ClienteFormVista'],
    refs:[
        {
            ref:'formWindow',
            xtype: 'clienteformvista',
            selector: 'clienteformvista',
            autoCreate: true
        }
    ],
    init: function () {
        this.control({
            'clienteslist > toolbar > button[action=add]': {
                click: this.showAddForm
            },
            'clienteslist': {
                itemdblclick: this.onRowdblclick
            },
            'formWindow button[action=add]': {
                click: this.doAddBook
            }
        });
    },
    onRowdblclick: function(me, record, item, index) {
        var win = this.getFormWindow();
        win.setTitle('Editar Cliente');
        win.setAction('edit');
        win.setRecordIndex(index);
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
        cliente.save();
        win.close();
    }

});