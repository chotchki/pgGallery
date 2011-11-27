require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/cometd", ["dojo","dijit","dojox","dojox/cometd/_base","dojox/cometd/longPollTransport","dojox/cometd/callbackPollTransport"], function(dojo, dijit, dojox){
dojo.getObject("dojox.cometd", 1);
// stub loader for the cometd module since no implementation code is allowed to live in top-level files
/* builder delete begin
dojo.provide("dojox.cometd");

 builder delete end */
/* builder delete begin
dojo.require("dojox.cometd._base");

 builder delete end */
/* builder delete begin
dojo.require("dojox.cometd.longPollTransport");

 builder delete end */
/* builder delete begin
dojo.require("dojox.cometd.callbackPollTransport");

 builder delete end */

return dojo.getObject("dojox.cometd");});
require(["dojox/cometd"]);
