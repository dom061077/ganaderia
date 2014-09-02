<%@ page import="com.rural.ganaderia.Operacion" %>



<div class="fieldcontain ${hasErrors(bean: operacionInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="operacion.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${operacionInstance?.nombre}"/>
</div>

