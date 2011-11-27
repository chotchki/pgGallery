require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

require.cache["dijit/templates/MenuSeparator.html"]="<tr class=\"dijitMenuSeparator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>";

define("dijit/MenuSeparator", [
	"dojo/_base/kernel",
	".",
	"dojo/text!./templates/MenuSeparator.html",
	"./_WidgetBase",
	"./_TemplatedMixin",
	"./_Contained",
	"dojo/_base/declare", // dojo.declare
	"dojo/_base/html" // dojo.setSelectable
], function(dojo, dijit, template){

	// module:
	//		dijit/MenuSeparator
	// summary:
	//		A line between two menu items

	dojo.declare("dijit.MenuSeparator", [dijit._WidgetBase, dijit._TemplatedMixin, dijit._Contained], {
		// summary:
		//		A line between two menu items

		templateString: template,

		buildRendering: function(){
			this.inherited(arguments);
			dojo.setSelectable(this.domNode, false);
		},

		isFocusable: function(){
			// summary:
			//		Override to always return false
			// tags:
			//		protected

			return false; // Boolean
		}
	});

	return dijit.MenuSeparator;
});
