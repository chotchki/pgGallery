<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<title>pgGallery: <sitemesh:write property="title" /></title>
		<script src="<c:url value="https://ajax.googleapis.com/ajax/libs/dojo/1.7.0/dojo/dojo.js"/>" type="text/javascript" data-dojo-config="async:true,parseOnLoad:true"></script>
		<link rel="stylesheet" href="<c:url value="https://ajax.googleapis.com/ajax/libs/dojo/1.7.0/dijit/themes/tundra/tundra.css"/>" />
		<link rel="stylesheet" href="<c:url value="/styles/style.css"/> " />
		<script type="text/javascript">
			require([
			    "dojo/dom",
			    "dojo/parser",
			    "dojo/fx"], function(empty,create,connect,fx,dom,ready){
				//This function adds a sucess / error message to the message bar
				dojo.ready(function(){
					function add_message(new_content, css_class){
						empty("message");
						var n = create("p", {class: css_class, innerHTML: new_content }, "message");
						var c = create("a", {href: "#", innerHTML: "close"}, "message");
		    	        var wipeArgs = {
		    	            node: "message"
		    	        };
		    	        connect(dom.byId("message"), "onclick", null, function(){
		    	        	var args = wipeArgs;
		    	        	fx.wipeOut(args).play();
		    	        });
		    	        fx.wipeIn(wipeArgs).play();
					}
					function add_error_message(content){
						add_message(content, "error");	
					}
					function add_success_message(content){
						add_message(content, "error");	
					}
				});
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