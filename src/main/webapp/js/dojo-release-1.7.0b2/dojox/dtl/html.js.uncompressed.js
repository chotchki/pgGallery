require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/dtl/html", ["dojo/_base/kernel","./dom"], function(dojo,ddd){
	dojo.getObject("dtl.html", true, dojox);

	dojo.deprecated("dojox.dtl.html", "All packages and classes in dojox.dtl that start with Html or html have been renamed to Dom or dom");
	dojox.dtl.HtmlTemplate = ddd.DomTemplate;
	return dojox.dtl.html;
});