
<%@ page import="com.rural.ganaderia.localizacion.Localidad" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'localidad.label', default: 'Localidad')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-localidad" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-localidad" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list localidad">
			
				<g:if test="${localidadInstance?.codigoPostal}">
				<li class="fieldcontain">
					<span id="codigoPostal-label" class="property-label"><g:message code="localidad.codigoPostal.label" default="Codigo Postal" /></span>
					
						<span class="property-value" aria-labelledby="codigoPostal-label"><g:fieldValue bean="${localidadInstance}" field="codigoPostal"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${localidadInstance?.nombre}">
				<li class="fieldcontain">
					<span id="nombre-label" class="property-label"><g:message code="localidad.nombre.label" default="Nombre" /></span>
					
						<span class="property-value" aria-labelledby="nombre-label"><g:fieldValue bean="${localidadInstance}" field="nombre"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${localidadInstance?.partido}">
				<li class="fieldcontain">
					<span id="partido-label" class="property-label"><g:message code="localidad.partido.label" default="Partido" /></span>
					
						<span class="property-value" aria-labelledby="partido-label"><g:link controller="partido" action="show" id="${localidadInstance?.partido?.id}">${localidadInstance?.partido?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${localidadInstance?.ubicacion}">
				<li class="fieldcontain">
					<span id="ubicacion-label" class="property-label"><g:message code="localidad.ubicacion.label" default="Ubicacion" /></span>
					
						<span class="property-value" aria-labelledby="ubicacion-label"><g:fieldValue bean="${localidadInstance}" field="ubicacion"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:localidadInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${localidadInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
