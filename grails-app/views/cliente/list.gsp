
<%@ page import="com.rural.ganaderia.Cliente" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'cliente.label', default: 'Cliente')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-cliente" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-cliente" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="cuit" title="${message(code: 'cliente.cuit.label', default: 'Cuit')}" />
					
						<g:sortableColumn property="direccion" title="${message(code: 'cliente.direccion.label', default: 'Direccion')}" />
					
						<g:sortableColumn property="email" title="${message(code: 'cliente.email.label', default: 'Email')}" />
					
						<g:sortableColumn property="telefono1" title="${message(code: 'cliente.telefono1.label', default: 'Telefono1')}" />
					
						<g:sortableColumn property="telefono2" title="${message(code: 'cliente.telefono2.label', default: 'Telefono2')}" />
					
						<g:sortableColumn property="razonSocial" title="${message(code: 'cliente.razonSocial.label', default: 'Razon Social')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${clienteInstanceList}" status="i" var="clienteInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${clienteInstance.id}">${fieldValue(bean: clienteInstance, field: "cuit")}</g:link></td>
					
						<td>${fieldValue(bean: clienteInstance, field: "direccion")}</td>
					
						<td>${fieldValue(bean: clienteInstance, field: "email")}</td>
					
						<td>${fieldValue(bean: clienteInstance, field: "telefono1")}</td>
					
						<td>${fieldValue(bean: clienteInstance, field: "telefono2")}</td>
					
						<td>${fieldValue(bean: clienteInstance, field: "razonSocial")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${clienteInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
