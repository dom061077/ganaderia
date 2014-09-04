
<%@ page import="com.rural.ganaderia.Cliente" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'cliente.label', default: 'Cliente')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-cliente" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-cliente" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list cliente">
			
				<g:if test="${clienteInstance?.cuit}">
				<li class="fieldcontain">
					<span id="cuit-label" class="property-label"><g:message code="cliente.cuit.label" default="Cuit" /></span>
					
						<span class="property-value" aria-labelledby="cuit-label"><g:fieldValue bean="${clienteInstance}" field="cuit"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.direccion}">
				<li class="fieldcontain">
					<span id="direccion-label" class="property-label"><g:message code="cliente.direccion.label" default="Direccion" /></span>
					
						<span class="property-value" aria-labelledby="direccion-label"><g:fieldValue bean="${clienteInstance}" field="direccion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.email}">
				<li class="fieldcontain">
					<span id="email-label" class="property-label"><g:message code="cliente.email.label" default="Email" /></span>
					
						<span class="property-value" aria-labelledby="email-label"><g:fieldValue bean="${clienteInstance}" field="email"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.telefono1}">
				<li class="fieldcontain">
					<span id="telefono1-label" class="property-label"><g:message code="cliente.telefono1.label" default="Telefono1" /></span>
					
						<span class="property-value" aria-labelledby="telefono1-label"><g:fieldValue bean="${clienteInstance}" field="telefono1"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.telefono2}">
				<li class="fieldcontain">
					<span id="telefono2-label" class="property-label"><g:message code="cliente.telefono2.label" default="Telefono2" /></span>
					
						<span class="property-value" aria-labelledby="telefono2-label"><g:fieldValue bean="${clienteInstance}" field="telefono2"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.razonSocial}">
				<li class="fieldcontain">
					<span id="razonSocial-label" class="property-label"><g:message code="cliente.razonSocial.label" default="Razon Social" /></span>
					
						<span class="property-value" aria-labelledby="razonSocial-label"><g:fieldValue bean="${clienteInstance}" field="razonSocial"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.codigoPostal}">
				<li class="fieldcontain">
					<span id="codigoPostal-label" class="property-label"><g:message code="cliente.codigoPostal.label" default="Codigo Postal" /></span>
					
						<span class="property-value" aria-labelledby="codigoPostal-label"><g:fieldValue bean="${clienteInstance}" field="codigoPostal"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.localidad}">
				<li class="fieldcontain">
					<span id="localidad-label" class="property-label"><g:message code="cliente.localidad.label" default="Localidad" /></span>
					
						<span class="property-value" aria-labelledby="localidad-label"><g:link controller="localidad" action="show" id="${clienteInstance?.localidad?.id}">${clienteInstance?.localidad?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.fechaAlta}">
				<li class="fieldcontain">
					<span id="fechaAlta-label" class="property-label"><g:message code="cliente.fechaAlta.label" default="Fecha Alta" /></span>
					
						<span class="property-value" aria-labelledby="fechaAlta-label"><g:formatDate date="${clienteInstance?.fechaAlta}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.ingresosBrutos}">
				<li class="fieldcontain">
					<span id="ingresosBrutos-label" class="property-label"><g:message code="cliente.ingresosBrutos.label" default="Ingresos Brutos" /></span>
					
						<span class="property-value" aria-labelledby="ingresosBrutos-label"><g:fieldValue bean="${clienteInstance}" field="ingresosBrutos"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${clienteInstance?.situacionIVA}">
				<li class="fieldcontain">
					<span id="situacionIVA-label" class="property-label"><g:message code="cliente.situacionIVA.label" default="Situacion IVA" /></span>
					
						<span class="property-value" aria-labelledby="situacionIVA-label"><g:fieldValue bean="${clienteInstance}" field="situacionIVA"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${clienteInstance?.id}" />
					<g:link class="edit" action="edit" id="${clienteInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
