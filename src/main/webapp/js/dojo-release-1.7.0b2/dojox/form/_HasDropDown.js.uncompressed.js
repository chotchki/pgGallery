require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/_HasDropDown", ["dojo","dijit","dojox","dijit/_HasDropDown"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form._HasDropDown", 1);
dojo.deprecated("dojox.form._HasDropDown", "Use dijit._HasDropDown instead", "2.0");

/* builder delete begin
dojo.provide("dojox.form._HasDropDown");

 builder delete end */
/* builder delete begin
dojo.require("dijit._HasDropDown");


 builder delete end */
dojo.setObject("dojox.form._HasDropDown", dijit._HasDropDown);
return dojo.getObject("dojox.form._HasDropDown");});
require(["dojox/form/_HasDropDown"]);
