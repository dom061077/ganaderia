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
            var deleteImg = '<% out << resource(dir:'images',file:'delete.gif') %>';
        </script>

	</head>
	<body>
           <div id="formpanelId"></div>
	</body>
</html>
