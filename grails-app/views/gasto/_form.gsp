<%@ page import="com.rural.ganaderia.Gasto" %>



<div class="fieldcontain ${hasErrors(bean: gastoInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="gasto.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${gastoInstance?.descripcion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: gastoInstance, field: 'restaBaseImponible', 'error')} ">
	<label for="restaBaseImponible">
		<g:message code="gasto.restaBaseImponible.label" default="Resta Base Imponible" />
		
	</label>
	<g:checkBox name="restaBaseImponible" value="${gastoInstance?.restaBaseImponible}" />
</div>

