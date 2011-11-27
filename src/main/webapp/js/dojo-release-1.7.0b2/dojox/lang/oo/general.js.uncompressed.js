require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/oo/general", ["dojo","dijit","dojox","dojox/lang/oo/Decorator"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.oo.general", 1);
/* builder delete begin
dojo.provide("dojox.lang.oo.general");


 builder delete end */
/* builder delete begin
dojo.require("dojox.lang.oo.Decorator");


 builder delete end */
(function(){
	var oo = dojox.lang.oo, md = oo.makeDecorator, oog = oo.general,
		isF = dojo.isFunction;

	// generally useful decorators

	oog.augment = md(function(name, newValue, oldValue){
		// summary: add property, if it was not defined before
		return typeof oldValue == "undefined" ? newValue : oldValue;
	});

	oog.override = md(function(name, newValue, oldValue){
		// summary: override property only if it was already present
		return typeof oldValue != "undefined" ? newValue : oldValue;
	});

	oog.shuffle = md(function(name, newValue, oldValue){
		// summary: replaces arguments for an old method
		return isF(oldValue) ?
			function(){
				return oldValue.apply(this, newValue.apply(this, arguments));
			} : oldValue;
	});

	oog.wrap = md(function(name, newValue, oldValue){
		// summary: wraps the old values with a supplied function
		return function(){ return newValue.call(this, oldValue, arguments); };
	});

	oog.tap = md(function(name, newValue, oldValue){
		// summary: always returns "this" ignoring the actual return
		return function(){ newValue.apply(this, arguments); return this; };
	});

	oog.before = md(function(name, newValue, oldValue){
		//	summary:
		//		creates a chain of calls where the new method is called
		//		before the old method
		return isF(oldValue) ?
			function(){
				newValue.apply(this, arguments);
				return oldValue.apply(this, arguments);
			} : newValue;
	});

	oog.after = md(function(name, newValue, oldValue){
		//	summary:
		//		creates a chain of calls where the new method is called
		//		after the old method
		return isF(oldValue) ?
			function(){
				oldValue.apply(this, arguments);
				return newValue.apply(this, arguments);
			} : newValue;
	});
})();

return dojo.getObject("dojox.lang.oo.general");});
require(["dojox/lang/oo/general"]);
