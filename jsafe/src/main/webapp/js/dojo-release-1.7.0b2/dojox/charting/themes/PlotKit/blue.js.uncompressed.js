require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/charting/themes/PlotKit/blue", ["./base", "../../Theme"], function(pk, Theme){
	pk.blue = pk.base.clone();
	pk.blue.chart.fill = pk.blue.plotarea.fill = "#e7eef6";
	pk.blue.colors = Theme.defineColors({hue: 217, saturation: 60, low: 40, high: 88});
	
	return pk.blue;
});
