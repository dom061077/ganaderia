package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(OrdenController)
@Mock(Orden)
class OrdenControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/orden/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.ordenInstanceList.size() == 0
        assert model.ordenInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.ordenInstance != null
    }

    void testSave() {
        controller.save()

        assert model.ordenInstance != null
        assert view == '/orden/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/orden/show/1'
        assert controller.flash.message != null
        assert Orden.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/orden/list'

        populateValidParams(params)
        def orden = new Orden(params)

        assert orden.save() != null

        params.id = orden.id

        def model = controller.show()

        assert model.ordenInstance == orden
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/orden/list'

        populateValidParams(params)
        def orden = new Orden(params)

        assert orden.save() != null

        params.id = orden.id

        def model = controller.edit()

        assert model.ordenInstance == orden
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/orden/list'

        response.reset()

        populateValidParams(params)
        def orden = new Orden(params)

        assert orden.save() != null

        // test invalid parameters in update
        params.id = orden.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/orden/edit"
        assert model.ordenInstance != null

        orden.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/orden/show/$orden.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        orden.clearErrors()

        populateValidParams(params)
        params.id = orden.id
        params.version = -1
        controller.update()

        assert view == "/orden/edit"
        assert model.ordenInstance != null
        assert model.ordenInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/orden/list'

        response.reset()

        populateValidParams(params)
        def orden = new Orden(params)

        assert orden.save() != null
        assert Orden.count() == 1

        params.id = orden.id

        controller.delete()

        assert Orden.count() == 0
        assert Orden.get(orden.id) == null
        assert response.redirectedUrl == '/orden/list'
    }
}
