require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/CheckBox", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/html", "./ToggleButton", "dijit/form/_CheckBoxMixin"],
	function(dojo, declare, dhtml, ToggleButton, CheckBoxMixin) {

	return dojo.declare("dojox.mobile.CheckBox", [dojox.mobile.ToggleButton, dijit.form._CheckBoxMixin], {
		// summary:
		//		A non-templated checkbox widget that can be in two states (checked or not).

		baseClass: "mblCheckBox",

		_setTypeAttr: function(){}, // cannot be changed: IE complains w/o this

		buildRendering: function(){
			if(!this.srcNodeRef){
				// The following doesn't work on IE < 8 if the default state is checked.
				// You have to use "<input checked>" instead but it's not worth the bytes here.
				this.srcNodeRef = dojo.create("input", {type: this.type});
			}
			this.inherited(arguments);
			this.focusNode = this.domNode;
		}
	});
});
