
<%@ page import="com.rural.ganaderia.comp.Comprobante" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'comprobante.label', default: 'Comprobante')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
        <meta name="layout" content="main">
        <g:set var="entityName" value="${message(code: 'comp.label', default: 'comp')}" />
        <title><g:message code="default.create.label" args="[entityName]" /></title>
        <script type="text/javascript" src="${resource(dir:'complist',file:'app.js')}"></script>
        <script type="text/javascript">
            var listjson='<% out << createLink(controller:'comprobante',action:'listjson') %>';
        </script>
	</head>
	<body>
        <div id="formpanelId"></div>
	</body>
</html>
