require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/_FormSelectWidget", ["dojo","dijit","dojox","dijit/form/_FormSelectWidget"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form._FormSelectWidget", 1);
dojo.deprecated("dojox.form._FormSelectWidget", "Use dijit.form._FormSelectWidget instead", "2.0");

/* builder delete begin
dojo.provide("dojox.form._FormSelectWidget");

 builder delete end */
/* builder delete begin
dojo.require("dijit.form._FormSelectWidget");


 builder delete end */
dojo.setObject("dojox.form._FormSelectWidget", dijit.form._FormSelectWidget);
return dojo.getObject("dojox.form._FormSelectWidget");});
require(["dojox/form/_FormSelectWidget"]);
