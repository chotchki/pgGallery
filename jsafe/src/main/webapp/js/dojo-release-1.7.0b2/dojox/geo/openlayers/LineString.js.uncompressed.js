require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/geo/openlayers/LineString", ["dojo/_base/kernel", "dojo/_base/declare", "dojox/geo/openlayers/Geometry"], function(dojo, declare,
																																															geometryArg){
	return dojo.declare("dojox.geo.openlayers.LineString", dojox.geo.openlayers.Geometry, {
		//	summary:
		//		The `dojox.geo.openlayers.LineString` geometry. This geometry holds an array
		//		of coordinates.

		setPoints : function(p){
			//	summary:
			//		Sets the points for this geometry.
			//	p : Array
			//		An array of {x, y} objects
			this.coordinates = p;
		},

		getPoints : function(){
			//	summary:
			//		Gets the points of this geometry.
			//	returns: Array
			//		The points of this geometry.
			return this.coordinates;
		}

	});
});
