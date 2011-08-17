require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/data/JsonQueryRestStore", ["dojo", "dojox", "dojox/data/JsonRestStore", "dojox/data/util/JsonQuery", "dojox.data.ClientFilter", "dojox.json.query"], function(dojo, dojox) {

// this is an extension of JsonRestStore to convert object attribute queries to
// JSONQuery/JSONPath syntax to be sent to the server. This also enables
//	JSONQuery/JSONPath queries to be performed locally if dojox.data.ClientFilter
//	has been loaded
dojo.declare("dojox.data.JsonQueryRestStore",[dojox.data.JsonRestStore,dojox.data.util.JsonQuery],{
	matchesQuery: function(item,request){
		return item.__id && (item.__id.indexOf("#") == -1) && this.inherited(arguments);
	}
});

return dojox.data.JsonQueryRestStore;
});
