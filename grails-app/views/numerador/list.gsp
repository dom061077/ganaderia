
<%@ page import="com.rural.ganaderia.Numerador" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'numerador.label', default: 'Numerador')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-numerador" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-numerador" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="maximoNumero" title="${message(code: 'numerador.maximoNumero.label', default: 'Maximo Numero')}" />
					
						<g:sortableColumn property="tipoNumerador" title="${message(code: 'numerador.tipoNumerador.label', default: 'Tipo Numerador')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${numeradorInstanceList}" status="i" var="numeradorInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${numeradorInstance.id}">${fieldValue(bean: numeradorInstance, field: "maximoNumero")}</g:link></td>
					
						<td>${fieldValue(bean: numeradorInstance, field: "tipoNumerador")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${numeradorInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
