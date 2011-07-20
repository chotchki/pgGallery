<!DOCTYPE html>
<html>
	<head>
		<title>Chotchki.us: <sitemesh:write property="title" /></title>
		<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.6.0/dojo/dojo.xd.js" type="text/javascript" djConfig="parseOnLoad:true"></script>
		<script type="text/javascript">
			dojo.require("dijit.layout.BorderContainer");
			dojo.require("dijit.layout.ContentPane");
		</script>
		<link rel="stylesheet" href="<%=request.getContextPath() %>/styles/style.css" />
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.6/dijit/themes/tundra/tundra.css" />


		<sitemesh:write property="head" />
	</head>
	<body class="tundra">
		<div class="footer-push-container">
			<div class="top-links">
				<ul>
					<li><a href="<%=request.getContextPath() %>/login">Login</a></li>
				</ul>
			</div>
			<div class="header">
				<div class="title">
					<h1><a href="<%=request.getContextPath() %>">Chotchki.us</a></h1>
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