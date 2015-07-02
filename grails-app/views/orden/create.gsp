<%@ page import="com.rural.ganaderia.Orden" %>
<!doctype html>

<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'orden.label', default: 'Orden')}" />
		<title><g:message code="default.create.label" args="[entityName]" /></title>
        <script type="text/javascript" src="${resource(dir:'orden',file:'app.js')}"></script>
        <script type="text/javascript">
            var especiesUrl = '<%out << createLink(controller:'especie',action:'listjson')%>';
            var razaUrl = '<%out << createLink(controller:'raza',action:'listjson')%>';
            var provinciaUrl = '<%out << createLink(controller:'provincia',action:'listjson')%>';
            var partidoUrl = '<%out << createLink(controller:'partido',action:'listjson')%>';
            var localidadUrl = '<%out << createLink(controller:'localidad',action:'listjson')%>';
            var exposicionUrl = '${createLink(controller:'exposicion',action:'listjson')}';
            var anioExposicionUrl = '${createLink(controller:'anioExposicion',action:'listjson')}';
            var saveOrdenUrl = '${createLink(controller:'orden',action:'savejson')}';
            var situacionIVAUrl = '${createLink(controller:'orden',action:'situacionIVAjson')}';
            var getDatosClientesUrl = '${createLink(controller:'cliente',action:'getdatosjson')}';
            var getDatosClientesByIdUrl = '${createLink(controller:'cliente',action:'getdatosjsonbyid')}';
            var deleteImg = '<% out << resource(dir:'images',file:'delete.gif') %>';
            var selectImg = '<% out << resource(dir:'images',file:'select.jpg')%>';
            var condicionOperacionUrl = '<% out << createLink(controller:'orden',action:'condicionOperacionjson')%>';
            var operacionUrl = '<% out << createLink(controller: 'orden',action:'operacionjson')%>';
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
        </script>

	</head>
	<body>
           <div id="formpanelId"></div>
	</body>
</html>
