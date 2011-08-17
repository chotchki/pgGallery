require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/wire/ml/Service", ["dojo","dijit","dojox","dijit/_Widget","dojox/xml/parser","dojox/wire/_base","dojox/wire/ml/util"], function(dojo, dijit, dojox){
dojo.getObject("dojox.wire.ml.Service", 1);
/* builder delete begin
dojo.provide("dojox.wire.ml.Service");


 builder delete end */
/* builder delete begin
dojo.require("dijit._Widget");

 builder delete end */
/* builder delete begin
dojo.require("dojox.xml.parser");

 builder delete end */
/* builder delete begin
dojo.require("dojox.wire._base");

 builder delete end */
/* builder delete begin
dojo.require("dojox.wire.ml.util");


 builder delete end */
dojo.declare("dojox.wire.ml.Service", dijit._Widget, {
	//	summary:
	//		A widget for a service
	//	description:
	//		This widget represents a service defined by a service description
	//		specified with 'url' attribute.
	//		If 'serviceType' and 'serviceUrl' attributes are specified, 'url'
	//		attribute can be omitted.
	//	url:
	//		A URL to a service description
	//	serviceUrl:
	//		A URL to a service
	//	serviceType:
	//		A service type
	//	handlerClass:
	//		A service handler class name
	url: "",
	serviceUrl: "",
	serviceType: "",
	handlerClass: "",
	preventCache: true,

	postCreate: function(){
		//	summary:
		//		Call _createHandler()
		//	description:
		//		See _createHandler().
		this.handler = this._createHandler();
	},

	_handlerClasses: {
		"TEXT": "dojox.wire.ml.RestHandler",
		"XML": "dojox.wire.ml.XmlHandler",
		"JSON": "dojox.wire.ml.JsonHandler",
		"JSON-RPC": "dojo.rpc.JsonService"
	},

	_createHandler: function(){
		//	summary:
		//		Create a service handler
		//	desription:
		//		A service handler class is determined by:
		//		1. 'handlerClass' attribute
		//		2. 'serviceType' attribute
		//		3. 'serviceType' property in a service description
		//	returns:
		//		A service handler
		if(this.url){
			var self = this;
			var d = dojo.xhrGet({
				url: this.url,
				handleAs: "json",
				sync: true
			});
			d.addCallback(function(result){
				self.smd = result;
			});
			if(this.smd && !this.serviceUrl){
				this.serviceUrl = (this.smd.serviceUrl || this.smd.serviceURL);
			}
		}
		var handlerClass = undefined;
		if(this.handlerClass){
			handlerClass = dojox.wire._getClass(this.handlerClass);
		}else if(this.serviceType){
			handlerClass = this._handlerClasses[this.serviceType];
			if(handlerClass && dojo.isString(handlerClass)){
				handlerClass = dojox.wire._getClass(handlerClass);
				this._handlerClasses[this.serviceType] = handlerClass;
			}
		}else if(this.smd && this.smd.serviceType){
			handlerClass = this._handlerClasses[this.smd.serviceType];
			if(handlerClass && dojo.isString(handlerClass)){
				handlerClass = dojox.wire._getClass(handlerClass);
				this._handlerClasses[this.smd.serviceType] = handlerClass;
			}
		}
		if(!handlerClass){
			return null; //null
		}
		return new handlerClass(); //Object
	},

	callMethod: function(method, parameters){
		//	summary:
		//		Call a service method with parameters
		//	method:
		//		A method name
		//	parameters:
		//		An array parameters
		var deferred = new dojo.Deferred();
		this.handler.bind(method, parameters, deferred, this.serviceUrl);
		return deferred;
	}
});

return dojo.getObject("dojox.wire.ml.Service");});
require(["dojox/wire/ml/Service"]);
