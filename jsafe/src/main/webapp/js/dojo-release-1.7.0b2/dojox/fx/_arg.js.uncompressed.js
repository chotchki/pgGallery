require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/fx/_arg", ["."],function(){
dojox.fx._arg.StyleArgs = function(/*Object*/ args){
	// summary:
	//		The node and CSS class to use for style manipulations.
	// node: DOMNode
	//		The node to manipulate
	// cssClass: String
	//		The class to use during the manipulation
	this.node = args.node;
	this.cssClass = args.cssClass;
}

dojox.fx._arg.ShadowResizeArgs = function(/*Object*/ args){
	// summary:
	//	The odd way to document object parameters.
	// x: Integer
	//	the width to set
	// y: Integer
	//	the height to set
	this.x = args.x;
	this.y = args.y;
}

return {
	StyleArgs: dojox.fx._arg.StyleArgs,
	ShadowResizeArgs: dojox.fx._arg.ShadowResizeArgs};

});