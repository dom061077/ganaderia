
<%@ page import="com.rural.ganaderia.comp.Comprobante" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'comprobante.label', default: 'Comprobante')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-comprobante" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-comprobante" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<th><g:message code="comprobante.anioExposicion.label" default="Anio Exposicion" /></th>
					
						<th><g:message code="comprobante.clienteDestino.label" default="Cliente Destino" /></th>
					
						<th><g:message code="comprobante.clienteOrigen.label" default="Cliente Origen" /></th>
					
						<th><g:message code="comprobante.comprobanteDestino.label" default="Comprobante Destino" /></th>
					
						<g:sortableColumn property="cuit" title="${message(code: 'comprobante.cuit.label', default: 'Cuit')}" />
					
						<th><g:message code="comprobante.destino.label" default="Destino" /></th>
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${comprobanteInstanceList}" status="i" var="comprobanteInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${comprobanteInstance.id}">${fieldValue(bean: comprobanteInstance, field: "anioExposicion")}</g:link></td>
					
						<td>${fieldValue(bean: comprobanteInstance, field: "clienteDestino")}</td>
					
						<td>${fieldValue(bean: comprobanteInstance, field: "clienteOrigen")}</td>
					
						<td>${fieldValue(bean: comprobanteInstance, field: "comprobanteDestino")}</td>
					
						<td>${fieldValue(bean: comprobanteInstance, field: "cuit")}</td>
					
						<td>${fieldValue(bean: comprobanteInstance, field: "destino")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${comprobanteInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
