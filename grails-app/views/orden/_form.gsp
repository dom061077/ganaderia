<%@ page import="com.rural.ganaderia.Orden" %>



<div class="fieldcontain ${hasErrors(bean: ordenInstance, field: 'cliente', 'error')} required">
	<label for="cliente">
		<g:message code="orden.cliente.label" default="Cliente" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="cliente" name="cliente.id" from="${com.rural.ganaderia.Cliente.list()}" optionKey="id" required="" value="${ordenInstance?.cliente?.id}" class="many-to-one"/>
</div>

<div class="fieldcontain ${hasErrors(bean: ordenInstance, field: 'detalle', 'error')} ">
	<label for="detalle">
		<g:message code="orden.detalle.label" default="Detalle" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${ordenInstance?.detalle?}" var="d">
    <li><g:link controller="detalleOrden" action="show" id="${d.id}">${d?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="detalleOrden" action="create" params="['orden.id': ordenInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'detalleOrden.label', default: 'DetalleOrden')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: ordenInstance, field: 'fechaAlta', 'error')} required">
	<label for="fechaAlta">
		<g:message code="orden.fechaAlta.label" default="Fecha Alta" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="fechaAlta" precision="day"  value="${ordenInstance?.fechaAlta}"  />
</div>

