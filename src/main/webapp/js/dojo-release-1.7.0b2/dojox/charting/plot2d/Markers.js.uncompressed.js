require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/charting/plot2d/Markers", ["dojo/_base/kernel", "dojo/_base/declare", "./Default"], function(declare, Default){

	return dojo.declare("dojox.charting.plot2d.Markers", dojox.charting.plot2d.Default, {
		//	summary:
		//		A convenience plot to draw a line chart with markers.
		constructor: function(){
			//	summary:
			//		Set up the plot for lines and markers.
			this.opt.markers = true;
		}
	});
});
