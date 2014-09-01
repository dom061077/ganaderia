
<%@ page import="com.rural.ganaderia.Especie" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'especie.label', default: 'Especie')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-especie" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-especie" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list especie">
			
				<g:if test="${especieInstance?.nombre}">
				<li class="fieldcontain">
					<span id="nombre-label" class="property-label"><g:message code="especie.nombre.label" default="Nombre" /></span>
					
						<span class="property-value" aria-labelledby="nombre-label"><g:fieldValue bean="${especieInstance}" field="nombre"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${especieInstance?.categorias}">
				<li class="fieldcontain">
					<span id="categorias-label" class="property-label"><g:message code="especie.categorias.label" default="Categorias" /></span>
					
						<g:each in="${especieInstance.categorias}" var="c">
						<span class="property-value" aria-labelledby="categorias-label"><g:link controller="categoria" action="show" id="${c.id}">${c?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${especieInstance?.porcentajeIVA}">
				<li class="fieldcontain">
					<span id="porcentajeIVA-label" class="property-label"><g:message code="especie.porcentajeIVA.label" default="Porcentaje IVA" /></span>
					
						<span class="property-value" aria-labelledby="porcentajeIVA-label"><g:fieldValue bean="${especieInstance}" field="porcentajeIVA"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${especieInstance?.regimen2daVenta}">
				<li class="fieldcontain">
					<span id="regimen2daVenta-label" class="property-label"><g:message code="especie.regimen2daVenta.label" default="Regimen2da Venta" /></span>
					
						<span class="property-value" aria-labelledby="regimen2daVenta-label"><g:formatBoolean boolean="${especieInstance?.regimen2daVenta}" /></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${especieInstance?.id}" />
					<g:link class="edit" action="edit" id="${especieInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
