
<%@ page import="com.rural.ganaderia.parametros.GastoEspecieDestinoOper" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'gastoEspecieDestinoOper.label', default: 'GastoEspecieDestinoOper')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-gastoEspecieDestinoOper" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-gastoEspecieDestinoOper" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list gastoEspecieDestinoOper">
			
				<g:if test="${gastoEspecieDestinoOperInstance?.tipoComprobanteOrigen}">
				<li class="fieldcontain">
					<span id="tipoComprobanteOrigen-label" class="property-label"><g:message code="gastoEspecieDestinoOper.tipoComprobanteOrigen.label" default="Tipo Comprobante Origen" /></span>
					
						<span class="property-value" aria-labelledby="tipoComprobanteOrigen-label"><g:fieldValue bean="${gastoEspecieDestinoOperInstance}" field="tipoComprobanteOrigen"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.especie}">
				<li class="fieldcontain">
					<span id="especie-label" class="property-label"><g:message code="gastoEspecieDestinoOper.especie.label" default="Especie" /></span>
					
						<span class="property-value" aria-labelledby="especie-label"><g:link controller="especie" action="show" id="${gastoEspecieDestinoOperInstance?.especie?.id}">${gastoEspecieDestinoOperInstance?.especie?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.alicuota}">
				<li class="fieldcontain">
					<span id="alicuota-label" class="property-label"><g:message code="gastoEspecieDestinoOper.alicuota.label" default="Alicuota" /></span>
					
						<span class="property-value" aria-labelledby="alicuota-label"><g:fieldValue bean="${gastoEspecieDestinoOperInstance}" field="alicuota"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.codigoIvaDestino}">
				<li class="fieldcontain">
					<span id="codigoIvaDestino-label" class="property-label"><g:message code="gastoEspecieDestinoOper.codigoIvaDestino.label" default="Codigo Iva Destino" /></span>
					
						<span class="property-value" aria-labelledby="codigoIvaDestino-label"><g:fieldValue bean="${gastoEspecieDestinoOperInstance}" field="codigoIvaDestino"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.codigoIvaEspecie}">
				<li class="fieldcontain">
					<span id="codigoIvaEspecie-label" class="property-label"><g:message code="gastoEspecieDestinoOper.codigoIvaEspecie.label" default="Codigo Iva Especie" /></span>
					
						<span class="property-value" aria-labelledby="codigoIvaEspecie-label"><g:fieldValue bean="${gastoEspecieDestinoOperInstance}" field="codigoIvaEspecie"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.destino}">
				<li class="fieldcontain">
					<span id="destino-label" class="property-label"><g:message code="gastoEspecieDestinoOper.destino.label" default="Destino" /></span>
					
						<span class="property-value" aria-labelledby="destino-label"><g:link controller="destino" action="show" id="${gastoEspecieDestinoOperInstance?.destino?.id}">${gastoEspecieDestinoOperInstance?.destino?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.situacionIVA}">
				<li class="fieldcontain">
					<span id="situacionIVA-label" class="property-label"><g:message code="gastoEspecieDestinoOper.situacionIVA.label" default="Situacion IVA" /></span>
					
						<span class="property-value" aria-labelledby="situacionIVA-label"><g:link controller="situacionIVA" action="show" id="${gastoEspecieDestinoOperInstance?.situacionIVA?.id}">${gastoEspecieDestinoOperInstance?.situacionIVA?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${gastoEspecieDestinoOperInstance?.tipoComprobante}">
				<li class="fieldcontain">
					<span id="tipoComprobante-label" class="property-label"><g:message code="gastoEspecieDestinoOper.tipoComprobante.label" default="Tipo Comprobante" /></span>
					
						<span class="property-value" aria-labelledby="tipoComprobante-label"><g:fieldValue bean="${gastoEspecieDestinoOperInstance}" field="tipoComprobante"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:gastoEspecieDestinoOperInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${gastoEspecieDestinoOperInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
