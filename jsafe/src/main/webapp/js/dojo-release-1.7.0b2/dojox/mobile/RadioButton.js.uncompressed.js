require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/RadioButton", ["./CheckBox", "dijit/form/_RadioButtonMixin"], function(CheckBox,RadioButtonMixin) {
	return dojo.declare("dojox.mobile.RadioButton", [dojox.mobile.CheckBox, dijit.form._RadioButtonMixin], {
		// summary:
		//		A non-templated radiobutton widget that can be in two states (checked or not).

		baseClass: "mblRadioButton"
	});
});
