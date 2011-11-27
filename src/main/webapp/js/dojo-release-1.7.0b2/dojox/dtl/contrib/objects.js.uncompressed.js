require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/dtl/contrib/objects", ["dojo/_base/kernel"], function(dojo){
	dojo.getObject("dtl.contrib.objects", true, dojox);

	dojo.mixin(dojox.dtl.contrib.objects, {
		key: function(value, arg){
			return value[arg];
		}
	});

	dojox.dtl.register.filters("dojox.dtl.contrib", {
		"objects": ["key"]
	});
	return dojox.dtl.contrib.objects;
});