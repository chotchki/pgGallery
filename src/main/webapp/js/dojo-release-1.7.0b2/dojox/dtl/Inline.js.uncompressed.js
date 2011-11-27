require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/dtl/Inline", ["dojo/_base/kernel","dojo/_base/lang","./_base","dijit/_Widget"], function(dojo,lang,dd,djw){

	dd.Inline = dojo.extend(function(args, node){
		this.create(args, node);
	},
	djw.prototype,
	{
		context: null,
		render: function(/*Object|dojox.dtl.Context?*/ context){
			this.context = context || this.context;
			this.postMixInProperties();
			dojo.query("*", this.domNode).orphan();
			this.domNode.innerHTML = this.template.render(this.context);
		},
		declaredClass: "dojox.dtl.Inline",
		buildRendering: function(){
			var div = this.domNode = document.createElement("div");
			var node = this.srcNodeRef;
			if(node.parentNode){
				node.parentNode.replaceChild(div, node);
			}

			this.template = new dd.Template(dojo.trim(node.text), true);
			this.render();
		},
		postMixInProperties: function(){
			this.context = (this.context.get === dd._Context.prototype.get) ? this.context : new dd._Context(this.context);
		}
	});
	return dojox.dtl.Inline;
});