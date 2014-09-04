<%@ page import="com.rural.ganaderia.AnioExposicion" %>



<div class="fieldcontain ${hasErrors(bean: anioExposicionInstance, field: 'anio', 'error')} required">
	<label for="anio">
		<g:message code="anioExposicion.anio.label" default="Anio" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="anio" type="number" value="${anioExposicionInstance.anio}" required=""/>
</div>

