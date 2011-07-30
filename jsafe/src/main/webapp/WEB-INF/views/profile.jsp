<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
	<head>
		<title>Profile Page</title>
		<script type="text/javascript">
        	dojo.require("dijit.form.Form");
        	dojo.require("dijit.form.Button");
        	dojo.require("dijit.form.ValidationTextBox");
		</script>
		<style>
			.content p {
				margin: 2px;
				padding-bottom: 5px;
			}
		</style>
	</head>
	<body>
		<div class="content">
			<p>Logged in as: <c:out value="${username}" /></p>
			
			<h2>Change Your Password</h2>
			<div dojoType="dijit.form.Form" id="changePassForm" action="<c:url value="/profile" /> " method="POST">
	            <table>
	                <tr>
	                    <td>
	                        <label for="username">Current Password:</label>
	                    </td>
	                    <td>
	                        <input type="password" name="currentPassword" required="true" dojoType="dijit.form.ValidationTextBox"/>
	                    </td>
	                </tr>
	                <tr>
	                    <td>
	                        <label for="password">New Password:</label>
	                    </td>
	                    <td>
	                         <input type="password" name="newPassword" required="true" dojoType="dijit.form.ValidationTextBox"/>
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
	                	<td><button dojoType="dijit.form.Button" type="submit">Change Password</button></td>
	                	<td><p class="error"><c:out value="${error}"/></p><p class="success"><c:out value="${success}"/></p></td>
	                </tr>
	            </table>
        	</div>     
		</div>
	</body>
</html>