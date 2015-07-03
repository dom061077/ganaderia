
<%@ page import="com.rural.ganaderia.comp.Comprobante" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'comprobante.label', default: 'Comprobante')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-comprobante" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-comprobante" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list comprobante">
			
				<g:if test="${comprobanteInstance?.anioExposicion}">
				<li class="fieldcontain">
					<span id="anioExposicion-label" class="property-label"><g:message code="comprobante.anioExposicion.label" default="Anio Exposicion" /></span>
					
						<span class="property-value" aria-labelledby="anioExposicion-label"><g:link controller="anioExposicion" action="show" id="${comprobanteInstance?.anioExposicion?.id}">${comprobanteInstance?.anioExposicion?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.clienteDestino}">
				<li class="fieldcontain">
					<span id="clienteDestino-label" class="property-label"><g:message code="comprobante.clienteDestino.label" default="Cliente Destino" /></span>
					
						<span class="property-value" aria-labelledby="clienteDestino-label"><g:link controller="cliente" action="show" id="${comprobanteInstance?.clienteDestino?.id}">${comprobanteInstance?.clienteDestino?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.clienteOrigen}">
				<li class="fieldcontain">
					<span id="clienteOrigen-label" class="property-label"><g:message code="comprobante.clienteOrigen.label" default="Cliente Origen" /></span>
					
						<span class="property-value" aria-labelledby="clienteOrigen-label"><g:link controller="cliente" action="show" id="${comprobanteInstance?.clienteOrigen?.id}">${comprobanteInstance?.clienteOrigen?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.comprobanteDestino}">
				<li class="fieldcontain">
					<span id="comprobanteDestino-label" class="property-label"><g:message code="comprobante.comprobanteDestino.label" default="Comprobante Destino" /></span>
					
						<span class="property-value" aria-labelledby="comprobanteDestino-label"><g:link controller="comprobante" action="show" id="${comprobanteInstance?.comprobanteDestino?.id}">${comprobanteInstance?.comprobanteDestino?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.cuit}">
				<li class="fieldcontain">
					<span id="cuit-label" class="property-label"><g:message code="comprobante.cuit.label" default="Cuit" /></span>
					
						<span class="property-value" aria-labelledby="cuit-label"><g:fieldValue bean="${comprobanteInstance}" field="cuit"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.destino}">
				<li class="fieldcontain">
					<span id="destino-label" class="property-label"><g:message code="comprobante.destino.label" default="Destino" /></span>
					
						<span class="property-value" aria-labelledby="destino-label"><g:link controller="destino" action="show" id="${comprobanteInstance?.destino?.id}">${comprobanteInstance?.destino?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.detalle}">
				<li class="fieldcontain">
					<span id="detalle-label" class="property-label"><g:message code="comprobante.detalle.label" default="Detalle" /></span>
					
						<g:each in="${comprobanteInstance.detalle}" var="d">
						<span class="property-value" aria-labelledby="detalle-label"><g:link controller="comprobanteDetalle" action="show" id="${d.id}">${d?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.detallegastos}">
				<li class="fieldcontain">
					<span id="detallegastos-label" class="property-label"><g:message code="comprobante.detallegastos.label" default="Detallegastos" /></span>
					
						<g:each in="${comprobanteInstance.detallegastos}" var="d">
						<span class="property-value" aria-labelledby="detallegastos-label"><g:link controller="comprobanteGasto" action="show" id="${d.id}">${d?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.detallevencimientos}">
				<li class="fieldcontain">
					<span id="detallevencimientos-label" class="property-label"><g:message code="comprobante.detallevencimientos.label" default="Detallevencimientos" /></span>
					
						<g:each in="${comprobanteInstance.detallevencimientos}" var="d">
						<span class="property-value" aria-labelledby="detallevencimientos-label"><g:link controller="comprobanteVencimiento" action="show" id="${d.id}">${d?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.direccion}">
				<li class="fieldcontain">
					<span id="direccion-label" class="property-label"><g:message code="comprobante.direccion.label" default="Direccion" /></span>
					
						<span class="property-value" aria-labelledby="direccion-label"><g:fieldValue bean="${comprobanteInstance}" field="direccion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.especie}">
				<li class="fieldcontain">
					<span id="especie-label" class="property-label"><g:message code="comprobante.especie.label" default="Especie" /></span>
					
						<span class="property-value" aria-labelledby="especie-label"><g:link controller="especie" action="show" id="${comprobanteInstance?.especie?.id}">${comprobanteInstance?.especie?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.exposicion}">
				<li class="fieldcontain">
					<span id="exposicion-label" class="property-label"><g:message code="comprobante.exposicion.label" default="Exposicion" /></span>
					
						<span class="property-value" aria-labelledby="exposicion-label"><g:link controller="exposicion" action="show" id="${comprobanteInstance?.exposicion?.id}">${comprobanteInstance?.exposicion?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.fechaAlta}">
				<li class="fieldcontain">
					<span id="fechaAlta-label" class="property-label"><g:message code="comprobante.fechaAlta.label" default="Fecha Alta" /></span>
					
						<span class="property-value" aria-labelledby="fechaAlta-label"><g:formatDate date="${comprobanteInstance?.fechaAlta}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.fechaOperacion}">
				<li class="fieldcontain">
					<span id="fechaOperacion-label" class="property-label"><g:message code="comprobante.fechaOperacion.label" default="Fecha Operacion" /></span>
					
						<span class="property-value" aria-labelledby="fechaOperacion-label"><g:formatDate date="${comprobanteInstance?.fechaOperacion}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.formasdePago}">
				<li class="fieldcontain">
					<span id="formasdePago-label" class="property-label"><g:message code="comprobante.formasdePago.label" default="Formasde Pago" /></span>
					
						<span class="property-value" aria-labelledby="formasdePago-label"><g:link controller="formasdePago" action="show" id="${comprobanteInstance?.formasdePago?.id}">${comprobanteInstance?.formasdePago?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.guias}">
				<li class="fieldcontain">
					<span id="guias-label" class="property-label"><g:message code="comprobante.guias.label" default="Guias" /></span>
					
						<span class="property-value" aria-labelledby="guias-label"><g:fieldValue bean="${comprobanteInstance}" field="guias"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.ingresosBrutos}">
				<li class="fieldcontain">
					<span id="ingresosBrutos-label" class="property-label"><g:message code="comprobante.ingresosBrutos.label" default="Ingresos Brutos" /></span>
					
						<span class="property-value" aria-labelledby="ingresosBrutos-label"><g:fieldValue bean="${comprobanteInstance}" field="ingresosBrutos"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.letra}">
				<li class="fieldcontain">
					<span id="letra-label" class="property-label"><g:message code="comprobante.letra.label" default="Letra" /></span>
					
						<span class="property-value" aria-labelledby="letra-label"><g:fieldValue bean="${comprobanteInstance}" field="letra"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.localidad}">
				<li class="fieldcontain">
					<span id="localidad-label" class="property-label"><g:message code="comprobante.localidad.label" default="Localidad" /></span>
					
						<span class="property-value" aria-labelledby="localidad-label"><g:link controller="localidad" action="show" id="${comprobanteInstance?.localidad?.id}">${comprobanteInstance?.localidad?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.numero}">
				<li class="fieldcontain">
					<span id="numero-label" class="property-label"><g:message code="comprobante.numero.label" default="Numero" /></span>
					
						<span class="property-value" aria-labelledby="numero-label"><g:fieldValue bean="${comprobanteInstance}" field="numero"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.numeroOperacion}">
				<li class="fieldcontain">
					<span id="numeroOperacion-label" class="property-label"><g:message code="comprobante.numeroOperacion.label" default="Numero Operacion" /></span>
					
						<span class="property-value" aria-labelledby="numeroOperacion-label"><g:fieldValue bean="${comprobanteInstance}" field="numeroOperacion"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.operacion}">
				<li class="fieldcontain">
					<span id="operacion-label" class="property-label"><g:message code="comprobante.operacion.label" default="Operacion" /></span>
					
						<span class="property-value" aria-labelledby="operacion-label"><g:link controller="operacion" action="show" id="${comprobanteInstance?.operacion?.id}">${comprobanteInstance?.operacion?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.procedencia}">
				<li class="fieldcontain">
					<span id="procedencia-label" class="property-label"><g:message code="comprobante.procedencia.label" default="Procedencia" /></span>
					
						<span class="property-value" aria-labelledby="procedencia-label"><g:link controller="localidad" action="show" id="${comprobanteInstance?.procedencia?.id}">${comprobanteInstance?.procedencia?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.razonSocial}">
				<li class="fieldcontain">
					<span id="razonSocial-label" class="property-label"><g:message code="comprobante.razonSocial.label" default="Razon Social" /></span>
					
						<span class="property-value" aria-labelledby="razonSocial-label"><g:fieldValue bean="${comprobanteInstance}" field="razonSocial"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${comprobanteInstance?.situacionIVA}">
				<li class="fieldcontain">
					<span id="situacionIVA-label" class="property-label"><g:message code="comprobante.situacionIVA.label" default="Situacion IVA" /></span>
					
						<span class="property-value" aria-labelledby="situacionIVA-label"><g:fieldValue bean="${comprobanteInstance}" field="situacionIVA"/></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:comprobanteInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${comprobanteInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
