package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(OperacionController)
@Mock(Operacion)
class OperacionControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/operacion/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.operacionInstanceList.size() == 0
        assert model.operacionInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.operacionInstance != null
    }

    void testSave() {
        controller.save()

        assert model.operacionInstance != null
        assert view == '/operacion/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/operacion/show/1'
        assert controller.flash.message != null
        assert Operacion.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/operacion/list'

        populateValidParams(params)
        def operacion = new Operacion(params)

        assert operacion.save() != null

        params.id = operacion.id

        def model = controller.show()

        assert model.operacionInstance == operacion
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/operacion/list'

        populateValidParams(params)
        def operacion = new Operacion(params)

        assert operacion.save() != null

        params.id = operacion.id

        def model = controller.edit()

        assert model.operacionInstance == operacion
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/operacion/list'

        response.reset()

        populateValidParams(params)
        def operacion = new Operacion(params)

        assert operacion.save() != null

        // test invalid parameters in update
        params.id = operacion.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/operacion/edit"
        assert model.operacionInstance != null

        operacion.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/operacion/show/$operacion.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        operacion.clearErrors()

        populateValidParams(params)
        params.id = operacion.id
        params.version = -1
        controller.update()

        assert view == "/operacion/edit"
        assert model.operacionInstance != null
        assert model.operacionInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/operacion/list'

        response.reset()

        populateValidParams(params)
        def operacion = new Operacion(params)

        assert operacion.save() != null
        assert Operacion.count() == 1

        params.id = operacion.id

        controller.delete()

        assert Operacion.count() == 0
        assert Operacion.get(operacion.id) == null
        assert response.redirectedUrl == '/operacion/list'
    }
}
