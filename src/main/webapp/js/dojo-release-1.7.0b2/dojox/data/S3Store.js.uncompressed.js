require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/data/S3Store", ["dojo", "dojox", "dojox/data/JsonRestStore", "dojox/rpc/ProxiedPath"], function(dojo, dojox) {

// S3JsonRestStore is an extension of JsonRestStore to handle
// Amazon's S3 service using JSON data

dojo.declare("dojox.data.S3Store",
	dojox.data.JsonRestStore,
	{
		_processResults : function(results){
			// unfortunately, S3 returns query results in XML form
			var keyElements = results.getElementsByTagName("Key");
			var jsResults = [];
			var self = this;
			for(var i=0; i <keyElements.length;i++){
				var keyElement = keyElements[i];
				// manually create lazy loaded Deferred items for each item in the result array
				var val = {
					_loadObject: (function(key,val){
						return function(callback){
							// when a callback is added we will fetch it
							delete this._loadObject;
							self.service(key).addCallback(callback);
						};
					})(keyElement.firstChild.nodeValue,val)
				};
				jsResults.push(val);
			}
			
			return {totalCount:jsResults.length, items: jsResults};
		}
	}
);

return dojox.data.S3Store;
});
