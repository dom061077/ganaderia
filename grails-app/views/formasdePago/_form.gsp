<%@ page import="com.rural.ganaderia.FormasdePago" %>



<div class="fieldcontain ${hasErrors(bean: formasdePagoInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="formasdePago.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${formasdePagoInstance?.descripcion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: formasdePagoInstance, field: 'porcentajeDescuento', 'error')} required">
	<label for="porcentajeDescuento">
		<g:message code="formasdePago.porcentajeDescuento.label" default="Porcentaje Descuento" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="porcentajeDescuento" value="${fieldValue(bean: formasdePagoInstance, field: 'porcentajeDescuento')}" required=""/>
</div>

<div class="fieldcontain ${hasErrors(bean: formasdePagoInstance, field: 'tienePlazos', 'error')} ">
	<label for="tienePlazos">
		<g:message code="formasdePago.tienePlazos.label" default="Tiene Plazos" />
		
	</label>
	<g:checkBox name="tienePlazos" value="${formasdePagoInstance?.tienePlazos}" />
</div>

