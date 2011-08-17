require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/oo/rearrange", ["dojo","dijit","dojox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.oo.rearrange", 1);
/* builder delete begin
dojo.provide("dojox.lang.oo.rearrange");


 builder delete end */
(function(){
	var extraNames = dojo._extraNames, extraLen = extraNames.length,
		opts = Object.prototype.toString, empty = {};

	dojox.lang.oo.rearrange = function(bag, map){
		//	summary:
		//		Process properties in place by removing and renaming them.
		//	description:
		//		Properties of an object are to be renamed or removed specified
		//		by "map" argument. Only own properties of "map" are processed.
		//	example:
		//	|	oo.rearrange(bag, {
		//	|		abc: "def",	// rename "abc" attribute to "def"
		//	|		ghi: null	// remove/hide "ghi" attribute
		//	|	});
		//	bag: Object:
		//		the object to be processed
		//	map: Object:
		//		the dictionary for renaming (false value indicates removal of the named property)
		//	returns: Object:
		//		the original object

	var name, newName, prop, i, t;

		for(name in map){
			newName = map[name];
			if(!newName || opts.call(newName) == "[object String]"){
				prop = bag[name];
				if(!(name in empty) || empty[name] !== prop){
					if(!(delete bag[name])){
						// can't delete => hide it
						bag[name] = undefined;
					}
					if(newName){
						bag[newName] = prop;
					}
				}
			}
		}
		if(extraLen){
			for(i = 0; i < extraLen; ++i){
				name = extraNames[i];
				// repeating the body above
				newName = map[name];
				if(!newName || opts.call(newName) == "[object String]"){
					prop = bag[name];
					if(!(name in empty) || empty[name] !== prop){
						if(!(delete bag[name])){
							// can't delete => hide it
							bag[name] = undefined;
						}
						if(newName){
							bag[newName] = prop;
						}
					}
				}
			}
		}

		return bag;	// Object
	};
})();

return dojo.getObject("dojox.lang.oo.rearrange");});
require(["dojox/lang/oo/rearrange"]);
