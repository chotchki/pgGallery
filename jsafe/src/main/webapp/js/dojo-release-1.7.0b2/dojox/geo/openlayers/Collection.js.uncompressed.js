require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/geo/openlayers/Collection", ["dojo/_base/kernel", "dojo/_base/declare", "dojox/geo/openlayers/Geometry"], function(dojo, declare,
																																															geometryArg){

	return dojo.declare("dojox.geo.openlayers.Collection", dojox.geo.openlayers.Geometry, {
		//	summary:
		//		A collection of geometries. _coordinates_ holds an array of geometries. 

		setGeometries : function(/* Array */g){
			//	summary: 
			//		Sets the geometries
			//	g: Array
			//		The array of geometries. 
			this.coordinates = g;
		},

		//	summary:
		//		Retrieves the geometries.
		//	returns: Array
		//		The array of geometries defining this collection.
		getGeometries : function(){
			return this.coordinates;
		}
	});
});
