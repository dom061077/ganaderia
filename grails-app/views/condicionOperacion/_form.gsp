<%@ page import="com.rural.ganaderia.CondicionOperacion" %>



<div class="fieldcontain ${hasErrors(bean: condicionOperacionInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="condicionOperacion.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${condicionOperacionInstance?.nombre}"/>
</div>

