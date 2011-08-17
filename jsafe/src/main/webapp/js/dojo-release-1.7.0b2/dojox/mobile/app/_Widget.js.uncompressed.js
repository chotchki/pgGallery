require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/app/_Widget", ["dojo","dijit","dojox","dijit/_WidgetBase"], function(dojo, dijit, dojox){
dojo.getObject("dojox.mobile.app._Widget", 1);
/* builder delete begin
dojo.provide("dojox.mobile.app._Widget");

 builder delete end */
dojo.experimental("dojox.mobile.app._Widget");

/* builder delete begin
dojo.require("dijit._WidgetBase");


 builder delete end */
dojo.declare("dojox.mobile.app._Widget", dijit._WidgetBase, {
	// summary:
	//		The base mobile app widget.

	getScroll: function(){
		// summary:
		//		Returns the scroll position.
		return {
			x: dojo.global.scrollX,
			y: dojo.global.scrollY
		};
	},

	connect: function(target, event, fn){
		if(event.toLowerCase() == "dblclick"
			|| event.toLowerCase() == "ondblclick"){

			if(dojo.global["Mojo"]){
				// Handle webOS tap event
				return this.connect(target, Mojo.Event.tap, fn);
			}
		}
		return this.inherited(arguments);
	}
});
return dojo.getObject("dojox.mobile.app._Widget");});
require(["dojox/mobile/app/_Widget"]);
