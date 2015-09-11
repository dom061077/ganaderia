<%@ page import="com.rural.ganaderia.seguridad.User" %>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'username', 'error')}">
    <label for="username">
        <g:message code="user.username.label" default="Nombre de usuario:" />
    </label>
    <g:fieldValue bean="${userInstance}" field="username"/>
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'username', 'error')} required">
    <label for="oldpassword">
        <g:message code="user.username.label" default="Contraseña actual:" />
    </label>
    <input type="password" name="oldpassword"/>
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'username', 'error')} required">
    <label for="newpassword">
        <g:message code="user.username.label" default="Nueva contraseña:" />
    </label>
    <input type="password" name="newpassword"/>
</div>

<div class="fieldcontain ${hasErrors(bean: userInstance, field: 'username', 'error')} required">
    <label for="repeatpassword">
        <g:message code="user.username.label" default="Repita Nueva Contraseña:" />
    </label>
    <input type="password" name="repeatpassword"/>
</div>