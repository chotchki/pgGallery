require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/RoundRect", ["dijit/_WidgetBase", "dijit/_Contained","dijit/_Container"], function(WidgetBase,Contained,Container){
	// module:
	//		dojox/mobile/RoundRect
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.RoundRect", [dijit._WidgetBase, dijit._Container,dijit._Contained], {

		shadow: false,

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement("DIV");
			this.domNode.className = this.shadow ? "mblRoundRect mblShadow" : "mblRoundRect";
		},

		resize: function(){
			dojo.forEach(this.getChildren(), function(child){
				if(child.resize){ child.resize(); }
			});
		}
	});
});
