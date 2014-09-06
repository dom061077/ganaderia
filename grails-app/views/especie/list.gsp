
<%@ page import="com.rural.ganaderia.Especie" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'especie.label', default: 'Especie')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-especie" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-especie" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="nombre" title="${message(code: 'especie.nombre.label', default: 'Nombre')}" />
					
						<g:sortableColumn property="evaluaIvaen2daVenta" title="${message(code: 'especie.evaluaIvaen2daVenta.label', default: 'Evalua Ivaen2da Venta')}" />
					
						<g:sortableColumn property="porcentajeIVA" title="${message(code: 'especie.porcentajeIVA.label', default: 'Porcentaje IVA')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${especieInstanceList}" status="i" var="especieInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${especieInstance.id}">${fieldValue(bean: especieInstance, field: "nombre")}</g:link></td>
					
						<td><g:formatBoolean boolean="${especieInstance.evaluaIvaen2daVenta}" /></td>
					
						<td>${fieldValue(bean: especieInstance, field: "porcentajeIVA")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${especieInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
