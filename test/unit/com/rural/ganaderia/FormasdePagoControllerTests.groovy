package com.rural.ganaderia



import org.junit.*
import grails.test.mixin.*

@TestFor(FormasdePagoController)
@Mock(FormasdePago)
class FormasdePagoControllerTests {

    def populateValidParams(params) {
        assert params != null
        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/formasdePago/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.formasdePagoInstanceList.size() == 0
        assert model.formasdePagoInstanceTotal == 0
    }

    void testCreate() {
        def model = controller.create()

        assert model.formasdePagoInstance != null
    }

    void testSave() {
        controller.save()

        assert model.formasdePagoInstance != null
        assert view == '/formasdePago/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/formasdePago/show/1'
        assert controller.flash.message != null
        assert FormasdePago.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/formasdePago/list'

        populateValidParams(params)
        def formasdePago = new FormasdePago(params)

        assert formasdePago.save() != null

        params.id = formasdePago.id

        def model = controller.show()

        assert model.formasdePagoInstance == formasdePago
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/formasdePago/list'

        populateValidParams(params)
        def formasdePago = new FormasdePago(params)

        assert formasdePago.save() != null

        params.id = formasdePago.id

        def model = controller.edit()

        assert model.formasdePagoInstance == formasdePago
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/formasdePago/list'

        response.reset()

        populateValidParams(params)
        def formasdePago = new FormasdePago(params)

        assert formasdePago.save() != null

        // test invalid parameters in update
        params.id = formasdePago.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/formasdePago/edit"
        assert model.formasdePagoInstance != null

        formasdePago.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/formasdePago/show/$formasdePago.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        formasdePago.clearErrors()

        populateValidParams(params)
        params.id = formasdePago.id
        params.version = -1
        controller.update()

        assert view == "/formasdePago/edit"
        assert model.formasdePagoInstance != null
        assert model.formasdePagoInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/formasdePago/list'

        response.reset()

        populateValidParams(params)
        def formasdePago = new FormasdePago(params)

        assert formasdePago.save() != null
        assert FormasdePago.count() == 1

        params.id = formasdePago.id

        controller.delete()

        assert FormasdePago.count() == 0
        assert FormasdePago.get(formasdePago.id) == null
        assert response.redirectedUrl == '/formasdePago/list'
    }
}
