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
        items : [{
            name  : 'cuit',
            fieldLabel: 'C.U.I.T'
        },{
            name: 'razonSocial',
            fieldLabel: 'Razón Social'
        },{
            name: 'direccion',
            fieldLabel: 'Dirección'
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
            xtype:'combo',
            name: 'situacionIVA',
            fieldLabel: 'Codición I.V.A'
        },{
            xtype:'combo',
            name: 'Provincia',
            fieldLabel: 'provincia'
        },{
            xtype:'combo',
            name: 'partido',
            fieldLabel: 'Partido'
        },{
            name: 'localidad',
            fieldLabel: 'Localidad'


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