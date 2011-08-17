require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/_base/scroll", [
	"dojo/_base/kernel",
	"..",
	"dojo/window" // dojo.window.scrollIntoView
], function(dojo, dijit){
	// module:
	//		dijit/_base/scroll
	// summary:
	//		Back compatibility module, new code should use dojo/window directly instead of using this module.

	dijit.scrollIntoView = function(/*DomNode*/ node, /*Object?*/ pos){
		// summary:
		//		Scroll the passed node into view, if it is not already.
		//		Deprecated, use `dojo.window.scrollIntoView` instead.

		dojo.window.scrollIntoView(node, pos);
	};

	return dijit.scrollIntoView;
});
