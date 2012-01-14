<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>Gallery Item: <c:out value="${item.name}"/></title>
<script type="text/javascript">
	require(["dojo/ready", 
	         "dojo/query",
	         "dojo/dom-style",
	         "dojo/_base/xhr",
	         "dojo/dom-attr"],
			function(ready, _query,_style, _xhr, _attr){
				ready(function(){
					var query = _query;
				});
			}
	);
</script>
</head>
<body>
	<div class="content">
		<h2>
			Item:
			<c:out default="" value="${item.name}" />
		</h2>
		<ul class="breadcrumbs">
			<li>Path:</li>
			<li><a href="<c:url value="/gallery"/>">Root</a></li>
			<c:forEach var="crumb" items="${breadcrumbs}">
				<li>&gt;</li>
				<li><a href="<c:url value="/gallery/album/${crumb.id}"/>"><c:out value="${crumb.name}" /></a></li>
			</c:forEach>
		</ul>
		<br />
		<img src="<c:url value="/gallery/item/${item.id}/main"/>"/>
	</div>
</body>
</html>