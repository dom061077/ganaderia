<%@ page import="com.rural.ganaderia.Categoria" %>



<div class="fieldcontain ${hasErrors(bean: categoriaInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="categoria.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" maxlength="50" required="" value="${categoriaInstance?.nombre}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: categoriaInstance, field: 'especie', 'error')} required">
	<label for="especie">
		<g:message code="categoria.especie.label" default="Especie" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="especie" name="especie.id" from="${com.rural.ganaderia.Especie.list()}" optionKey="id" optionValue="nombre" required="" value="${categoriaInstance?.especie?.id}" class="many-to-one"/>
</div>

