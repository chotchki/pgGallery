require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/ExpandingTextArea", ["./TextArea", "dijit/form/_ExpandingTextAreaMixin"], function(TextArea,ExpandingTextAreaMixin){

	return dojo.declare("dojox.mobile.ExpandingTextArea", [dojox.mobile.TextArea, dijit.form._ExpandingTextAreaMixin], {
		// summary:
		//		Non-templated TEXTAREA widget with the capability to adjust it's height according to the amount of data.
		//
		// description:
		//		A textarea that dynamically expands/contracts (changing it's height) as
		//		the user types, to display all the text without requiring a vertical scroll bar.
		//
		//		Takes all the parameters (name, value, etc.) that a vanilla textarea takes.
		//		Rows is not supported since this widget adjusts the height.
		//
		// example:
		// |	<textarea dojoType="dojox.mobile.ExpandingTextArea">...</textarea>

		baseClass: "mblTextArea mblExpandingTextArea"
	});
});
