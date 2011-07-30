<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Registration Page</title>
		<script type="text/javascript">
        	dojo.require("dijit.form.Form");
        	dojo.require("dijit.form.Button");
        	dojo.require("dijit.form.ValidationTextBox");
		</script>
	</head>
	<body>
		<div class="content">
			<h2>New User Registration</h2>
			<div dojoType="dijit.form.Form" id="registerForm" jsId="registerForm" action="<c:url value="/register"/> " method="POST">
	            <table>
	                <tr>
	                    <td>
	                        <label for="username">Username:</label>
	                    </td>
	                    <td>
	                        <input type="text" id="username" name="user.username" required="true" dojoType="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                    <td>
	                        <label for="password">Password:</label>
	                    </td>
	                    <td>
	                         <input type="password" id="password" name="user.password" required="true" dojoType="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                    <td>
	                        <label for="retypePassword">Retype Password:</label>
	                    </td>
	                    <td>
	                         <input type="password" id="retypePassword" name="retypePassword" required="true" dojoType="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                	<td><button dojoType="dijit.form.Button" type="submit">Register</button></td>
	                	<td><p class="error"><c:out value="${error}"/></p></td>
	                </tr>
	            </table>
        	</div>     
		</div>
	</body>
</html>