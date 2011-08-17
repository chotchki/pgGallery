require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/async/topic", ["dojo","dijit","dojox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.async.topic", 1);
/* builder delete begin
dojo.provide("dojox.lang.async.topic");


 builder delete end */
// Source of Deferred for topics

(function(){
	var d = dojo, topic = dojox.lang.async.topic;

	topic.from = function(topic){
		return function(){
			var h, cancel = function(){
					if(h){
						d.unsubscribe(h);
						h = null;
					}
				},
				x = new d.Deferred(cancel);
			h = d.subscribe(topic, function(){
				cancel();
				x.callback(arguments);
			});
			return x;
		};
	};

	topic.failOn = function(topic){
		return function(){
			var h, cancel = function(){
					if(h){
						d.unsubscribe(h);
						h = null;
					}
				},
				x = new d.Deferred(cancel);
			h = d.subscribe(topic, function(evt){
				cancel();
				x.errback(new Error(arguments));
			});
			return x;
		};
	};
})();
return dojo.getObject("dojox.lang.async.topic");});
require(["dojox/lang/async/topic"]);
