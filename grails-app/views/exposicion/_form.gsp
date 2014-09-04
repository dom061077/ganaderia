<%@ page import="com.rural.ganaderia.Exposicion" %>



<div class="fieldcontain ${hasErrors(bean: exposicionInstance, field: 'nombre', 'error')} ">
	<label for="nombre">
		<g:message code="exposicion.nombre.label" default="Nombre" />
		
	</label>
	<g:textField name="nombre" value="${exposicionInstance?.nombre}"/>
</div>

