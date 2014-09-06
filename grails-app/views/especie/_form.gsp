<%@ page import="com.rural.ganaderia.Especie" %>



<div class="fieldcontain ${hasErrors(bean: especieInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="especie.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${especieInstance?.nombre}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: especieInstance, field: 'categorias', 'error')} ">
	<label for="categorias">
		<g:message code="especie.categorias.label" default="Categorias" />
		
	</label>
	
<ul class="one-to-many">
<g:each in="${especieInstance?.categorias?}" var="c">
    <li><g:link controller="categoria" action="show" id="${c.id}">${c?.encodeAsHTML()}</g:link></li>
</g:each>
<li class="add">
<g:link controller="categoria" action="create" params="['especie.id': especieInstance?.id]">${message(code: 'default.add.label', args: [message(code: 'categoria.label', default: 'Categoria')])}</g:link>
</li>
</ul>

</div>

<div class="fieldcontain ${hasErrors(bean: especieInstance, field: 'evaluaIvaen2daVenta', 'error')} ">
	<label for="evaluaIvaen2daVenta">
		<g:message code="especie.evaluaIvaen2daVenta.label" default="Evalua Ivaen2da Venta" />
		
	</label>
	<g:checkBox name="evaluaIvaen2daVenta" value="${especieInstance?.evaluaIvaen2daVenta}" />
</div>

<div class="fieldcontain ${hasErrors(bean: especieInstance, field: 'porcentajeIVA', 'error')} required">
	<label for="porcentajeIVA">
		<g:message code="especie.porcentajeIVA.label" default="Porcentaje IVA" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="porcentajeIVA" value="${fieldValue(bean: especieInstance, field: 'porcentajeIVA')}" required=""/>
</div>

