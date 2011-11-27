require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/charting/plot3d/Base", ["dojo/_base/kernel", "dojo/_base/declare"], function(dojo) {

	return dojo.declare("dojox.charting.plot3d.Base", null, {
		constructor: function(width, height, kwArgs){
			this.width  = width;
			this.height = height;
		},
		setData: function(data){
			this.data = data ? data : [];
			return this;
		},
		getDepth: function(){
			return this.depth;
		},
		generate: function(chart, creator){
		}
	});
});

