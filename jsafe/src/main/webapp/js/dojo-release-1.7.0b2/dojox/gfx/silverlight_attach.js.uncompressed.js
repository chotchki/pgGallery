require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/gfx/silverlight_attach", ["./silverlight"], function(){
	dojo.getObject("dojox.gfx.silverlight_attach", true);
	dojo.experimental("dojox.gfx.silverlight_attach");
	var g = dojox.gfx, sl = g.silverlight;
	
	sl.attachNode = function(node){
		// summary: creates a shape from a Node
		// node: Node: an Silverlight node
		return null;	// not implemented
	};

	sl.attachSurface = function(node){
		// summary: creates a surface from a Node
		// node: Node: an Silverlight node
		return null;	// dojox.gfx.Surface
	};
	
	return sl; // return augmented silverlight api
});
