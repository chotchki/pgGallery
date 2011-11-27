require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/lang/aspect/profiler", ["dojo","dijit","dojox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.lang.aspect.profiler", 1);
/* builder delete begin
dojo.provide("dojox.lang.aspect.profiler");


 builder delete end */
(function(){
	var aop = dojox.lang.aspect,
		uniqueNumber = 0;
	
	var Profiler = function(title){
		this.args = title ? [title] : [];
		this.inCall = 0;
	};
	dojo.extend(Profiler, {
		before: function(/*arguments*/){
			if(!(this.inCall++)){
				console.profile.apply(console, this.args);
			}
		},
		after: function(/*excp*/){
			if(!--this.inCall){
				console.profileEnd();
			}
		}
	});
	
	aop.profiler = function(/*String?*/ title){
		// summary:
		//		Returns an object, which can be used to time calls to methods.
		//
		// title:
		//		The optional name of the profile section.
	
		return new Profiler(title);	// Object
	};
})();
return dojo.getObject("dojox.lang.aspect.profiler");});
require(["dojox/lang/aspect/profiler"]);
