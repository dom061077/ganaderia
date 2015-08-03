
<%@ page import="com.rural.ganaderia.parametros.GastoEspecieDestinoOper" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'gastoEspecieDestinoOper.label', default: 'GastoEspecieDestinoOper')}" />
        <link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-gastoEspecieDestinoOper" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-gastoEspecieDestinoOper" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>

                        <g:sortableColumn property="situacionIVA" title="${message(code: 'gastoEspecieDestinoOper.situacionIVA.label', default: 'Condición I.V.A')}" />
						<g:sortableColumn property="tipoComprobante" title="${message(code: 'gastoEspecieDestinoOper.tipoComprobante.label', default: 'Tipo Comprobante')}" />
					
						<th><g:message code="gastoEspecieDestinoOper.especie.label" default="Especie" /></th>
                        <th><g:message code="gastoEspecieDestinoOper.destino.label" default="Destino" /></th>
					
						<g:sortableColumn property="alicuota" title="${message(code: 'gastoEspecieDestinoOper.alicuota.label', default: 'Alicuota')}" />
					

					

					
					</tr>
				</thead>
				<tbody>
				<g:each in="${gastoEspecieDestinoOperInstanceList}" status="i" var="gastoEspecieDestinoOperInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
                        <td>${fieldValue(bean: gastoEspecieDestinoOperInstance, field: "situacionIVA.descripcion")}</td>
						<td><g:link action="show" id="${gastoEspecieDestinoOperInstance.id}">${fieldValue(bean: gastoEspecieDestinoOperInstance, field: "tipoComprobante")}</g:link></td>
					
						<td>${fieldValue(bean: gastoEspecieDestinoOperInstance, field: "especie.nombre")}</td>
                        <td>${fieldValue(bean: gastoEspecieDestinoOperInstance, field: "destino.descripcion")}</td>
					
						<td>${fieldValue(bean: gastoEspecieDestinoOperInstance, field: "alicuota")}</td>

					

					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${gastoEspecieDestinoOperInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
