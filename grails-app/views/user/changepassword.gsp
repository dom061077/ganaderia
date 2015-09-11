<%@ page import="com.rural.ganaderia.seguridad.User" %>
<!doctype html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'user.label', default: 'User')}" />
		<title>Cambiar Contraseña</title>
	</head>
	<body>

		<div id="edit-user" class="content scaffold-edit" role="main">
			<h1>Cambio de Contraseña</h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<g:hasErrors bean="${userInstance}">
			<ul class="errors" role="alert">
				<g:eachError bean="${userInstance}" var="error">
				<li <g:if test="${error in org.springframework.validation.FieldError}">data-field-id="${error.field}"</g:if>><g:message error="${error}"/></li>
				</g:eachError>
			</ul>
			</g:hasErrors>
			<g:form method="post" >
				<g:hiddenField name="id" value="${userInstance?.id}" />

				<fieldset class="form">
					<g:render template="formpasswd"/>
				</fieldset>
				<fieldset class="buttons">
					<g:actionSubmit class="save" action="updatepassword" value="${message(code: 'default.button.update.label', default: 'Confirmar Cambio')}" />
                    <g:actionSubmit class="save" action="cancelar" value="${message(code: 'default.button.cancel.label', default: 'Cancelar')}" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
