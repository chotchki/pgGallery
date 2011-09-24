<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Gallery</title>
<style type="text/css">
	#uploader {
		display: inline;  /* Dojo 1.6/1.7 Bug Workaround */
	}
	.content ul.items li {
		height: <c:out value="${settings.thumbHeight}"/>px;
		width: <c:out value="${settings.thumbWidth}"/>px;
		display: inline-block;
	}
	.tools {
		display: none;
	}
</style>
<script type="text/javascript">
	dojo.require("dijit.form.Form");
	dojo.require("dijit.form.Button");
	dojo.require("dijit.Dialog");
	dojo.require("dijit.form.TextBox");
	dojo.require("dijit.form.CheckBox");
	dojo.require("dojox.form.Uploader");
	dojo.require("dojox.form.uploader.plugins.HTML5");
	
	dojo.ready(function(){
		dojo.query(".items .image").forEach(function(node, index, arr){
			dojo.connect(node, "onmouseenter", function(e){
				dojo.byId("> .tools", e.target).forEach(function(node, index, arr){
					dojo.style(node, "display", "block");
				});
			});
			dojo.connect(node, "onmouseleave", function(e){
				dojo.byId("> .tools", e.target).forEach(function(node, index, arr){
					dojo.style(node, "display", "none");
				});
			});
		});
	});
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
		<ul class="items">
			<c:forEach var="a" items="${childAlbums}">
				<li><a href="<c:url value="/gallery/album/${a.id}"/>"><c:out value="${a.name}" /></a></li>
			</c:forEach>
			<c:forEach var="i" items="${childItems}">
				<li>
					<div class="image">
						<img src="<c:url value="/gallery/item/${i.id}/thumb"/>" />
						<span class="tools"><a href="/item/${i.id}/rotate/left">Left</a><a href="/item/${i.id}/rotate/right">Right</a></span>
					</div>
				</li>
			</c:forEach>
			<li>
				<div dojoType="dijit.form.DropDownButton">
					<span>New Album</span>
					<div dojoType="dijit.TooltipDialog">
						<div dojoType="dijit.form.Form" action="<c:url value="/gallery/album/create"/>" method="POST">
							<label for="name"> Name:</label><input dojoType="dijit.form.TextBox" id="name" name="name">
							<input id="isPublic" name="isPublic" dojoType="dijit.form.CheckBox" value="true" /><label for="isPublic">Public?</label>
							<input dojoType="dijit.form.TextBox" type="hidden" name="parentId" value="<c:out value="${currentAlbum.id}"/>" />
							<button dojoType="dijit.form.Button" type="submit">Create</button>
						</div>
					</div>
				</div><br />
				<div dojoType="dijit.form.DropDownButton">
					<span>Upload Items</span>
					<div dojoType="dijit.TooltipDialog">
						<div dojoType="dijit.form.Form" enctype="multipart/form-data" action="<c:url value="/gallery/item/upload"/>" method="POST">
							<input name="item" multiple="true" type="file" dojoType="dojox.form.Uploader" label="Select Some Files" id="uploader" />
							<input dojoType="dijit.form.TextBox" type="hidden" name="parentId" value="<c:out value="${currentAlbum.id}"/>" />
							<input dojoType="dijit.form.Button" type="submit" label="Upload" />
						</div>
				</div>
			</li>
		</ul>
	</div>
</body>
</html>