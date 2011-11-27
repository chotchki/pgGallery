require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/form/RadioButton", [
	"dojo/_base/kernel",
	"..",
	"./CheckBox",
	"./_RadioButtonMixin",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit){

	// module:
	//		dijit/form/RadioButton
	// summary:
	//		Radio button widget


	dojo.declare(
		"dijit.form.RadioButton",
		[dijit.form.CheckBox, dijit.form._RadioButtonMixin],
		{
			// summary:
			// 		Same as an HTML radio, but with fancy styling.

			baseClass: "dijitRadio"
		}
	);

	return dijit.form.RadioButton;
});
