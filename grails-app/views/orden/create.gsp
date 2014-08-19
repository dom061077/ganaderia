<%@ page import="com.rural.ganaderia.Orden" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'orden.label', default: 'Orden')}" />
		<title><g:message code="default.create.label" args="[entityName]" /></title>
        <script type="text/javascript" src="${resource(dir:'js/orden',file:'create.js')}"></script>
        <script type="text/javascript">
            var especiesUrl = '<%out << createLink(controller:'especie',action:'listjson')%>';
            var razaUrl = '<%out << createLink(controller:'raza',action:'listjson')%>';
            var provinciaUrl = '<%out << createLink(controller:'provincia',action:'listjson')%>';
            var localidadUrl = '<%out << createLink(controller:'localidad',action:'listjson')%>';
            var exposicionUrl = '${createLink(controller:'exposicion',action:'listjson')}';
            var anioExposicionUrl = '${createLink(controller:'anioExposicion',action:'listjson')}';
            var saveOrdenUrl = '${createLink(controller:'orden',action:'savejson')}';
            var situacionIVAUrl = '${createLink(controller:'orden',action:'situacionIVAjson')}';
            var getDatosClientesUrl = '${createLink(controller:'cliente',action:'getdatosjson')}';
            var deleteImg = '<% out << resource(dir:'images',file:'delete.gif') %>';
            var condicionOperacionUrl = '<% out << createLink(controller:'orden',action:'condicionOperacionjson')%>';
            var operacionUrl = '<% out << createLink(controller: 'orden',action:'operacionjson')%>';
        </script>

	</head>
	<body>
           <div id="formpanelId"></div>
	</body>
</html>
