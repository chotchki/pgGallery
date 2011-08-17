require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mvc/Group", ["dojo/_base/declare", "dijit/_WidgetBase"], function(declare, WidgetBase){
	/*=====
		WidgetBase = dijit._WidgetBase;
		declare = dojo.declare;
	=====*/

	return declare("dojox.mvc.Group", [WidgetBase], {
		// summary:
		//		A simple model-bound container widget with single-node binding to a data model.
		//
		// description:
		//		A group is usually bound to an intermediate dojo.Stateful node in the data model.
		//		Child dijits or custom view components inside a group inherit their parent
		//		data binding context from it.
	});
});
