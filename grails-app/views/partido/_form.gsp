<%@ page import="com.rural.ganaderia.localizacion.Partido" %>



<div class="fieldcontain ${hasErrors(bean: partidoInstance, field: 'codigo', 'error')} required">
	<label for="codigo">
		<g:message code="partido.codigo.label" default="Codigo" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="codigo" required="" value="${partidoInstance?.codigo}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: partidoInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="partido.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${partidoInstance?.nombre}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: partidoInstance, field: 'provincia', 'error')} required">
	<label for="provincia">
		<g:message code="partido.provincia.label" default="Provincia" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="provincia" name="provincia.id" from="${com.rural.ganaderia.localizacion.Provincia.list()}" optionKey="id" required="" value="${partidoInstance?.provincia?.id}" class="many-to-one"/>

</div>

