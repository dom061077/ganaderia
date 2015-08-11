Ext.define('Ganaderia.view.ClienteFormVista', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.clienteformvista',
    title   : 'Alta de Cliente',
    width   : 350,
    layout  : 'fit',
    resizable: false,
    closeAction: 'hide',
    modal   : true,
    config  : {
        recordIndex : 0,
        action : 'add'
    },
    items   : [{
        xtype : 'form',
        layout: 'anchor',
        bodyStyle: {
            background: 'none',
            padding: '10px',
            border: '0'
        },
        defaults: {
            xtype : 'textfield',
            anchor: '100%'
        },
        items : [
        {
         /*   name: 'idCliente',
            //type:'hidden',
            fieldLabel: 'id'
        },{*/
            name  : 'cuit',
            fieldLabel: 'C.U.I.T'
        },{
            name: 'razonSocial',
            fieldLabel: 'Razón Social'
        },{
            name: 'direccion',
            fieldLabel: 'Dirección'
        },{
            name: 'telefono1',
            fieldLabel: 'Teléfono 1'
        },{
            name: 'telefono2',
            fieldLabel: 'Teléfono 2'
        },{
            fieldLabel: '¿Tiene ganancias?',
            name: 'gananciasIns',
            xtype: 'checkbox'
        },{
            xtype:'combo',
            name: 'situacionIVA',
            fieldLabel: 'Codición I.V.A',
            allowBlank : false,
            forceSelection : true,
            editable:false,
            width: 400,
            queryMode: 'remote',
            emptyText:'',
            typeAhead :true,
            triggerAction: 'all',
            valueField:'id',
            displayField: 'descripcion',
            selectOnTab:true,
            store:'Ganaderia.store.SituacionIVAStore'

        },{
                xtype:'combo',
                margin:'0 20 5 0',
                itemId:'cmbProvinciaProc',
                fieldLabel:'Provincia',
                name:'provincia',
                allowBlank:false,
                width:400,
                queryMode:'remote',
                emptyText:'',
                typeAhead: true,
                triggerAction:'all',
                valueField:'id',
                displayField:'nombre',
                selectOnTab:true,
                store:'Ganaderia.store.ProvinciaStore'
        },{
                xtype:'combo',
                margin:'0 20 5 0',
                itemId:'cmbPartidoProc',
                fieldLabel:'Partido',
                name:'partido',
                allowBlank:false,
                width:400,
                queryMode:'remote',
                emptyText:'',
                typeAhead: true,
                triggerAction:'all',
                valueField:'id',
                displayField:'nombre',
                selectOnTab:true,
                store:'Ganaderia.store.PartidoStore'
            },{
                xtype:'combo',
                itemId:'cmbLocalidadProc',
                fieldLabel:'Localidad',
                name:'localidad',
                allowBlank:false,
                width:400,
                queryMode:'remote',
                emptyText:'',
                typeAhead: true,
                triggerAction:'all',
                valueField:'id',
                displayField:'nombre',
                selectOnTab:true,
                store:'Ganaderia.store.LocalidadStore'

            }


        ]
    }],
    buttons: [{
        text: 'OK',
        action: 'add'
    },{
        text    : 'Reset',
        handler : function () {
            this.up('window').down('form').getForm().reset();
        }
    },{
        text   : 'Cancel',
        handler: function () {
            this.up('window').close();
        }
    }]
});