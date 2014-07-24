package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(EspecieController)
@Mock(Especie)
class EspecieControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/especie/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.especieInstanceList.size() == 0
        assert model.especieInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.especieInstance != null
    }

    void testSave() {
        controller.save()

        assert model.especieInstance != null
        assert view == '/especie/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/especie/show/1'
        assert controller.flash.message != null
        assert Especie.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/especie/list'

        populateValidParams(params)
        def especie = new Especie(params)

        assert especie.save() != null

        params.id = especie.id

        def model = controller.show()

        assert model.especieInstance == especie
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/especie/list'

        populateValidParams(params)
        def especie = new Especie(params)

        assert especie.save() != null

        params.id = especie.id

        def model = controller.edit()

        assert model.especieInstance == especie
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/especie/list'

        response.reset()

        populateValidParams(params)
        def especie = new Especie(params)

        assert especie.save() != null

        // test invalid parameters in update
        params.id = especie.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/especie/edit"
        assert model.especieInstance != null

        especie.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/especie/show/$especie.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        especie.clearErrors()

        populateValidParams(params)
        params.id = especie.id
        params.version = -1
        controller.update()

        assert view == "/especie/edit"
        assert model.especieInstance != null
        assert model.especieInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/especie/list'

        response.reset()

        populateValidParams(params)
        def especie = new Especie(params)

        assert especie.save() != null
        assert Especie.count() == 1

        params.id = especie.id

        controller.delete()

        assert Especie.count() == 0
        assert Especie.get(especie.id) == null
        assert response.redirectedUrl == '/especie/list'
    }
}
