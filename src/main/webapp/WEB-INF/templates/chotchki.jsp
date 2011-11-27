<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>Chotchki.us: <sitemesh:write property="title" /></title>
		<script src="<c:url value="/js/dojo-release-1.7.0b2/dojo/dojo.js"/>" type="text/javascript" djConfig="parseOnLoad:true"></script>
		<link rel="stylesheet" href="<c:url value="/styles/style.css"/> " />
		<link rel="stylesheet" href="<c:url value="/js/dojo-release-1.7.0b2/dijit/themes/tundra/tundra.css"/>" />
		<script type="text/javascript">
			dojo.require("dojo.fx");
			//This function adds a sucess / error message to the message bar
			dojo.ready(function(){
				function add_message(new_content, css_class){
					dojo.empty("message");
					var n = dojo.create("p", {class: css_class, innerHTML: new_content }, "message");
					var c = dojo.create("a", {href: "#", innerHTML: "close"}, "message");
		            var wipeArgs = {
		                node: "message"
		            };
		            dojo.connect(dojo.byId("message"), "onclick", null, function(){
		            	var args = wipeArgs;
		            	dojo.fx.wipeOut(args).play();
		            });
		            dojo.fx.wipeIn(wipeArgs).play();
				}
				function add_error_message(content){
					add_message(content, "error");	
				}
				function add_success_message(content){
					add_message(content, "error");	
				}
			});
		</script>
		
		<sitemesh:write property="head" />
	</head>
	<body class="tundra">
		<div class="footer-push-container">
			<div id="message" style="display: none;">
				<p class="error"><c:out value="${error}"/></p>
				<p class="success"><c:out value="${success}"/></p>
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
							<li><a href="<c:url value="/gallery"/>">Photo Gallery</a></li>
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