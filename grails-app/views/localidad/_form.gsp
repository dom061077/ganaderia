<%@ page import="com.rural.ganaderia.localizacion.Localidad" %>



<div class="fieldcontain ${hasErrors(bean: localidadInstance, field: 'codigoPostal', 'error')} required">
	<label for="codigoPostal">
		<g:message code="localidad.codigoPostal.label" default="Codigo Postal" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="codigoPostal" type="number" value="${localidadInstance.codigoPostal}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: localidadInstance, field: 'nombre', 'error')} required">
	<label for="nombre">
		<g:message code="localidad.nombre.label" default="Nombre" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="nombre" required="" value="${localidadInstance?.nombre}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: localidadInstance, field: 'partido', 'error')} required">
	<label for="partido">
		<g:message code="localidad.partido.label" default="Partido" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="partido" name="partido.id" from="${com.rural.ganaderia.localizacion.Partido.list()}" optionKey="id" required="" value="${localidadInstance?.partido?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: localidadInstance, field: 'ubicacion', 'error')} required">
	<label for="ubicacion">
		<g:message code="localidad.ubicacion.label" default="Ubicacion" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="ubicacion" required="" value="${localidadInstance?.ubicacion}"/>

</div>

