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
	<g:select id="especie" name="especie.id" from="${com.rural.ganaderia.Especie.list()}" optionKey="id" required="" value="${categoriaInstance?.especie?.id}" class="many-to-one"/>
</div>

<div class="fieldcontain ${hasErrors(bean: categoriaInstance, field: 'razas', 'error')} ">
	<label for="razas">
		<g:message code="categoria.razas.label" default="Razas" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${categoriaInstance?.razas?}" var="r">
    <li><g:link controller="raza" action="show" id="${r.id}">${r?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="raza" action="create" params="['categoria.id': categoriaInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'raza.label', default: 'Raza')])}</g:link>
</li>
</ul>

</div>

