require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/gauges/AnalogNeedleIndicator", ["dojo/_base/kernel","dojo/_base/declare","./AnalogIndicatorBase"],function(dojo,ddeclare,AnalogIndicatorBase) { 

dojo.experimental("dojox.gauges.AnalogNeedleIndicator");

return dojo.declare("dojox.gauges.AnalogNeedleIndicator",[AnalogIndicatorBase],{
	_getShapes: function(group){
		// summary:
		//		Override of dojox.gauges.AnalogLineIndicator._getShapes
		if(!this._gauge){
			return null;
		}
		var x = Math.floor(this.width/2);
		var shapes = [];
		
		var color = this.color ? this.color : 'black';
		var strokeColor = this.strokeColor ? this.strokeColor : color;
		var strokeWidth = this.strokeWidth ? this.strokeWidth : 1;
        
		var stroke = {
			color: strokeColor,
			width: strokeWidth
		};
		
		if (color.type && !this.strokeColor){
			stroke.color = color.colors[0].color;
		}

		var xy = (Math.sqrt(2) * (x));
		shapes[0] = group.createPath()
					.setStroke(stroke).setFill(color)
					.moveTo(xy, -xy).arcTo((2*x), (2*x), 0, 0, 0, -xy, -xy)
					.lineTo(0, -this.length).closePath();
		shapes[1] = group.createCircle({cx: 0, cy: 0, r: this.width})
					.setStroke(stroke)
					.setFill(color);
		return shapes;
	}
});
});
