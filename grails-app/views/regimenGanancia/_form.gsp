<%@ page import="com.rural.ganaderia.RegimenGanancia" %>



<div class="fieldcontain ${hasErrors(bean: regimenGananciaInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="regimenGanancia.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${regimenGananciaInstance?.descripcion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: regimenGananciaInstance, field: 'montoImponible', 'error')} required">
	<label for="montoImponible">
		<g:message code="regimenGanancia.montoImponible.label" default="Monto Imponible" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="montoImponible" value="${fieldValue(bean: regimenGananciaInstance, field: 'montoImponible')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: regimenGananciaInstance, field: 'porcentajeRI', 'error')} required">
	<label for="porcentajeRI">
		<g:message code="regimenGanancia.porcentajeRI.label" default="Porcentaje RI" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="porcentajeRI" value="${fieldValue(bean: regimenGananciaInstance, field: 'porcentajeRI')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: regimenGananciaInstance, field: 'porcentajeRNI', 'error')} required">
	<label for="porcentajeRNI">
		<g:message code="regimenGanancia.porcentajeRNI.label" default="Porcentaje RNI" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="porcentajeRNI" value="${fieldValue(bean: regimenGananciaInstance, field: 'porcentajeRNI')}" required=""/>
</div>

