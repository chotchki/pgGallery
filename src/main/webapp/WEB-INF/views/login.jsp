<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Login Page</title>
		<script type="text/javascript">
        	dojo.require("dijit.form.Form");
        	dojo.require("dijit.form.Button");
        	dojo.require("dijit.form.ValidationTextBox");
		</script>
		<c:set value="${SPRING_SECURITY_LAST_EXCEPTION.message}" var="error"/>
	</head>
	<body>
		<div class="content">
			<h2>Login</h2>
			<div dojoType="dijit.form.Form" id="loginForm" jsId="loginForm" action="<c:url value="/j_spring_security_check" /> " method="POST">
	            <table>
	                <tr>
	                    <td>
	                        <label for="j_username">Username:</label>
	                    </td>
	                    <td>
	                        <input type="text" id="j_username" name="j_username" required="true" dojoType="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                    <td>
	                        <label for="j_password">Password:</label>
	                    </td>
	                    <td>
	                         <input type="password" id="j_password" name="j_password" required="true" dojoType="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                	<td><button dojoType="dijit.form.Button" type="submit">Login</button></td>
	                </tr>
	            </table>
        	</div>
		</div>
	</body>
</html>