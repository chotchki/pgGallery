<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Gallery</title>
<style type="text/css">
	#uploader {
		display: inline;  /* Dojo 1.6/1.7 Bug Workaround */
	}
	.items li {
		height: <c:out value="${settings.thumbHeight + 30}"/>px;
		width: <c:out value="${settings.thumbWidth + 30}"/>px;
		display: inline-block;
	}
	.items img {
			display: block;
			margin-left: auto;
			margin-right: auto;
	}
	.items li > a:nth-child(3) {
		display: block;
		text-align: center;
	}
	.tools {
		position: relative;
		bottom: 15px;
		display: none;
	}
	.tools a:nth-child(1){
		float: left;
	}
	.tools a:nth-child(2){
		float: right;
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
		dojo.query(".items li").forEach(function(node, index, arr){
			dojo.connect(node, "onmouseenter", null, function(e){
				//dojo.style(e.currentTarget, "border", "1px solid #C0C3AC");
				dojo.query(".tools", e.currentTarget).forEach(function(node, index, arr){
					dojo.style(node, "display", "block");
				});
			});
			dojo.connect(node, "onmouseleave", null, function(e){
				//dojo.style(e.currentTarget, "border", "");
				dojo.query(".tools", e.currentTarget).forEach(function(node, index, arr){
					dojo.style(node, "display", "none");
				});
			});
		});
		dojo.query(".tools a").forEach(function(node,index,arr){
			dojo.connect(node, "onclick", null, function(e){
				e.preventDefault();
				var target = e.currentTarget;
				dojo.xhrPost({
	                url: dojo.attr(target, "href"),
	                handleAs: "json",
	                load: function(data) {
	                	var u = target;
	                	if(data.status == "success"){
	                		dojo.query("> img", target.parentNode.parentNode).forEach(function(node, index, arr){
	                			dojo.attr(node, "src",  dojo.attr(node, "src") + "?dummy=1");
	        				});
	                	}
	                },
	                error: function(error) {
	                	var u = "";
	                }
	            });
			})
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
				<li><a href="<c:url value="/gallery/album/${crumb.id}"/>"><c:out value="${crumb.name}" /></a></li>
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
				</div>
			</li>
			<li>
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
		<br />
		<ul class="items">
			<c:forEach var="a" items="${childAlbums}">
				<li>
					<a href="<c:url value="/gallery/album/${a.id}"/>">
						<img src="<c:url value="/gallery/album/${a.id}/thumb"/>" />
					</a><br />
					<a href="<c:url value="/gallery/album/${a.id}"/>">
						<c:out value="${a.name}" />
					</a>
				</li>
			</c:forEach>
			<c:forEach var="i" items="${childItems}">
				<li>
					<img src="<c:url value="/gallery/item/${i.id}/thumb"/>" />
					<span class="tools">
						<a href="<c:url value="/gallery/item/${i.id}/rotate/left"/>">
							<img src="<c:url value="/img/rotate_left_small.png"/>" alt="Rotate Left"/>
						</a>
						<a href="<c:url value="/gallery/item/${i.id}/rotate/right"/>">
							<img src="<c:url value="/img/rotate_right_small.png"/>" alt="Rotate Right"/>
						</a>
					</span>
				</li>
			</c:forEach>
		</ul>
	</div>
</body>
</html>