require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/gauges/AnalogLineIndicator", ["dojo/_base/kernel","dojo/_base/declare","./AnalogIndicatorBase"],function(dojo,ddeclare,AnalogIndicatorBase) {
 
return dojo.declare("dojox.gauges.AnalogLineIndicator",[AnalogIndicatorBase],{
	_getShapes: function(/*dojox.gfx.Group*/ group){
		// summary:
		//		Private function for generating the shapes for this indicator. An indicator that behaves the 
		//		same might override this one and simply replace the shapes (such as ArrowIndicator).
		var direction = this.direction;
		var length = this.length;
		if (direction == 'inside')
		   length = - length;
		
		 return [group.createLine({x1: 0, y1: -this.offset,
													x2: 0, y2: -length-this.offset})
					.setStroke({color: this.color, width: this.width})];
	}
	
});
})