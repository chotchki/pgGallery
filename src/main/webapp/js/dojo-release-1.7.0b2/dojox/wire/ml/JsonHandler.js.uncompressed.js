require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/wire/ml/JsonHandler", ["dojo","dijit","dojox","dojox/wire/ml/RestHandler","dojox/wire/_base","dojox/wire/ml/util"], function(dojo, dijit, dojox){
dojo.getObject("dojox.wire.ml.JsonHandler", 1);
/* builder delete begin
dojo.provide("dojox.wire.ml.JsonHandler");


 builder delete end */
/* builder delete begin
dojo.require("dojox.wire.ml.RestHandler");

 builder delete end */
/* builder delete begin
dojo.require("dojox.wire._base");

 builder delete end */
/* builder delete begin
dojo.require("dojox.wire.ml.util");



 builder delete end */
dojo.declare("dojox.wire.ml.JsonHandler", dojox.wire.ml.RestHandler, {
	//	summary:
	//		A REST service handler for JSON
	//	description:
	//		This class provides JSON handling for a REST service.
	contentType: "text/json",
	handleAs: "json",
	headers: {"Accept": "*/json"},

	_getContent: function(/*String*/method, /*Array*/parameters){
		//	summary:
		//		Generate a request content
		//	description:
		//		If 'method' is "POST" or "PUT", the first parameter in
		//		'parameter' is used to generate a JSON content.
		//	method:
		//		A method name
		//	parameters:
		//		An array of parameters
		//	returns:
		//		A request content
		var content = null;
		if(method == "POST" || method == "PUT"){
			var p = (parameters ? parameters[0] : undefined);
			if(p){
				if(dojo.isString(p)){
					content = p;
				}else{
					content = dojo.toJson(p);
				}
			}
		}
		return content; //String
	}
});

return dojo.getObject("dojox.wire.ml.JsonHandler");});
require(["dojox/wire/ml/JsonHandler"]);
