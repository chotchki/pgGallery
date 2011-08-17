require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/gauges/AnalogCircleIndicator", ["dojo/_base/kernel","dojo/_base/declare","./AnalogIndicatorBase"],function(dojo,ddeclare,AnalogIndicatorBase) { 
dojo.experimental("dojox.gauges.AnalogCircleIndicator");

return dojo.declare("dojox.gauges.AnalogCircleIndicator", [AnalogIndicatorBase], {
	// summary:
	//		an indicator for the AnalogGauge that draws a circle.
	//
	
	_getShapes: function(group){
		// summary: 
		//		Override of dojox.gauges.AnalogLineIndicator._getShapes
		var color = this.color ? this.color : 'black';
		var strokeColor = this.strokeColor ? this.strokeColor : color;
		var stroke = {
			color: strokeColor,
			width: 1
		};
		if (this.color.type && !this.strokeColor){
			stroke.color = this.color.colors[0].color;
		}
		
		return [group.createCircle({
			cx: 0,
			cy: -this.offset,
			r: this.length
		}).setFill(color).setStroke(stroke)];
	}
});
});
