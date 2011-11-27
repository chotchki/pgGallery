require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/rpc/ProxiedPath", ["dojo", "dojox", "dojox/rpc/Service"], function(dojo, dojox) {

dojox.rpc.envelopeRegistry.register(
	"PROXIED-PATH",function(str){return str == "PROXIED-PATH"},{
		serialize:function(smd, method, data){
			var i;
			var target = dojox.rpc.getTarget(smd, method);
			if(dojo.isArray(data)){
				for(i = 0; i < data.length;i++){
					target += '/' + (data[i] == null ? "" : data[i]);
				}
			}else{
				for(i in data){
					target += '/' + i + '/' + data[i];
				}
			}
			return {
				data:'',
				target: (method.proxyUrl || smd.proxyUrl) + "?url=" + encodeURIComponent(target)
			};
		},
		deserialize:function(results){
			return results;
		}
	}
);

});
