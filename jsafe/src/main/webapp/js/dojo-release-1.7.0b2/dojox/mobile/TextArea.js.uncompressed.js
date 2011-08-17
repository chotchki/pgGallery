require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/TextArea", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/html","./TextBox"],
	function(dojo, declare, dhtml, TextBox){

	return dojo.declare("dojox.mobile.TextArea",dojox.mobile.TextBox,{
		// summary:
		//		Non-templated TEXTAREA widget.
		//
		// description:
		//		A textarea widget that wraps an HTML TEXTAREA element.
		//		Takes all the parameters (name, value, etc.) that a vanilla textarea takes.
		//
		// example:
		// |	<textarea dojoType="dojox.mobile.TextArea">...</textarea>

		baseClass: "mblTextArea",

		postMixInProperties: function(){
			 // Copy value from srcNodeRef, unless user specified a value explicitly (or there is no srcNodeRef)
			// TODO: parser will handle this in 2.0
			if(!this.value && this.srcNodeRef){
				this.value = this.srcNodeRef.value;
			}
			this.inherited(arguments);
		},

		buildRendering: function(){
			if(!this.srcNodeRef){
				this.srcNodeRef = dojo.create("textarea", {});
			}
			this.inherited(arguments);
		}
	});
});
