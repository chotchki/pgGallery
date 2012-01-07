<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
	<head>
		<title>Registration Page</title>
		<script type="text/javascript">
		require(["dijit/form/Form",
		         "dijit/form/Button",
		         "dijit/form/ValidationTextBox"
		         ]);
		require(["pgGallery/Focus"],function(f){f.focus("username")});
		</script>
	</head>
	<body>
		<div class="content">
			<h2>New User Registration</h2>
			<form data-dojo-type="dijit.form.Form" id="registerForm" data-action="<c:url value="/register"/> " method="POST">
	            <table>
	                <tr>
	                    <td>
	                        <label for="username">Username:</label>
	                    </td>
	                    <td>
	                        <input type="text" id="username" name="user.username" required="required" data-dojo-type="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                    <td>
	                        <label for="password">Password:</label>
	                    </td>
	                    <td>
	                         <input type="password" id="password" name="user.password" required="required" data-dojo-type="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                    <td>
	                        <label for="retypePassword">Retype Password:</label>
	                    </td>
	                    <td>
	                         <input type="password" id="retypePassword" name="retypePassword" required="required" data-dojo-type="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                	<td><button data-dojo-type="dijit.form.Button" type="submit">Register</button></td>
	                </tr>
	            </table>
        	</form>     
		</div>
	</body>
</html>