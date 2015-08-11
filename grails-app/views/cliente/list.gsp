
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
              var savejson='<%out << createLink(controller:'cliente',action:'savejson')%>';
              var provinciaUrl = '<%out << createLink(controller:'provincia',action:'listjson')%>';
              var partidoUrl = '<%out << createLink(controller:'partido',action:'listjson')%>';
              var localidadUrl = '<%out << createLink(controller:'localidad',action:'listjson')%>';
              var situacionIVAUrl ='<%out << createLink(controller:'situacionIVA',action:'listjson')%>';

        </script>

	</head>
	<body>
        <div id="formpanelId"/>
	</body>
</html>
