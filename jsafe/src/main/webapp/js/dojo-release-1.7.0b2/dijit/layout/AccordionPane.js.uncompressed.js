require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/layout/AccordionPane", [
	"dojo/_base/kernel", // dojo.deprecated
	"..",
	"./ContentPane",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit){

	// module:
	//		dijit/layout/AccordionPane
	// summary:
	//		Deprecated widget.   Use `dijit.layout.ContentPane` instead.

	dojo.declare("dijit.layout.AccordionPane", dijit.layout.ContentPane, {
		// summary:
		//		Deprecated widget.   Use `dijit.layout.ContentPane` instead.
		// tags:
		//		deprecated

		constructor: function(){
			dojo.deprecated("dijit.layout.AccordionPane deprecated, use ContentPane instead", "", "2.0");
		},

		onSelected: function(){
			// summary:
			//		called when this pane is selected
		}
	});


	return dijit.layout.AccordionPane;
});
