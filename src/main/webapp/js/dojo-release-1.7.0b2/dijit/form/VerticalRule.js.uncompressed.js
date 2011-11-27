require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/form/VerticalRule", [
	"dojo/_base/kernel",
	"..",
	"./HorizontalRule",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit){

	// module:
	//		dijit/form/VerticalRule
	// summary:
	//		Hash marks for the `dijit.form.VerticalSlider`

	dojo.declare("dijit.form.VerticalRule", dijit.form.HorizontalRule, {
		// summary:
		//		Hash marks for the `dijit.form.VerticalSlider`

		templateString: '<div class="dijitRuleContainer dijitRuleContainerV"></div>',
		_positionPrefix: '<div class="dijitRuleMark dijitRuleMarkV" style="top:',

	/*=====
		// container: String
		//		This is either "leftDecoration" or "rightDecoration",
		//		to indicate whether this rule goes to the left or to the right of the slider.
		//		Note that on RTL system, "leftDecoration" would actually go to the right, and vice-versa.
		container: "",
	=====*/

		// Overrides HorizontalRule._isHorizontal
		_isHorizontal: false

	});


	return dijit.form.VerticalRule;
});
