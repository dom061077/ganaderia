package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(RazaController)
@Mock(Raza)
class RazaControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/raza/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.razaInstanceList.size() == 0
        assert model.razaInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.razaInstance != null
    }

    void testSave() {
        controller.save()

        assert model.razaInstance != null
        assert view == '/raza/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/raza/show/1'
        assert controller.flash.message != null
        assert Raza.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/raza/list'

        populateValidParams(params)
        def raza = new Raza(params)

        assert raza.save() != null

        params.id = raza.id

        def model = controller.show()

        assert model.razaInstance == raza
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/raza/list'

        populateValidParams(params)
        def raza = new Raza(params)

        assert raza.save() != null

        params.id = raza.id

        def model = controller.edit()

        assert model.razaInstance == raza
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/raza/list'

        response.reset()

        populateValidParams(params)
        def raza = new Raza(params)

        assert raza.save() != null

        // test invalid parameters in update
        params.id = raza.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/raza/edit"
        assert model.razaInstance != null

        raza.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/raza/show/$raza.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        raza.clearErrors()

        populateValidParams(params)
        params.id = raza.id
        params.version = -1
        controller.update()

        assert view == "/raza/edit"
        assert model.razaInstance != null
        assert model.razaInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/raza/list'

        response.reset()

        populateValidParams(params)
        def raza = new Raza(params)

        assert raza.save() != null
        assert Raza.count() == 1

        params.id = raza.id

        controller.delete()

        assert Raza.count() == 0
        assert Raza.get(raza.id) == null
        assert response.redirectedUrl == '/raza/list'
    }
}
