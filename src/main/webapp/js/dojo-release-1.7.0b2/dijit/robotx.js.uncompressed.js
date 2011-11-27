require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/robotx", [
	"dojo/_base/kernel", // dojo.experimental dojo.mixin
	".",
	"./robot",
	"dojo/robotx",
	"dojo/_base/window" // dojo.global
], function(dojo, dijit_){

	// module:
	//		dijit/robotx
	// summary:
	//		Code needed by robot test harness


	//WARNING: This module depends on GLOBAL dijit being set for v1.5 code; therefore the lexical variable that
	//references "dijit" has been renamed to "dijit_"

	dojo.experimental("dijit.robotx");

	var __updateDocument = doh.robot._updateDocument;

	dojo.mixin(doh.robot,{
		_updateDocument: function(){
			__updateDocument();
			var win = dojo.global;
			if(win["dijit"]){
				window.dijit = win.dijit; // window reference needed for IE
			}
		}
	});

	return dijit_;
});
