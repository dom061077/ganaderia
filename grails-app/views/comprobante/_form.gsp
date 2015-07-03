<%@ page import="com.rural.ganaderia.comp.Comprobante" %>



<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'anioExposicion', 'error')} required">
	<label for="anioExposicion">
		<g:message code="comprobante.anioExposicion.label" default="Anio Exposicion" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="anioExposicion" name="anioExposicion.id" from="${com.rural.ganaderia.AnioExposicion.list()}" optionKey="id" required="" value="${comprobanteInstance?.anioExposicion?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'clienteDestino', 'error')} required">
	<label for="clienteDestino">
		<g:message code="comprobante.clienteDestino.label" default="Cliente Destino" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="clienteDestino" name="clienteDestino.id" from="${com.rural.ganaderia.Cliente.list()}" optionKey="id" required="" value="${comprobanteInstance?.clienteDestino?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'clienteOrigen', 'error')} required">
	<label for="clienteOrigen">
		<g:message code="comprobante.clienteOrigen.label" default="Cliente Origen" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="clienteOrigen" name="clienteOrigen.id" from="${com.rural.ganaderia.Cliente.list()}" optionKey="id" required="" value="${comprobanteInstance?.clienteOrigen?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'comprobanteDestino', 'error')} required">
	<label for="comprobanteDestino">
		<g:message code="comprobante.comprobanteDestino.label" default="Comprobante Destino" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="comprobanteDestino" name="comprobanteDestino.id" from="${com.rural.ganaderia.comp.Comprobante.list()}" optionKey="id" required="" value="${comprobanteInstance?.comprobanteDestino?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'cuit', 'error')} required">
	<label for="cuit">
		<g:message code="comprobante.cuit.label" default="Cuit" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="cuit" required="" value="${comprobanteInstance?.cuit}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'destino', 'error')} required">
	<label for="destino">
		<g:message code="comprobante.destino.label" default="Destino" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="destino" name="destino.id" from="${com.rural.ganaderia.Destino.list()}" optionKey="id" required="" value="${comprobanteInstance?.destino?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'detalle', 'error')} ">
	<label for="detalle">
		<g:message code="comprobante.detalle.label" default="Detalle" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${comprobanteInstance?.detalle?}" var="d">
    <li><g:link controller="comprobanteDetalle" action="show" id="${d.id}">${d?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="comprobanteDetalle" action="create" params="['comprobante.id': comprobanteInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'comprobanteDetalle.label', default: 'ComprobanteDetalle')])}</g:link>
</li>
</ul>


</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'detallegastos', 'error')} ">
	<label for="detallegastos">
		<g:message code="comprobante.detallegastos.label" default="Detallegastos" />
		
	</label>
	<g:select name="detallegastos" from="${com.rural.ganaderia.comp.ComprobanteGasto.list()}" multiple="multiple" optionKey="id" size="5" value="${comprobanteInstance?.detallegastos*.id}" class="many-to-many"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'detallevencimientos', 'error')} ">
	<label for="detallevencimientos">
		<g:message code="comprobante.detallevencimientos.label" default="Detallevencimientos" />
		
	</label>
	<g:select name="detallevencimientos" from="${com.rural.ganaderia.comp.ComprobanteVencimiento.list()}" multiple="multiple" optionKey="id" size="5" value="${comprobanteInstance?.detallevencimientos*.id}" class="many-to-many"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'direccion', 'error')} required">
	<label for="direccion">
		<g:message code="comprobante.direccion.label" default="Direccion" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="direccion" required="" value="${comprobanteInstance?.direccion}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'especie', 'error')} required">
	<label for="especie">
		<g:message code="comprobante.especie.label" default="Especie" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="especie" name="especie.id" from="${com.rural.ganaderia.Especie.list()}" optionKey="id" required="" value="${comprobanteInstance?.especie?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'exposicion', 'error')} required">
	<label for="exposicion">
		<g:message code="comprobante.exposicion.label" default="Exposicion" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="exposicion" name="exposicion.id" from="${com.rural.ganaderia.Exposicion.list()}" optionKey="id" required="" value="${comprobanteInstance?.exposicion?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'fechaAlta', 'error')} required">
	<label for="fechaAlta">
		<g:message code="comprobante.fechaAlta.label" default="Fecha Alta" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="fechaAlta" precision="day"  value="${comprobanteInstance?.fechaAlta}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'fechaOperacion', 'error')} required">
	<label for="fechaOperacion">
		<g:message code="comprobante.fechaOperacion.label" default="Fecha Operacion" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="fechaOperacion" precision="day"  value="${comprobanteInstance?.fechaOperacion}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'formasdePago', 'error')} required">
	<label for="formasdePago">
		<g:message code="comprobante.formasdePago.label" default="Formasde Pago" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="formasdePago" name="formasdePago.id" from="${com.rural.ganaderia.FormasdePago.list()}" optionKey="id" required="" value="${comprobanteInstance?.formasdePago?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'guias', 'error')} required">
	<label for="guias">
		<g:message code="comprobante.guias.label" default="Guias" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="guias" required="" value="${comprobanteInstance?.guias}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'ingresosBrutos', 'error')} required">
	<label for="ingresosBrutos">
		<g:message code="comprobante.ingresosBrutos.label" default="Ingresos Brutos" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="ingresosBrutos" required="" value="${comprobanteInstance?.ingresosBrutos}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'letra', 'error')} required">
	<label for="letra">
		<g:message code="comprobante.letra.label" default="Letra" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="letra" type="number" value="${comprobanteInstance.letra}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'localidad', 'error')} required">
	<label for="localidad">
		<g:message code="comprobante.localidad.label" default="Localidad" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="localidad" name="localidad.id" from="${com.rural.ganaderia.localizacion.Localidad.list()}" optionKey="id" required="" value="${comprobanteInstance?.localidad?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'numero', 'error')} required">
	<label for="numero">
		<g:message code="comprobante.numero.label" default="Numero" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="numero" type="number" value="${comprobanteInstance.numero}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'numeroOperacion', 'error')} required">
	<label for="numeroOperacion">
		<g:message code="comprobante.numeroOperacion.label" default="Numero Operacion" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="numeroOperacion" type="number" value="${comprobanteInstance.numeroOperacion}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'operacion', 'error')} required">
	<label for="operacion">
		<g:message code="comprobante.operacion.label" default="Operacion" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="operacion" name="operacion.id" from="${com.rural.ganaderia.Operacion.list()}" optionKey="id" required="" value="${comprobanteInstance?.operacion?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'procedencia', 'error')} required">
	<label for="procedencia">
		<g:message code="comprobante.procedencia.label" default="Procedencia" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="procedencia" name="procedencia.id" from="${com.rural.ganaderia.localizacion.Localidad.list()}" optionKey="id" required="" value="${comprobanteInstance?.procedencia?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'razonSocial', 'error')} required">
	<label for="razonSocial">
		<g:message code="comprobante.razonSocial.label" default="Razon Social" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="razonSocial" required="" value="${comprobanteInstance?.razonSocial}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: comprobanteInstance, field: 'situacionIVA', 'error')} required">
	<label for="situacionIVA">
		<g:message code="comprobante.situacionIVA.label" default="Situacion IVA" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="situacionIVA" from="${com.rural.ganaderia.enums.SituacionIVA?.values()}" keys="${com.rural.ganaderia.enums.SituacionIVA.values()*.name()}" required="" value="${comprobanteInstance?.situacionIVA?.name()}" />

</div>

