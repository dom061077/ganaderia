<%@ page import="com.rural.ganaderia.parametros.GastoEspecieDestinoOper" %>



<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'tipoComprobanteOrigen', 'error')} ">
	<label for="tipoComprobanteOrigen">
		<g:message code="gastoEspecieDestinoOper.tipoComprobanteOrigen.label" default="Tipo Comprobante Origen" />
		
	</label>
	<g:select name="tipoComprobanteOrigen" from="${com.rural.ganaderia.enums.TipoComprobante?.values()}" keys="${com.rural.ganaderia.enums.TipoComprobante.values()*.name()}" value="${gastoEspecieDestinoOperInstance?.tipoComprobanteOrigen?.name()}"  noSelection="['': '']"/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'especie', 'error')} ">
	<label for="especie">
		<g:message code="gastoEspecieDestinoOper.especie.label" default="Especie" />
		
	</label>
	<g:select id="especie" name="especie.id" from="${com.rural.ganaderia.Especie.list()}" optionKey="id" value="${gastoEspecieDestinoOperInstance?.especie?.id}" class="many-to-one" noSelection="['null': '']"/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'alicuota', 'error')} required">
	<label for="alicuota">
		<g:message code="gastoEspecieDestinoOper.alicuota.label" default="Alicuota" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="alicuota" value="${fieldValue(bean: gastoEspecieDestinoOperInstance, field: 'alicuota')}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'codigoIvaDestino', 'error')} required">
	<label for="codigoIvaDestino">
		<g:message code="gastoEspecieDestinoOper.codigoIvaDestino.label" default="Codigo Iva Destino" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="codigoIvaDestino" required="" value="${gastoEspecieDestinoOperInstance?.codigoIvaDestino}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'codigoIvaEspecie', 'error')} required">
	<label for="codigoIvaEspecie">
		<g:message code="gastoEspecieDestinoOper.codigoIvaEspecie.label" default="Codigo Iva Especie" />
		<span class="required-indicator">*</span>
	</label>
	<g:textField name="codigoIvaEspecie" required="" value="${gastoEspecieDestinoOperInstance?.codigoIvaEspecie}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'destino', 'error')} required">
	<label for="destino">
		<g:message code="gastoEspecieDestinoOper.destino.label" default="Destino" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="destino" name="destino.id" from="${com.rural.ganaderia.Destino.list()}" optionKey="id" required="" value="${gastoEspecieDestinoOperInstance?.destino?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'situacionIVA', 'error')} required">
	<label for="situacionIVA">
		<g:message code="gastoEspecieDestinoOper.situacionIVA.label" default="Situacion IVA" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="situacionIVA" name="situacionIVA.id" from="${com.rural.ganaderia.SituacionIVA.list()}" optionKey="id" required="" value="${gastoEspecieDestinoOperInstance?.situacionIVA?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: gastoEspecieDestinoOperInstance, field: 'tipoComprobante', 'error')} required">
	<label for="tipoComprobante">
		<g:message code="gastoEspecieDestinoOper.tipoComprobante.label" default="Tipo Comprobante" />
		<span class="required-indicator">*</span>
	</label>
	<g:select name="tipoComprobante" from="${com.rural.ganaderia.enums.TipoComprobante?.values()}" keys="${com.rural.ganaderia.enums.TipoComprobante.values()*.name()}" required="" value="${gastoEspecieDestinoOperInstance?.tipoComprobante?.name()}" />

</div>

