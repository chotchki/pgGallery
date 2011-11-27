require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/functional/util", ["dojo","dijit","dojox","dojox/lang/functional/lambda"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.functional.util", 1);
/* builder delete begin
dojo.provide("dojox.lang.functional.util");


 builder delete end */
/* builder delete begin
dojo.require("dojox.lang.functional.lambda");


 builder delete end */
// This module provides helpers:
//	- inlining string lambda functions.

(function(){
	var df = dojox.lang.functional;

	dojo.mixin(df, {
		inlineLambda: function(/*String*/ lambda, /*String|Array*/ init, /*Function?*/ add2dict){
			// summary:
			//		Creates the inlined version of a string lambda.
			// lambda:
			//		The String variable representing the lambda function.
			// init:
			//		Conveys how to initialize parameters. If it is a String, then the apply() method
			//		would be emulated treating "init" as a list of input parameters.
			//		It it is an Array, then the call() method is emulated treating array members
			//		as input parameters.
			// add2dict:
			//		The optional function, which is used to record names of lambda parameters.
			//		If supplied, this function is called with a name of every parameter.

			var s = df.rawLambda(lambda);
			if(add2dict){
				df.forEach(s.args, add2dict);
			}
			var ap = typeof init == "string",	// apply or call?
				n = ap ? s.args.length : Math.min(s.args.length, init.length),
				a = new Array(4 * n + 4), i, j = 1;
			for(i = 0; i < n; ++i){
				a[j++] = s.args[i];
				a[j++] = "=";
				a[j++] = ap ? init + "[" + i + "]": init[i];
				a[j++] = ",";
			}
			a[0] = "(";
			a[j++] = "(";
			a[j++] = s.body;
			a[j] = "))";
			return a.join("");	// String
		}
	});
})();

return dojo.getObject("dojox.lang.functional.util");});
require(["dojox/lang/functional/util"]);
