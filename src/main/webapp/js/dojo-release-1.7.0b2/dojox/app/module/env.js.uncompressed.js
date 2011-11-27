require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/app/module/env", ["dojo","dijit","dojox"], function(dojo,dijit,dojox){
	return dojo.declare(null, {
		mode: "",
		init: function(){

			//TODO BROADLY categorize the mode of the app...mobile,desktop
			//     This should be done with UA sniffing, but remember
			//	very broadly, this is for purposes of deciding
			//	which ui to render, NOT feature detection	
			/*
			this.mode="mobile";
			var def = this.inherited(arguments);

			//just an example
			return def.then(function(){
				console.log("env init after inherited inits");
			});	
			*/
		}
	});
});
