require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/_base/window", [
	"dojo/_base/kernel",
	"..",
	"dojo/window" // dojo.window.get
], function(dojo, dijit){
	// module:
	//		dijit/_base/window
	// summary:
	//		Back compatibility module, new code should use dojo/window directly instead of using this module.

	dijit.getDocumentWindow = function(doc){
		return dojo.window.get(doc);
	};

	return dijit;
});
