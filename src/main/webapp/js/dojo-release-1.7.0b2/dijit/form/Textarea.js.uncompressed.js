require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/form/Textarea", [
	"dojo/_base/kernel",
	"..",
	"./SimpleTextarea",
	"./_ExpandingTextAreaMixin",
	"dojo/_base/html" // dojo.style
], function(dojo, dijit){

// module:
//		dijit/form/Textarea
// summary:
//		A textarea widget that adjusts it's height according to the amount of data.


dojo.declare(
	"dijit.form.Textarea",
	[dijit.form.SimpleTextarea, dijit.form._ExpandingTextAreaMixin], {
	// summary:
	//		A textarea widget that adjusts it's height according to the amount of data.
	//
	// description:
	//		A textarea that dynamically expands/contracts (changing it's height) as
	//		the user types, to display all the text without requiring a scroll bar.
	//
	//		Takes nearly all the parameters (name, value, etc.) that a vanilla textarea takes.
	//		Rows is not supported since this widget adjusts the height.
	//
	// example:
	// |	<textarea dojoType="dijit.form.TextArea">...</textarea>


	// TODO: for 2.0, rename this to ExpandingTextArea, and rename SimpleTextarea to TextArea

	baseClass: "dijitTextBox dijitTextArea dijitExpandingTextArea",

	// Override SimpleTextArea.cols to default to width:100%, for backward compatibility
	cols: "",

	buildRendering: function(){
		this.inherited(arguments);

		// tweak textarea style to reduce browser differences
		dojo.style(this.textbox, { overflowY: 'hidden', overflowX: 'auto', boxSizing: 'border-box', MsBoxSizing: 'border-box', WebkitBoxSizing: 'border-box', MozBoxSizing: 'border-box' });
	}
});


return dijit.form.Textarea;
});
