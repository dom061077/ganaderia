
<%@ page import="com.rural.ganaderia.FormasdePago" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'formasdePago.label', default: 'FormasdePago')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-formasdePago" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-formasdePago" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list formasdePago">
			
				<g:if test="${formasdePagoInstance?.descripcion}">
				<li class="fieldcontain">
					<span id="descripcion-label" class="property-label"><g:message code="formasdePago.descripcion.label" default="Descripcion" /></span>
					
						<span class="property-value" aria-labelledby="descripcion-label"><g:fieldValue bean="${formasdePagoInstance}" field="descripcion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${formasdePagoInstance?.porcentajeDescuento}">
				<li class="fieldcontain">
					<span id="porcentajeDescuento-label" class="property-label"><g:message code="formasdePago.porcentajeDescuento.label" default="Porcentaje Descuento" /></span>
					
						<span class="property-value" aria-labelledby="porcentajeDescuento-label"><g:fieldValue bean="${formasdePagoInstance}" field="porcentajeDescuento"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${formasdePagoInstance?.tieneVencimientos}">
				<li class="fieldcontain">
					<span id="tieneVencimientos-label" class="property-label"><g:message code="formasdePago.tieneVencimientos.label" default="Tiene Vencimientos" /></span>
					
						<span class="property-value" aria-labelledby="tieneVencimientos-label"><g:formatBoolean boolean="${formasdePagoInstance?.tieneVencimientos}" /></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${formasdePagoInstance?.id}" />
					<g:link class="edit" action="edit" id="${formasdePagoInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
