<%@ page import="com.rural.ganaderia.Gasto" %>



<div class="fieldcontain ${hasErrors(bean: gastoInstance, field: 'descripcion', 'error')} ">
	<label for="descripcion">
		<g:message code="gasto.descripcion.label" default="Descripcion" />
		
	</label>
	<g:textField name="descripcion" value="${gastoInstance?.descripcion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: gastoInstance, field: 'restaCompra', 'error')} ">
	<label for="restaCompra">
		<g:message code="gasto.restaCompra.label" default="Resta Compra" />
		
	</label>
	<g:checkBox name="restaCompra" value="${gastoInstance?.restaCompra}" />
</div>

<div class="fieldcontain ${hasErrors(bean: gastoInstance, field: 'restaVenta', 'error')} ">
	<label for="restaVenta">
		<g:message code="gasto.restaVenta.label" default="Resta Venta" />
		
	</label>
	<g:checkBox name="restaVenta" value="${gastoInstance?.restaVenta}" />
</div>

