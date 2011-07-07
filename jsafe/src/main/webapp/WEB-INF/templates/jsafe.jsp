<!DOCTYPE html>
<html>
	<head>
		<title>JSafe: <sitemesh:write property="title" /></title>
		<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.6.0/dojo/dojo.xd.js" type="text/javascript" djConfig="parseOnLoad:true"></script>
		<script type="text/javascript">
			dojo.require("dijit.layout.BorderContainer");
			dojo.require("dijit.layout.ContentPane");
		</script>
		<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/dojo/1.6/dijit/themes/claro/claro.css" />
		<style type="text/css">
            html, body { width: 100%; height: 100%; margin: 0; }
        </style>
		<sitemesh:write property="head" />
	</head>
	<body class="claro">
		<div dojoType="dijit.layout.BorderContainer" style="width: 100%; height: 100%">
			<sitemesh:write property="body" />
		</div>
	</body>
</html>