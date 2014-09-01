<%@ page import="com.rural.ganaderia.Destino" %>



<div class="fieldcontain ${hasErrors(bean: destinoInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="destino.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${destinoInstance?.descripcion}"/>
</div>

