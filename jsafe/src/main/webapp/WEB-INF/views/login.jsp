<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="l" uri="/WEB-INF/tld/link.tld" %>
<html>
	<head>
		<title>Login Page</title>
		<script type="text/javascript">
        	dojo.require("dijit.form.Form");
        	dojo.require("dijit.form.Button");
        	dojo.require("dijit.form.ValidationTextBox");
		</script>
		<style>
			#loginForm table {
				margin-top: 10px;
			}
			#loginForm td {
				padding: 2px;
			}
		</style>
	</head>
	<body>
		<div class="content">
			<h2>Login</h2>
			<p class="error"></p>
			<div dojoType="dijit.form.Form" id="loginForm" jsId="loginForm" encType="multipart/form-data" action="<l:ink>/j_spring_security_check</l:ink>" method="POST">
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
	            </table>
	            <button dojoType="dijit.form.Button" type="submit" name="submitButton" value="Submit">
	                Login
	            </button>
        	</div>
		</div>
	</body>
</html>