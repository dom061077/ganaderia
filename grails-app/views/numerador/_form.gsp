<%@ page import="com.rural.ganaderia.Numerador" %>



<div class="fieldcontain ${hasErrors(bean: numeradorInstance, field: 'maximoNumero', 'error')} required">
	<label for="maximoNumero">
		<g:message code="numerador.maximoNumero.label" default="Maximo Numero" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="maximoNumero" type="number" value="${numeradorInstance.maximoNumero}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: numeradorInstance, field: 'tipoNumerador', 'error')} required">
	<label for="tipoNumerador">
		<g:message code="numerador.tipoNumerador.label" default="Tipo Numerador" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="tipoOrden" from="${com.rural.ganaderia.enums.TipoOrden?.values()}" keys="${com.rural.ganaderia.enums.TipoOrden.values()*.name()}" required="" value="${numeradorInstance?.tipoOrden?.name()}"/>
</div>

