require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

require({cache:{
'dojox*mobile/compat':function(){
define(["dojo/_base/kernel", "dojo/_base/sniff"], function(dojo, sniff){
	dojo.getObject("mobile.compat", true, dojox);
	if(!sniff.isWebKit){
		require(["dojox/mobile/_compat"]);
	}
	return dojox.mobile.compat;
});

}}});

define("dojox/mobile/app/compat", ["dojo","dijit","dojox","dojox/mobile/compat"], function(dojo, dijit, dojox){
dojo.getObject("dojox.mobile.app.compat", 1);
/* builder delete begin
dojo.provide("dojox.mobile.app.compat");

 builder delete end */
/* builder delete begin
dojo.require("dojox.mobile.compat");


 builder delete end */
// summary:
//		CSS3 compatibility module for apps
// description:
//		This module provides support for some of the CSS3 features to djMobile
//		for non-CSS3 browsers, such as IE or Firefox.
//		If you load this module, it directly replaces some of the methods of
//		djMobile instead of subclassing. This way, html pages remains the same
//		regardless of whether this compatibility module is used or not.
//		Recommended usage is as follows. the code below loads dojox.mobile.compat
//		only when isWebKit is true.
//
//		dojo.require("dojox.mobile");
//		dojo.requireIf(!dojo.isWebKit, "dojox.mobile.appCompat");

dojo.extend(dojox.mobile.app.AlertDialog, {
	_doTransition: function(dir){
		console.log("in _doTransition and this = ", this);

		var h = dojo.marginBox(this.domNode.firstChild).h;

		var bodyHeight = this.controller.getWindowSize().h;
	
		var high = bodyHeight - h;
		var low = bodyHeight;

		var anim1 = dojo.fx.slideTo({
			node: this.domNode,
			duration: 400,
			top: {start: dir < 0 ? high : low, end: dir < 0 ? low: high}
		});

		var anim2 = dojo[dir < 0 ? "fadeOut" : "fadeIn"]({
			node: this.mask,
			duration: 400
		});
	
		var anim = dojo.fx.combine([anim1, anim2]);
	
		var _this = this;

		dojo.connect(anim, "onEnd", this, function(){
			if(dir < 0){
				_this.domNode.style.display = "none";
				dojo.destroy(_this.domNode);
				dojo.destroy(_this.mask);
			}
		});
		anim.play();
	}
});

dojo.extend(dojox.mobile.app.List, {
	deleteRow: function(){
		console.log("deleteRow in compat mode", row);
	
		var row = this._selectedRow;
		// First make the row invisible
		// Put it back where it came from
		dojo.style(row, {
			visibility: "hidden",
			minHeight: "0px"
		});
		dojo.removeClass(row, "hold");
	
	
		// Animate reducing it's height to zero, then delete the data from the
		// array
		var height = dojo.contentBox(row).h;
		dojo.animateProperty({
				node: row,
				duration: 800,
				properties: {
				height: {start: height, end: 1},
				paddingTop: {end: 0},
				paddingBottom: {end: 0}
			},
			onEnd: this._postDeleteAnim
		}).play();
	}
});

if(dojox.mobile.app.ImageView && !dojo.create("canvas").getContext){
	dojo.extend(dojox.mobile.app.ImageView, {
		buildRendering: function(){
			this.domNode.innerHTML =
				"ImageView widget is not supported on this browser."
				+ "Please try again with a modern browser, e.g. "
				+ "Safari, Chrome or Firefox";
			this.canvas = {};
		},
		
		postCreate: function(){}
	});
}

if(dojox.mobile.app.ImageThumbView){
	dojo.extend(dojox.mobile.app.ImageThumbView, {
		place: function(node, x, y){
			dojo.style(node, {
				top: y + "px",
				left: x + "px",
				visibility: "visible"
			});
		}
	})
}

return dojo.getObject("dojox.mobile.app.compat");});
require(["dojox/mobile/app/compat"]);