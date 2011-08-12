<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>Chotchki.us: <sitemesh:write property="title" /></title>
		<script src="<c:url value="/js/dojo-release-1.6.1/dojo/dojo.js"/>" type="text/javascript" djConfig="parseOnLoad:true"></script>
		<script type="text/javascript">
			dojo.require("dijit.layout.BorderContainer");
			dojo.require("dijit.layout.ContentPane");
		</script>
		<link rel="stylesheet" href="<c:url value="/styles/style.css"/> " />
		<link rel="stylesheet" href="<c:url value="/js/dojo-release-1.6.1/dijit/themes/tundra/tundra.css"/>" />


		<sitemesh:write property="head" />
	</head>
	<body class="tundra">
		<div class="footer-push-container">
			<div class="top-links">
				<ul>
					<sec:authorize access="isAuthenticated()">
						<li><a href="<c:url value="/profile"/> " >Profile</a></li>
						<li><a href="<c:url value="/j_spring_security_logout"/> " >Logout</a></li>
					</sec:authorize>
					<sec:authorize access="!isAuthenticated()">
						<li><a href="<c:url value="/register"/> " >Register</a></li>
						<li><a href="<c:url value="/login"/> " >Login</a></li>
					</sec:authorize>
				</ul>
			</div>
			<div class="header">
				<div class="title">
					<h1><a href="<c:url value="/"/> " >Chotchki.us</a></h1>
				</div>
			</div>
			<div class="content-container">
				<div class="content-bar">
					<sitemesh:write property="body" />
				</div>
				<div class="side-bar">
					<div class="side-bar-box">
						<h3>Applications</h3>
						<ul>
							<li>Blog</li>
							<li>Password Manager</li>
							<li>Photo Gallery</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-push">
			<div class="footer">
				Copyright &copy; <a href="http://www.chotchki.us" >Christopher Hotchkiss</a> - Colors and Design based on the <a href="http://pressplaying.com">PressPlay Theme</a>. 
			</div>
		</div>
	</body>
</html>