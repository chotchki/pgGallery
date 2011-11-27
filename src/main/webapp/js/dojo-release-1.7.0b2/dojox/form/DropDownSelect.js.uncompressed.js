require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/DropDownSelect", ["dojo","dijit","dojox","dijit/form/Select"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form.DropDownSelect", 1);
dojo.deprecated("dojox.form.DropDownSelect", "Use dijit.form.Select instead", "2.0");

/* builder delete begin
dojo.provide("dojox.form.DropDownSelect");

 builder delete end */
/* builder delete begin
dojo.require("dijit.form.Select");


 builder delete end */
dojo.setObject("dojox.form.DropDownSelect", dijit.form.Select);
return dojo.getObject("dojox.form.DropDownSelect");});
require(["dojox/form/DropDownSelect"]);
