require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/cometd/timestamp", ["dojo","dijit","dojox","dojox/cometd/_base"], function(dojo, dijit, dojox){
dojo.getObject("dojox.cometd.timestamp", 1);
/* builder delete begin
dojo.provide("dojox.cometd.timestamp");

 builder delete end */
/* builder delete begin
dojo.require("dojox.cometd._base");


 builder delete end */
// A cometd extension that adds a timestamp to every message
dojox.cometd._extendOutList.push(function(msg){
	msg.timestamp = new Date().toUTCString();
	return msg
});

return dojo.getObject("dojox.cometd.timestamp");});
require(["dojox/cometd/timestamp"]);
