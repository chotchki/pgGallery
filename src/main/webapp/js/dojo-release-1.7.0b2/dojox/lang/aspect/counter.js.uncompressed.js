require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/aspect/counter", ["dojo","dijit","dojox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.aspect.counter", 1);
/* builder delete begin
dojo.provide("dojox.lang.aspect.counter");


 builder delete end */
(function(){
	var aop = dojox.lang.aspect;
	
	var Counter = function(){
		this.reset();
	};
	dojo.extend(Counter, {
		before: function(/*arguments*/){
			++this.calls;
		},
		afterThrowing: function(/*excp*/){
			++this.errors;
		},
		reset: function(){
			this.calls = this.errors = 0;
		}
	});
	
	aop.counter = function(){
		// summary:
		//		Returns an object, which can be used to count calls to methods.
	
		return new Counter;	// Object
	};
})();
return dojo.getObject("dojox.lang.aspect.counter");});
require(["dojox/lang/aspect/counter"]);
