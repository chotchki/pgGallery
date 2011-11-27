require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/analytics/plugins/consoleMessages", ["dojo/_base/kernel","dojo/_base/lang","../_base"], function(dojo,dlang,da){

		// summary:
		//	plugin to have analyitcs return the base info dojo collects
		this.addData = dojo.hitch(da, "addData", "consoleMessages");

		var lvls = dojo.config["consoleLogFuncs"] || ["error", "warn", "info", "rlog"];
		if(!console){
			console = {};
		}

		for(var i=0; i < lvls.length; i++){
			if(console[lvls[i]]){
				dojo.connect(console, lvls[i], dojo.hitch(this, "addData", lvls[i]));
			}else{
				console[lvls[i]] = dojo.hitch(this, "addData", lvls[i]);
			}
		}
	return dojox.analytics.plugins.consoleMessages;
});
