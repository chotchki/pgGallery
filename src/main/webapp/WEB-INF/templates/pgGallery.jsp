<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>pgGallery: <sitemesh:write property="title" /></title>
		<script type="text/javascript">
		var dojoConfig = {
			async: true,
			parseOnLoad: true,
			packages: [
			    {
			        name: "pgGallery",
			        location: "<%=request.getContextPath()%>/js"
			    }
			]
		};
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js" type="text/javascript"></script>
		<script type="text/javascript">
			require(["pgGallery/NoFlicker"], function(n){
				n.show(".content");
			});
		</script>
		
		<c:if test="${not empty error}">
		<script type="text/javascript">
			require(["pgGallery/Message"], function(m){
				m.error("${error}");
			});
		</script>
		</c:if>
		<c:if test="${not empty success}">
		<script type="text/javascript">
			require(["pgGallery/Message"], function(m){
				m.success("${success}");
			});
		</script>
		</c:if>
		<link rel="stylesheet" href="<c:url value="https://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dijit/themes/tundra/tundra.css"/>" />
		<link rel="stylesheet" href="<c:url value="/styles/style.css"/> " />
		
		<sitemesh:write property="head" />
	</head>
	<body class="tundra">
		<div class="footer-push-container">
			<div id="message" style="display: none;">
			</div>
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
					<h1><a href="<c:url value="/"/> " >pgGallery</a></h1>
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
							<li><a href="<c:url value="/gallery"/>">Photo Gallery</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-push">
			<div class="footer">
				This is an installation of <a href="https://github.com/chotchki/pgGallery">pgGallery</a> - Created and Copyright &copy; <a href="http://www.chotchki.us" >Christopher Hotchkiss</a><br /> Colors and Design based on the <a href="http://pressplaying.com">PressPlay Theme</a>.  
			</div>
		</div>
	</body>
</html>