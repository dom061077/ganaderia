<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main">
    <g:set var="entityName" value="${message(code: 'comp.label', default: 'comp')}" />
    <title><g:message code="default.create.label" args="[entityName]" /></title>
    <script type="text/javascript" src="${resource(dir:'comp',file:'app.js')}"></script>
    <script type="text/javascript">
        var especiesUrl = '<%out << createLink(controller:'especie',action:'listjson')%>';
        var razaUrl = '<%out << createLink(controller:'raza',action:'listjson')%>';
        var provinciaUrl = '<%out << createLink(controller:'provincia',action:'listjson')%>';
        var partidoUrl = '<%out << createLink(controller:'partido',action:'listjson')%>';
        var localidadUrl = '<%out << createLink(controller:'localidad',action:'listjson')%>';
        var exposicionUrl = '${createLink(controller:'exposicion',action:'listjson')}';
        var anioExposicionUrl = '${createLink(controller:'anioExposicion',action:'listjson')}';
        var savecompUrl = '${createLink(controller:'comprobante',action:'savejson')}';
       // var situacionIVAUrl = '${createLink(controller:'comp',action:'situacionIVAjson')}';
        var getDatosClientesUrl = '${createLink(controller:'cliente',action:'getdatosjson')}';
        var getDatosClientesByIdUrl = '${createLink(controller:'cliente',action:'getdatosjsonbyid')}';
        var deleteImg = '<% out << resource(dir:'images',file:'delete.gif') %>';
        var selectImg = '<% out << resource(dir:'images',file:'select.jpg')%>';
        var condicionOperacionUrl = '<% out << createLink(controller:'comp',action:'condicionOperacionjson')%>';
        var operacionUrl = '<% out << createLink(controller: 'comp',action:'operacionjson')%>';
        var altaClienteDetalleUrl = '<% out << createLink(controller:'cliente',action:'savejson')%>';
        var editClienteDetalleUrl = '<% out << createLink(controller:'cliente',action:'updatejson')%>';
        var clienteListUrl = '<% out << createLink(controller:'cliente',action:'listjson')%>';
        var destinoUrl = '<% out << createLink(controller:'destino',action:'listjson')%>';
        var categoriasUrl = '<% out << createLink(controller:'categoria',action:'listjson')%>';
        var gastosUrl = '<% out << createLink(controller:'gasto',action:'listjson')%>';
        var formasdePagoUrl = '<% out << createLink(controller:'formasdePago',action:'listjson')%>';
        var comprobanteUrl = '<% out << createLink(controller:'orden',action:'imprimircomprobante')%>';
        var clientegridUrl = '<% out << createLink(controller:'cliente',action:'listjsongrid')%>';
        var clientestoreUrl = '<% out << createLink(controller:'cliente',action:'')%>';
        var operacionUrl = '<% out << createLink(controller:'operacion',action:'listjson')%>';
        <%
            if(idComprobante)
               out << 'var comprobanteId = ' + idComprobante+';'
            else
               out << 'var comprobanteId = 0;';
        %>
        if(comprobanteId!=0)
            var getCompUrl = '<% out << createLink(controller:'comprobante',action:'getjson')%>/'+comprobanteId;
    </script>

</head>
<body>
<div id="formpanelId"></div>
</body>
</html>
