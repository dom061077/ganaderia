
<%@ page import="com.rural.ganaderia.Numerador" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'numerador.label', default: 'Numerador')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-numerador" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-numerador" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list numerador">
			
				<g:if test="${numeradorInstance?.maximoNumero}">
				<li class="fieldcontain">
					<span id="maximoNumero-label" class="property-label"><g:message code="numerador.maximoNumero.label" default="Maximo Numero" /></span>
					
						<span class="property-value" aria-labelledby="maximoNumero-label"><g:fieldValue bean="${numeradorInstance}" field="maximoNumero"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${numeradorInstance?.tipoOrden}">
				<li class="fieldcontain">
					<span id="tipoNumerador-label" class="property-label"><g:message code="numerador.tipoOrden.label" default="Tipo Comprobante" /></span>
					
						<span class="property-value" aria-labelledby="tipoOrden-label"><g:fieldValue bean="${numeradorInstance}" field="tipoOrden"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${numeradorInstance?.id}" />
					<g:link class="edit" action="edit" id="${numeradorInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
