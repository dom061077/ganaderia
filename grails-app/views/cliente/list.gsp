
<%@ page import="com.rural.ganaderia.Cliente" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'cliente.label', default: 'Cliente')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
        <script type="text/javascript" src="${resource(dir:'cliente',file:'app.js')}"></script>
        <script type="text/javascript">
              var listjson='<%out << createLink(controller:'cliente',action:'listjsongrid')%>';
        </script>

	</head>
	<body>
        <div id="formpanelId"/>
	</body>
</html>
