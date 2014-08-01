package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(ExposicionController)
@Mock(Exposicion)
class ExposicionControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/exposicion/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.exposicionInstanceList.size() == 0
        assert model.exposicionInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.exposicionInstance != null
    }

    void testSave() {
        controller.save()

        assert model.exposicionInstance != null
        assert view == '/exposicion/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/exposicion/show/1'
        assert controller.flash.message != null
        assert Exposicion.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/exposicion/list'

        populateValidParams(params)
        def exposicion = new Exposicion(params)

        assert exposicion.save() != null

        params.id = exposicion.id

        def model = controller.show()

        assert model.exposicionInstance == exposicion
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/exposicion/list'

        populateValidParams(params)
        def exposicion = new Exposicion(params)

        assert exposicion.save() != null

        params.id = exposicion.id

        def model = controller.edit()

        assert model.exposicionInstance == exposicion
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/exposicion/list'

        response.reset()

        populateValidParams(params)
        def exposicion = new Exposicion(params)

        assert exposicion.save() != null

        // test invalid parameters in update
        params.id = exposicion.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/exposicion/edit"
        assert model.exposicionInstance != null

        exposicion.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/exposicion/show/$exposicion.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        exposicion.clearErrors()

        populateValidParams(params)
        params.id = exposicion.id
        params.version = -1
        controller.update()

        assert view == "/exposicion/edit"
        assert model.exposicionInstance != null
        assert model.exposicionInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/exposicion/list'

        response.reset()

        populateValidParams(params)
        def exposicion = new Exposicion(params)

        assert exposicion.save() != null
        assert Exposicion.count() == 1

        params.id = exposicion.id

        controller.delete()

        assert Exposicion.count() == 0
        assert Exposicion.get(exposicion.id) == null
        assert response.redirectedUrl == '/exposicion/list'
    }
}
