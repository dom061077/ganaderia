
<%@ page import="com.rural.ganaderia.Orden" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'orden.label', default: 'Orden')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
        <script type="text/javascript">
            var listordenUrl = '<% out << createLink(controller:'orden',action:'listcomprajson')%>';
        </script>
        <script type="text/javascript" src="${resource(dir:'js/orden',file:'list.js')}"></script>
	</head>
	<body>
        <div id="gridordencompraId"> </div>
	</body>
</html>
