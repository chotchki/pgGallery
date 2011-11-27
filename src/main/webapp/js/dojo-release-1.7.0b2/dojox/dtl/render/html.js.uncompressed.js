require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/dtl/render/html", ["dojo/_base/kernel","dojo/_base/lang","../render/dom","dojo/_base/html","dojo/_base/kernel"], function(dojo,lang,ddrd){
	dojo.getObject("dtl.render.html", true, dojox);

	dojox.dtl.render.html.Render = ddrd.Render;
	return dojox.dtl.render.html;
});