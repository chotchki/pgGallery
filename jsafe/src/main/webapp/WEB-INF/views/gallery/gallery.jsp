<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Gallery</title>
<style type="text/css">
</style>
<script type="text/javascript">
	dojo.require("dijit.form.Form");
	dojo.require("dijit.form.Button");
	dojo.require("dijit.Dialog");
	dojo.require("dijit.form.TextBox");
	dojo.require("dijit.form.CheckBox");
</script>
</head>
<body>
	<div class="content">
		<h2>
			Album:
			<c:out default="Root" value="${currentAlbum.name}" />
		</h2>
		<ul class="breadcrumbs">
			<li>Path:</li>
			<li><a href="<c:url value="/gallery"/>">Root</a></li>
			<c:forEach var="crumb" items="${breadcrumbs}">
				<li>&gt;</li>
				<li><a href="<c:url value="/gallery/${crumb.id}"/>"><c:out value="${crumb.name}" /></a></li>
			</c:forEach>
		</ul>
		<br />
		<ul>
			<c:forEach var="a" items="${childAlbums}">
				<li><a href="<c:url value="/gallery/${a.id}"/>"><c:out value="${a.name}" /></a></li>
			</c:forEach>
			<c:forEach var="i" items="${childItems}">

			</c:forEach>
			<li>
				<div dojoType="dijit.form.DropDownButton">
					<span>New Album</span>
					<div dojoType="dijit.TooltipDialog">
						<div dojoType="dijit.form.Form" action="<c:url value="/gallery/create"/>" method="POST">
						<label for="name"> Name:</label><input dojoType="dijit.form.TextBox" id="name" name="name">
						<input id="isPublic" name="isPublic" dojoType="dijit.form.CheckBox" value="true" /><label for="isPublic">Public?</label>
						<input dojoType="dijit.form.TextBox" type="hidden" name="parentId" value="<c:out value="${currentAlbum.id}"/>" />
						<button dojoType="dijit.form.Button" type="submit">Create</button>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</body>
</html>