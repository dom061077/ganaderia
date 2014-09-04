
<%@ page import="com.rural.ganaderia.RegimenGanancia" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'regimenGanancia.label', default: 'RegimenGanancia')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-regimenGanancia" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-regimenGanancia" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list regimenGanancia">
			
				<g:if test="${regimenGananciaInstance?.descripcion}">
				<li class="fieldcontain">
					<span id="descripcion-label" class="property-label"><g:message code="regimenGanancia.descripcion.label" default="Descripcion" /></span>
					
						<span class="property-value" aria-labelledby="descripcion-label"><g:fieldValue bean="${regimenGananciaInstance}" field="descripcion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${regimenGananciaInstance?.montoImponible}">
				<li class="fieldcontain">
					<span id="montoImponible-label" class="property-label"><g:message code="regimenGanancia.montoImponible.label" default="Monto Imponible" /></span>
					
						<span class="property-value" aria-labelledby="montoImponible-label"><g:fieldValue bean="${regimenGananciaInstance}" field="montoImponible"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${regimenGananciaInstance?.porcentajeRI}">
				<li class="fieldcontain">
					<span id="porcentajeRI-label" class="property-label"><g:message code="regimenGanancia.porcentajeRI.label" default="Porcentaje RI" /></span>
					
						<span class="property-value" aria-labelledby="porcentajeRI-label"><g:fieldValue bean="${regimenGananciaInstance}" field="porcentajeRI"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${regimenGananciaInstance?.porcentajeRNI}">
				<li class="fieldcontain">
					<span id="porcentajeRNI-label" class="property-label"><g:message code="regimenGanancia.porcentajeRNI.label" default="Porcentaje RNI" /></span>
					
						<span class="property-value" aria-labelledby="porcentajeRNI-label"><g:fieldValue bean="${regimenGananciaInstance}" field="porcentajeRNI"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${regimenGananciaInstance?.id}" />
					<g:link class="edit" action="edit" id="${regimenGananciaInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
