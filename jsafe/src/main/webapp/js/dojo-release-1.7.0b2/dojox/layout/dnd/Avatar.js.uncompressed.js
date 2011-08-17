require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/layout/dnd/Avatar", ["dojo","dijit","dojox","dojo/dnd/Avatar","dojo/dnd/common"], function(dojo, dijit, dojox){
dojo.getObject("dojox.layout.dnd.Avatar", 1);
/* builder delete begin
dojo.provide("dojox.layout.dnd.Avatar");


 builder delete end */
/* builder delete begin
dojo.require("dojo.dnd.Avatar");

 builder delete end */
/* builder delete begin
dojo.require("dojo.dnd.common");


 builder delete end */
dojo.declare("dojox.layout.dnd.Avatar", dojo.dnd.Avatar, {
	// summary:
	//      An Object, which represents the object being moved in a GridContainer
	constructor: function(manager, opacity){
		this.opacity = opacity || 0.9;
	},

	construct: function(){
		// summary:
		//		A constructor function. it is separate so it can be (dynamically)
		//		overwritten in case of need.
		
		var source = this.manager.source,
			node = source.creator ?
				// create an avatar representation of the node
				source._normalizedCreator(source.getItem(this.manager.nodes[0].id).data, "avatar").node :
				// or just clone the node and hope it works
				this.manager.nodes[0].cloneNode(true)
		;

		dojo.addClass(node, "dojoDndAvatar");
		
		node.id = dojo.dnd.getUniqueId();
		node.style.position = "absolute";
		node.style.zIndex = 1999;
		node.style.margin = "0px"
		node.style.width = dojo.marginBox(source.node).w + "px"
		
		// add contructor object params to define it
		dojo.style(node, "opacity", this.opacity);
		this.node = node;
	},

	update: function(){
		// summary: Updates the avatar to reflect the current DnD state.
		dojo.toggleClass(this.node, "dojoDndAvatarCanDrop", this.manager.canDropFlag);
	},

	_generateText: function(){ /* nada. */ }

});

return dojo.getObject("dojox.layout.dnd.Avatar");});
require(["dojox/layout/dnd/Avatar"]);
