require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/async/timeout", ["dojo","dijit","dojox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.async.timeout", 1);
/* builder delete begin
dojo.provide("dojox.lang.async.timeout");


 builder delete end */
// Source of Deferred for timeouts

(function(){
	var d = dojo, timeout = dojox.lang.async.timeout;

	timeout.from = function(ms){
		return function(){
			var h, cancel = function(){
					if(h){
						clearTimeout(h);
						h = null;
					}
				},
				x = new d.Deferred(cancel);
			h = setTimeout(function(){
				cancel();
				x.callback(ms);
			}, ms);
			return x;
		};
	};

	timeout.failOn = function(ms){
		return function(){
			var h, cancel = function(){
					if(h){
						clearTimeout(h);
						h = null;
					}
				},
				x = new d.Deferred(cancel);
			h = setTimeout(function(){
				cancel();
				x.errback(ms);
			}, ms);
			return x;
		};
	};
})();
return dojo.getObject("dojox.lang.async.timeout");});
require(["dojox/lang/async/timeout"]);
