
<%@ page import="com.rural.ganaderia.Gasto" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'gasto.label', default: 'Gasto')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-gasto" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-gasto" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="descripcion" title="${message(code: 'gasto.descripcion.label', default: 'Descripcion')}" />
					
						<g:sortableColumn property="restaCompra" title="${message(code: 'gasto.restaCompra.label', default: 'Resta Compra')}" />
					
						<g:sortableColumn property="restaVenta" title="${message(code: 'gasto.restaVenta.label', default: 'Resta Venta')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${gastoInstanceList}" status="i" var="gastoInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${gastoInstance.id}">${fieldValue(bean: gastoInstance, field: "descripcion")}</g:link></td>
					
						<td><g:formatBoolean boolean="${gastoInstance.restaCompra}" /></td>
					
						<td><g:formatBoolean boolean="${gastoInstance.restaVenta}" /></td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${gastoInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
