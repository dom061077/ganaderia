Ext.define('Ganaderia.model.OrdenModelo', {
    extend: 'Ext.data.Model',
    idProperty:'Id',
    fields: [
        { name: 'Id', type: 'int'},
        { name: 'firstName', type: 'string' },
        { name: 'middleName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'birthDate', type: 'date' },
        { name: 'address1', type: 'string' },
        { name: 'address2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' }
    ],
    validations: [{
        type: 'presence',
        field: 'firstName'
    }]
});