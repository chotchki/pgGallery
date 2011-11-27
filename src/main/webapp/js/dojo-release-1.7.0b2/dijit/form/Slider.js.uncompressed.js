require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/form/Slider", [
	"dojo/_base/kernel", // dojo.deprecated
	"..",
	"./HorizontalSlider",
	"./VerticalSlider",
	"./HorizontalRule",
	"./VerticalRule",
	"./HorizontalRuleLabels",
	"./VerticalRuleLabels"
], function(dojo, dijit){

	// module:
	//		dijit/form/Slider
	// summary:
	//		Rollup of all the the Slider related widgets
	//		For back-compat, remove for 2.0

	dojo.deprecated("Call require() for HorizontalSlider / VerticalRule, explicitly rather than 'dijit.form.Slider' itself", "", "2.0");

	return dijit.form.HorizontalSlider;
});
