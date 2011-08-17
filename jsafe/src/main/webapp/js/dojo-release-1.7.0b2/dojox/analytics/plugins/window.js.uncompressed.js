require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/analytics/plugins/window", ["dojo/_base/kernel","dojo/_base/lang","../_base"], function(dojo,dlang,dxa){

	// window startup data
	dxa.plugins.window = new (function(){
		this.addData = dojo.hitch(dxa, "addData", "window");
		this.windowConnects = dojo.config["windowConnects"] || ["open", "onerror"];

		for(var i=0; i<this.windowConnects.length;i++){
			dojo.connect(window, this.windowConnects[i], dojo.hitch(this, "addData", this.windowConnects[i]));
		}

		dojo.addOnLoad(dojo.hitch(this, function(){
			var data = {};
			for(var i in window){
				if (dojo.isObject(window[i])){
					switch(i){
						case "location":
						case "console":
							data[i]=window[i];
							break;
						default:
							break;
					}
				}else{
					data[i]=window[i];
				}
			}
			this.addData(data);
		}));
	})();
	return dojox.analytics.plugins.window;
});