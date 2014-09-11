<%@ page import="com.rural.ganaderia.Raza" %>



<div class="fieldcontain ${hasErrors(bean: razaInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="raza.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${razaInstance?.nombre}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: razaInstance, field: 'especie', 'error')} required">
	<label for="especie">
		<g:message code="raza.especie.label" default="Especie" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="especie" name="especie.id" from="${com.rural.ganaderia.Especie.list()}" optionKey="id" required="" optionValue="nombre" value="${razaInstance?.especie?.id}" class="many-to-one"/>
</div>

