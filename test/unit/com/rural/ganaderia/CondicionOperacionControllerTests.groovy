package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(CondicionOperacionController)
@Mock(CondicionOperacion)
class CondicionOperacionControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/condicionOperacion/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.condicionOperacionInstanceList.size() == 0
        assert model.condicionOperacionInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.condicionOperacionInstance != null
    }

    void testSave() {
        controller.save()

        assert model.condicionOperacionInstance != null
        assert view == '/condicionOperacion/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/condicionOperacion/show/1'
        assert controller.flash.message != null
        assert CondicionOperacion.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/condicionOperacion/list'

        populateValidParams(params)
        def condicionOperacion = new CondicionOperacion(params)

        assert condicionOperacion.save() != null

        params.id = condicionOperacion.id

        def model = controller.show()

        assert model.condicionOperacionInstance == condicionOperacion
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/condicionOperacion/list'

        populateValidParams(params)
        def condicionOperacion = new CondicionOperacion(params)

        assert condicionOperacion.save() != null

        params.id = condicionOperacion.id

        def model = controller.edit()

        assert model.condicionOperacionInstance == condicionOperacion
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/condicionOperacion/list'

        response.reset()

        populateValidParams(params)
        def condicionOperacion = new CondicionOperacion(params)

        assert condicionOperacion.save() != null

        // test invalid parameters in update
        params.id = condicionOperacion.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/condicionOperacion/edit"
        assert model.condicionOperacionInstance != null

        condicionOperacion.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/condicionOperacion/show/$condicionOperacion.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        condicionOperacion.clearErrors()

        populateValidParams(params)
        params.id = condicionOperacion.id
        params.version = -1
        controller.update()

        assert view == "/condicionOperacion/edit"
        assert model.condicionOperacionInstance != null
        assert model.condicionOperacionInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/condicionOperacion/list'

        response.reset()

        populateValidParams(params)
        def condicionOperacion = new CondicionOperacion(params)

        assert condicionOperacion.save() != null
        assert CondicionOperacion.count() == 1

        params.id = condicionOperacion.id

        controller.delete()

        assert CondicionOperacion.count() == 0
        assert CondicionOperacion.get(condicionOperacion.id) == null
        assert response.redirectedUrl == '/condicionOperacion/list'
    }
}
