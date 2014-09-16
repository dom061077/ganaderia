
<%@ page import="com.rural.ganaderia.Orden" %>
<%@ page import="com.rural.ganaderia.enums.TipoOrden" %>
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
                <legend>
                    <g:if test="${ordenInstance.tipoOrden == TipoOrden.COMPRA_A || ordenInstance.tipoOrden == TipoOrden.COMPRA_B}">
                            <g:message code="com.educacion.academico.Orden.compra.showdatos"/>
                    </g:if>
                    <g:if test="${ordenInstance.tipoOrden == TipoOrden.VENTA_A || ordenInstance.tipoOrden == TipoOrden.VENTA_B}">
                        <g:message code="com.educacion.academico.Orden.venta.showdatos"/>
                    </g:if>

                </legend>
			<ol class="property-list orden">
                <li class="fieldcontain">
                    <span id="orden-numeroOperacion-label" class="property-label"><g:message code="orden.numeroOperacion.label" default="Nº de Operación" /></span>
                    <span class="property-value" aria-labelledby="orden-numeroOperacion-label">
                        ${ordenInstance?.numeroOperacion}
                    </span>

                </li>
                <li class="fieldcontain">
                    <span id="orden-fechaOperacion-label" class="property-label"><g:message code="orden.fechaOperacion.label" default="Fecha Operación" /></span>

                    <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                    <span class="property-value" aria-labelledby="orden-fechaOperacion-label">
                        <g:formatDate format="dd/MM/yyyy" date="${ordenInstance?.fechaOperacion}"/>

                    </span>

                </li>

			
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
                            <span id="gasto-descripcion-label" class="property-label"><g:message code="gasto.descripcion.label" default="Detalle del Gasto" /></span>

                            <span class="property-value" aria-labelledby="gasto-descripcion-label">
                            <table border="0">
                                <tr><td>Descripcion</td><td>Monto o porcentaje</td><td>Subtotal</td></tr>
                            <g:each in="${ordenInstance.detallegastos}" var="d">
                                <tr>
                                    <td>${d?.gasto?.descripcion}</td>
                                    <g:if test="${d?.porcentaje>0}">
                                      <td><g:formatNumber number="${d?.porcentaje}" locale="es_AR"/>%</td>
                                    </g:if>
                                    <g:if test="${d?.porcentaje==0}">
                                      <td><g:formatNumber number="${d?.monto}" type="currency" locale="es_AR"/></td>
                                    </g:if>

                                    <td> <g:formatNumber number="${d.subTotal*-1}" type="currency" locale="es_AR"/></td>
                                </tr>
                            </g:each>
                            </table>
                            </span>
                        </li>


                </g:if>

                <g:if test="${ordenInstance?.notas}">
                        <li class="fieldcontain">
                            <span id="gasto-descripcion-label" class="property-label"><g:message code="gasto.descripcion.label" default="Descripción Gasto" /></span>

                            <span class="property-value" aria-labelledby="gasto-descripcion-label">
                                <table border="0">
                                    <tr><td>Tipo de Nota</td><td>Descripción Nota</td><td>Monto Bruto</td><td>Subtotal</td></tr>
                                    <g:each in="${ordenInstance.notas}" var="n">
                                        <tr>
                                            <td>${n?.tipo.name}</td>
                                            <td>${n?.descripcion}</td>
                                            <td><g:formatNumber number="${n?.monto}" type="currency" locale="es_AR"/></td>
                                            <td> <g:formatNumber number="${n?.monto}" type="currency" locale="es_AR"/></td>
                                        </tr>
                                    </g:each>
                                </table>
                            </span>
                        </li>


                </g:if>

                <li class="fieldcontain">
                        <span id="orden-ganancias-label" class="property-label"><g:message code="orden.ganancias.label" default="Total Ganancias" /></span>

                        <%--span class="property-value" aria-labelledby="cliente-label"><g:link controller="cliente" action="show" id="${ordenInstance?.cliente?.id}">${ordenInstance?.cliente?.encodeAsHTML()}</g:link></span--%>
                        <span class="property-value" aria-labelledby="orden-gananciaslabel">
                            <g:formatNumber number="${ordenInstance?.ganancias}" type="currency" locale="es_AR" />

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

                <g:if test="${ordenInstance?.ordenescompra}">
                    <li class="fieldcontain">
                        <span id="ordenescompra-label" class="property-label"><g:message code="orden.ordenescompra.label" default="Ordenes de Compra Generadas" /></span>

                        <span class="property-value" aria-labelledby="ordenescompra-label">
                            <table border="0">
                                <tr><td>Tipo de Orden</td><td>Número</td><td>Cliente</td><td>Total</td><td></td><td></td></tr>
                                <g:each in="${ordenInstance.ordenescompra}" var="oc">
                                    <tr>
                                        <td>${oc?.tipoOrden.name}</td>
                                        <td><g:formatNumber number="${oc?.numero}" format="00000000"/> </td>
                                        <td>${oc?.cliente?.razonSocial}</td>
                                        <td> <g:formatNumber number="${oc?.total}" type="currency" locale="es_AR"/></td>
                                        <td><g:link class="edit" action="edit" id="${oc?.id}">Editar</g:link></td>
                                        <td><g:link class="edit" action="imprimircomprobante" id="${oc?.id}">Imprimir</g:link></td>
                                    </tr>
                                </g:each>
                            </table>
                        </span>
                    </li>


                </g:if>



			</ol>
            </fieldset>
			<g:form>
				<fieldset class="buttons">
					<g:hiddenField name="id" value="${ordenInstance?.id}" />
					<g:link class="edit" action="edit" id="${ordenInstance?.id}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
