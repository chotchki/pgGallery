require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/mobile/app/TextBox", ["dojo","dijit","dojox","dojox/mobile/TextBox"], function(dojo, dijit, dojox){
dojo.getObject("dojox.mobile.app.TextBox", 1);
/* builder delete begin
dojo.provide("dojox.mobile.app.TextBox");

 builder delete end */
dojo.deprecated("dojox.mobile.app.TextBox is deprecated", "dojox.mobile.app.TextBox moved to dojox.mobile.TextBox", 1.8);

/* builder delete begin
dojo.require("dojox.mobile.TextBox");


 builder delete end */
dojox.mobile.app.TextBox = dojox.mobile.TextBox;
return dojo.getObject("dojox.mobile.app.TextBox");});
require(["dojox/mobile/app/TextBox"]);
