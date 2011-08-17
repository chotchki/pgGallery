require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/FixedSplitterPane", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/html", "dojo/_base/array", "dijit/_WidgetBase", "dijit/_Container", "dijit/_Contained"],
	function(dojo, declare, dhtml, darray, WidgetBase, Container, Contained){
	return dojo.declare("dojox.mobile.FixedSplitterPane",[dijit._WidgetBase,dijit._Container,dijit._Contained],{
		buildRendering: function(){
			this.inherited(arguments);
			dojo.addClass(this.domNode, "mblFixedSplitterPane");
		},

		resize: function(){
			dojo.forEach(this.getChildren(), function(child){
				if(child.resize){ child.resize(); }
			});
		}
	});
});
