require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/aspect/timer", ["dojo","dijit","dojox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.aspect.timer", 1);
/* builder delete begin
dojo.provide("dojox.lang.aspect.timer");


 builder delete end */
(function(){
	var aop = dojox.lang.aspect,
		uniqueNumber = 0;
	
	var Timer = function(name){
		this.name = name || ("DojoAopTimer #" + ++uniqueNumber);
		this.inCall = 0;
	};
	dojo.extend(Timer, {
		before: function(/*arguments*/){
			if(!(this.inCall++)){
				console.time(this.name);
			}
		},
		after: function(/*excp*/){
			if(!--this.inCall){
				console.timeEnd(this.name);
			}
		}
	});
	
	aop.timer = function(/*String?*/ name){
		// summary:
		//		Returns an object, which can be used to time calls to methods.
		//
		// name:
		//		The optional unique name of the timer.

		return new Timer(name);	// Object
	};
})();
return dojo.getObject("dojox.lang.aspect.timer");});
require(["dojox/lang/aspect/timer"]);
