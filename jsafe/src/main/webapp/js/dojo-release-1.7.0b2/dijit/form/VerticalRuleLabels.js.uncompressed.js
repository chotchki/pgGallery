require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/form/VerticalRuleLabels", [
	"dojo/_base/kernel",
	"..",
	"./HorizontalRuleLabels",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit){
	// module:
	//		dijit/form/VerticalRuleLabels
	// summary:
	//		Labels for the `dijit.form.VerticalSlider`

	dojo.declare("dijit.form.VerticalRuleLabels", dijit.form.HorizontalRuleLabels, {
		// summary:
		//		Labels for the `dijit.form.VerticalSlider`

		templateString: '<div class="dijitRuleContainer dijitRuleContainerV dijitRuleLabelsContainer dijitRuleLabelsContainerV"></div>',

		_positionPrefix: '<div class="dijitRuleLabelContainer dijitRuleLabelContainerV" style="top:',
		_labelPrefix: '"><span class="dijitRuleLabel dijitRuleLabelV">',

		_calcPosition: function(pos){
			// Overrides HorizontalRuleLabel._calcPosition()
			return 100-pos;
		},

		// needed to prevent labels from being reversed in RTL mode
		_isHorizontal: false
	});


	return dijit.form.VerticalRuleLabels;
});
