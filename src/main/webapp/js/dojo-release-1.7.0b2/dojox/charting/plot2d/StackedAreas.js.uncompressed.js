require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/charting/plot2d/StackedAreas", ["dojo/_base/kernel", "dojo/_base/declare", "./Stacked"], 
	function(dojo, declare, Stacked){

	return dojo.declare("dojox.charting.plot2d.StackedAreas", dojox.charting.plot2d.Stacked, {
		//	summary:
		//		A convenience object to set up a stacked area plot.
		constructor: function(){
			//	summary:
			//		Force our Stacked plotter to include both lines and areas.
			this.opt.lines = true;
			this.opt.areas = true;
		}
	});
});

