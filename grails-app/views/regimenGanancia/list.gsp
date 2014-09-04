
<%@ page import="com.rural.ganaderia.RegimenGanancia" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'regimenGanancia.label', default: 'RegimenGanancia')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-regimenGanancia" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-regimenGanancia" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
				<thead>
					<tr>
					
						<g:sortableColumn property="descripcion" title="${message(code: 'regimenGanancia.descripcion.label', default: 'Descripcion')}" />
					
						<g:sortableColumn property="montoImponible" title="${message(code: 'regimenGanancia.montoImponible.label', default: 'Monto Imponible')}" />
					
						<g:sortableColumn property="porcentajeRI" title="${message(code: 'regimenGanancia.porcentajeRI.label', default: 'Porcentaje RI')}" />
					
						<g:sortableColumn property="porcentajeRNI" title="${message(code: 'regimenGanancia.porcentajeRNI.label', default: 'Porcentaje RNI')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${regimenGananciaInstanceList}" status="i" var="regimenGananciaInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${regimenGananciaInstance.id}">${fieldValue(bean: regimenGananciaInstance, field: "descripcion")}</g:link></td>
					
						<td>${fieldValue(bean: regimenGananciaInstance, field: "montoImponible")}</td>
					
						<td>${fieldValue(bean: regimenGananciaInstance, field: "porcentajeRI")}</td>
					
						<td>${fieldValue(bean: regimenGananciaInstance, field: "porcentajeRNI")}</td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${regimenGananciaInstanceTotal}" />
			</div>
		</div>
	</body>
</html>
