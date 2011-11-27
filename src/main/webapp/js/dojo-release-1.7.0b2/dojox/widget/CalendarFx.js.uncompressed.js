require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/widget/CalendarFx", ["dojo","dijit","dojox","dojox/widget/FisheyeLite"], function(dojo, dijit, dojox){
dojo.getObject("dojox.widget.CalendarFx", 1);
/* builder delete begin
dojo.provide("dojox.widget.CalendarFx");

 builder delete end */
/* builder delete begin
dojo.require("dojox.widget.FisheyeLite");


 builder delete end */
dojo.declare("dojox.widget._FisheyeFX",null, {
	// summary
	//   A mixin to add a FisheyeLite effect to the calendar
	addFx: function(query, fromNode) {
		//Use the query and base node passed from the calendar view mixin
		//to select the nodes to attach the event to.
		dojo.query(query, fromNode).forEach(function(node){
			new dojox.widget.FisheyeLite({
				properties: {
					fontSize: 1.1
				}
			}, node);
		});
	}
});

dojo.declare("dojox.widget.CalendarFisheye",
	[dojox.widget.Calendar,
	 dojox.widget._FisheyeFX], {
	 	// summary: The standard Calendar. It includes day, month and year views.
		//  FisheyeLite effects are included.
	 }
);

return dojo.getObject("dojox.widget.CalendarFx");});
require(["dojox/widget/CalendarFx"]);
