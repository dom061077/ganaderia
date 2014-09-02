
<%@ page import="com.rural.ganaderia.FormasdePago" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'formasdePago.label', default: 'FormasdePago')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-formasdePago" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-formasdePago" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="descripcion" title="${message(code: 'formasdePago.descripcion.label', default: 'Descripcion')}" />
					
						<g:sortableColumn property="porcentajeDescuento" title="${message(code: 'formasdePago.porcentajeDescuento.label', default: 'Porcentaje Descuento')}" />
					
						<g:sortableColumn property="tieneVencimientos" title="${message(code: 'formasdePago.tieneVencimientos.label', default: 'Tiene Vencimientos')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${formasdePagoInstanceList}" status="i" var="formasdePagoInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${formasdePagoInstance.id}">${fieldValue(bean: formasdePagoInstance, field: "descripcion")}</g:link></td>
					
						<td>${fieldValue(bean: formasdePagoInstance, field: "porcentajeDescuento")}</td>
					
						<td><g:formatBoolean boolean="${formasdePagoInstance.tieneVencimientos}" /></td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${formasdePagoInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
