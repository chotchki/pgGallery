require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/charting/action2d/Base", ["dojo/_base/kernel", "../../main", "dojo/_base/lang", "dojo/_base/declare"], 
	function(dojo, dojox){

	return dojo.declare("dojox.charting.action2d.Base", null, {
		//	summary:
		//		Base action class for plot and chart actions.

	
		constructor: function(chart, plot){
			//	summary:
			//		Create a new base action.  This can either be a plot or a chart action.
			//	chart: dojox.charting.Chart
			//		The chart this action applies to.
			//	plot: String?|dojox.charting.plot2d.Base?
			//		Optional target plot for this action.  Default is "default".
			this.chart = chart;
			this.plot = plot ? (dojo.isString(plot) ? this.chart.getPlot(plot) : plot) : this.chart.getPlot("default");
		},
	
		connect: function(){
			//	summary:
			//		Connect this action to the plot or the chart.
		},
	
		disconnect: function(){
			//	summary:
			//		Disconnect this action from the plot or the chart.
		},
		
		destroy: function(){
			//	summary:
			//		Do any cleanup needed when destroying parent elements.
			this.disconnect();
		}
	});

});
