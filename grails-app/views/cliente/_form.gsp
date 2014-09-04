<%@ page import="com.rural.ganaderia.Cliente" %>



<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'cuit', 'error')} ">
	<label for="cuit">
		<g:message code="cliente.cuit.label" default="Cuit" />
		
	</label>
	<g:textField name="cuit" value="${clienteInstance?.cuit}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'direccion', 'error')} ">
	<label for="direccion">
		<g:message code="cliente.direccion.label" default="Direccion" />
		
	</label>
	<g:textField name="direccion" maxlength="60" value="${clienteInstance?.direccion}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'email', 'error')} ">
	<label for="email">
		<g:message code="cliente.email.label" default="Email" />
		
	</label>
	<g:field type="email" name="email" maxlength="50" value="${clienteInstance?.email}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'telefono1', 'error')} ">
	<label for="telefono1">
		<g:message code="cliente.telefono1.label" default="Telefono1" />
		
	</label>
	<g:textField name="telefono1" maxlength="20" value="${clienteInstance?.telefono1}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'telefono2', 'error')} ">
	<label for="telefono2">
		<g:message code="cliente.telefono2.label" default="Telefono2" />
		
	</label>
	<g:textField name="telefono2" maxlength="20" value="${clienteInstance?.telefono2}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'razonSocial', 'error')} ">
	<label for="razonSocial">
		<g:message code="cliente.razonSocial.label" default="Razon Social" />
		
	</label>
	<g:textField name="razonSocial" maxlength="60" value="${clienteInstance?.razonSocial}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'codigoPostal', 'error')} ">
	<label for="codigoPostal">
		<g:message code="cliente.codigoPostal.label" default="Codigo Postal" />
		
	</label>
	<g:textField name="codigoPostal" maxlength="10" value="${clienteInstance?.codigoPostal}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'localidad', 'error')} ">
	<label for="localidad">
		<g:message code="cliente.localidad.label" default="Localidad" />
		
	</label>
	<g:select id="localidad" name="localidad.id" from="${com.rural.ganaderia.localizacion.Localidad.list()}" optionKey="id" value="${clienteInstance?.localidad?.id}" class="many-to-one" noSelection="['null': '']"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'fechaAlta', 'error')} required">
	<label for="fechaAlta">
		<g:message code="cliente.fechaAlta.label" default="Fecha Alta" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="fechaAlta" precision="day"  value="${clienteInstance?.fechaAlta}"  />
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'ingresosBrutos', 'error')} ">
	<label for="ingresosBrutos">
		<g:message code="cliente.ingresosBrutos.label" default="Ingresos Brutos" />
		
	</label>
	<g:textField name="ingresosBrutos" value="${clienteInstance?.ingresosBrutos}"/>
</div>

<div class="fieldcontain ${hasErrors(bean: clienteInstance, field: 'situacionIVA', 'error')} required">
	<label for="situacionIVA">
		<g:message code="cliente.situacionIVA.label" default="Situacion IVA" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="situacionIVA" from="${com.rural.ganaderia.enums.SituacionIVA?.values()}" keys="${com.rural.ganaderia.enums.SituacionIVA.values()*.name()}" required="" value="${clienteInstance?.situacionIVA?.name()}"/>
</div>

