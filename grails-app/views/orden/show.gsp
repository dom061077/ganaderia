
<%@ page import="com.rural.ganaderia.Orden" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'orden.label', default: 'Orden')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-orden" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-orden" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
            <fieldset style="border: solid">
                <legend>Datos de Orden de Venta</legend>
			<ol class="property-list orden">
			
				<g:if test="${ordenInstance?.cliente}">
				<li class="fieldcontain">
					    <span id="cliente-cuit-label" class="property-label"><g:message code="cliente.cuit.label" default="C.U.I.T" /></span>
					
						<%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="cliente-cuit-label">
                            ${ordenInstance?.cliente.cuit}
                        </span>                    
					
				</li>
                    <li class="fieldcontain">
                        <span id="cliente-razonSocial-label" class="property-label"><g:message code="cliente.razonSocial.label" default="Razón Social/Apellido y Nombre" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="cliente-razonSocial-label">
                            ${ordenInstance?.razonSocial}
                        </span>

                    </li>
                    <li class="fieldcontain">
                        <span id="cliente-situacionIVA-label" class="property-label"><g:message code="cliente.situacionIVA.label" default="Condición I.V.A" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="cliente-situacionIVA-label">
                            ${ordenInstance?.situacionIVA.name}
                        </span>

                    </li>

                <li class="fieldcontain">
                        <span id="cliente-ingresosBrutos-label" class="property-label"><g:message code="cliente.ingresosBrutos.label" default="Ingresos Brutos" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="cliente-ingresosBrutos-label">
                            ${ordenInstance?.ingresosBrutos}
                        </span>

                </li>
                <li class="fieldcontain">
                        <span id="orden-subTotal-label" class="property-label"><g:message code="orden.subTotal.label" default="Importe Bruto" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="orden-subTotal-label">
                            <g:formatNumber number="${ordenInstance?.subTotal}" type="currency" locale="es_AR" />

                        </span>

                </li>

                <g:if test="${ordenInstance?.detallegastos}">
                        <li class="fieldcontain">
                            <span id="gasto-descripcion-label" class="property-label"><g:message code="gasto.descripcion.label" default="Descripción Gasto" /></span>

                            <g:each in="${ordenInstance.detallegastos}" var="d">
                                <span class="property-value" aria-labelledby="gasto-descripcion-label">
                                    ${d?.gasto?.descripcion}
                                    <g:if test="${(d?.porcentaje)}">
                                      <g:formatNumber number="${d?.porcentaje>0}" locale="es_AR"/>
                                    </g:if>
                                    <g:if test="${!(d?.porcentaje)}">
                                        <g:formatNumber number="${d?.monto}" type="currency" locale="es_AR"/>
                                    </g:if>

                                    <g:formatNumber number="${d.subTotal}" type="currency" locale="es_AR"/>
                                </span>


                            </g:each>

                        </li>
                </g:if>


                <li class="fieldcontain">
                        <span id="orden-totalGastos-label" class="property-label"><g:message code="orden.totalGastos.label" default="Total Gastos" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="orden-totalGastos-label">
                            <g:formatNumber number="${ordenInstance?.totalGastos}" type="currency" locale="es_AR" />

                        </span>

                </li>


                <li class="fieldcontain">
                        <span id="orden-baseImponible-label" class="property-label"><g:message code="orden.baseImponible.label" default="Base" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="orden-baseImponible-label">
                            <g:formatNumber number="${ordenInstance?.baseImponible}" type="currency" locale="es_AR" />

                        </span>

                </li>

                <li class="fieldcontain">
                        <span id="orden-iva-label" class="property-label"><g:message code="orden.iva.label" default="${ordenInstance?.situacionIVA.name} - ${ordenInstance.especie.porcentajeIVA} %" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="orden-iva-label">
                            <g:formatNumber number="${ordenInstance?.iva}" type="currency" locale="es_AR" />

                        </span>

                </li>

                <li class="fieldcontain">
                        <span id="orden-total-label" class="property-label"><g:message code="orden.total.label" default="Total" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="orden-total-label">
                            <g:formatNumber number="${ordenInstance?.total}" type="currency" locale="es_AR" />

                        </span>

                </li>


				</g:if>
			
				<g:if test="${ordenInstance?.detalle}">
				<li class="fieldcontain">
					<span id="detalle-label" class="property-label"><g:message code="orden.detalle.label" default="Detalle" /></span>
					
						<g:each in="${ordenInstance.detalle}" var="d">
						<span class="property-value" aria-labelledby="detalle-label"><g:link controller="detalleOrden" action="show" id="${d.id}">${d?.encodeAsHTML()}</g:link></span>
						</g:each>
					
				</li>
				</g:if>
			
				<g:if test="${ordenInstance?.fechaAlta}">
				<li class="fieldcontain">
					<span id="fechaAlta-label" class="property-label"><g:message code="orden.fechaAlta.label" default="Fecha Alta" /></span>
					
						<span class="property-value" aria-labelledby="fechaAlta-label"><g:formatDate date="${ordenInstance?.fechaAlta}" /></span>
					
				</li>
				</g:if>
			
			</ol>
            </fieldset>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${ordenInstance?.id}" />
					<g:link class="edit" action="edit" id="${ordenInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
