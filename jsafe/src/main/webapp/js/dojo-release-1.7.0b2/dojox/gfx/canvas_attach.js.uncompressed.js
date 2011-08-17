require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/gfx/canvas_attach", ["dojox/gfx/canvas"], function(){
	dojo.getObject("dojox.gfx.canvas_attach", true);
	dojo.experimental("dojox.gfx.canvas_attach");

	// not implemented
	dojox.gfx.canvas.attachSurface = dojox.gfx.canvas.attachNode = function(){
		return null;	// for now
	};

	return dojox.gfx.canvas;
});
