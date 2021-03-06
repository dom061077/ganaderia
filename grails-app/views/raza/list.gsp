
<%@ page import="com.rural.ganaderia.Raza" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'raza.label', default: 'Raza')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-raza" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-raza" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="nombre" title="${message(code: 'raza.nombre.label', default: 'Nombre')}" />

                        <g:sortableColumn property="especie.nombre" title="${message(code: 'raza.especie.label', default: 'Especie')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${razaInstanceList}" status="i" var="razaInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${razaInstance.id}">${fieldValue(bean: razaInstance, field: "nombre")}</g:link></td>
					
						<td>${fieldValue(bean: razaInstance, field: "especie.nombre")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${razaInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
