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
            var especiesUrl = '<%out << createLink(controller:'raza',action:'')%>';
        </script>

	</head>
	<body>
           <div id="formpanelId"></div>
	</body>
</html>
