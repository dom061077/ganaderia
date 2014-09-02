<%@ page import="com.rural.ganaderia.Raza" %>



<div class="fieldcontain ${hasErrors(bean: razaInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="raza.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${razaInstance?.nombre}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: razaInstance, field: 'categoria', 'error')} required">
	<label for="categoria">
		<g:message code="raza.categoria.label" default="Categoria" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="categoria" name="categoria.id" from="${com.rural.ganaderia.Categoria.list()}" optionKey="id" required="" value="${razaInstance?.categoria?.id}" class="many-to-one"/>
</div>

