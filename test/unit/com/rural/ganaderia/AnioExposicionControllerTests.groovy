package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(AnioExposicionController)
@Mock(AnioExposicion)
class AnioExposicionControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/anioExposicion/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.anioExposicionInstanceList.size() == 0
        assert model.anioExposicionInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.anioExposicionInstance != null
    }

    void testSave() {
        controller.save()

        assert model.anioExposicionInstance != null
        assert view == '/anioExposicion/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/anioExposicion/show/1'
        assert controller.flash.message != null
        assert AnioExposicion.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/anioExposicion/list'

        populateValidParams(params)
        def anioExposicion = new AnioExposicion(params)

        assert anioExposicion.save() != null

        params.id = anioExposicion.id

        def model = controller.show()

        assert model.anioExposicionInstance == anioExposicion
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/anioExposicion/list'

        populateValidParams(params)
        def anioExposicion = new AnioExposicion(params)

        assert anioExposicion.save() != null

        params.id = anioExposicion.id

        def model = controller.edit()

        assert model.anioExposicionInstance == anioExposicion
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/anioExposicion/list'

        response.reset()

        populateValidParams(params)
        def anioExposicion = new AnioExposicion(params)

        assert anioExposicion.save() != null

        // test invalid parameters in update
        params.id = anioExposicion.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/anioExposicion/edit"
        assert model.anioExposicionInstance != null

        anioExposicion.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/anioExposicion/show/$anioExposicion.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        anioExposicion.clearErrors()

        populateValidParams(params)
        params.id = anioExposicion.id
        params.version = -1
        controller.update()

        assert view == "/anioExposicion/edit"
        assert model.anioExposicionInstance != null
        assert model.anioExposicionInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/anioExposicion/list'

        response.reset()

        populateValidParams(params)
        def anioExposicion = new AnioExposicion(params)

        assert anioExposicion.save() != null
        assert AnioExposicion.count() == 1

        params.id = anioExposicion.id

        controller.delete()

        assert AnioExposicion.count() == 0
        assert AnioExposicion.get(anioExposicion.id) == null
        assert response.redirectedUrl == '/anioExposicion/list'
    }
}
