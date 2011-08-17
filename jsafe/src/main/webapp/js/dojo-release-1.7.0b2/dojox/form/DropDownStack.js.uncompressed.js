require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/DropDownStack", ["dojo","dijit","dojox","dijit/form/Select","dojox/form/_SelectStackMixin"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form.DropDownStack", 1);
/* builder delete begin
dojo.provide("dojox.form.DropDownStack");


 builder delete end */
/* builder delete begin
dojo.require("dijit.form.Select");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form._SelectStackMixin");


 builder delete end */
dojo.declare("dojox.form.DropDownStack",
	[ dijit.form.Select, dojox.form._SelectStackMixin ], {
	// summary: A dropdown-based select stack.
	
});

return dojo.getObject("dojox.form.DropDownStack");});
require(["dojox/form/DropDownStack"]);
