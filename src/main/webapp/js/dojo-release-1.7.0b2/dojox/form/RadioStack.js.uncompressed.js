require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/RadioStack", ["dojo","dijit","dojox","dojox/form/CheckedMultiSelect","dojox/form/_SelectStackMixin"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form.RadioStack", 1);
/* builder delete begin
dojo.provide("dojox.form.RadioStack");


 builder delete end */
/* builder delete begin
dojo.require("dojox.form.CheckedMultiSelect");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form._SelectStackMixin");


 builder delete end */
dojo.declare("dojox.form.RadioStack",
	[ dojox.form.CheckedMultiSelect, dojox.form._SelectStackMixin ], {
	// summary: A radio-based select stack.
});
return dojo.getObject("dojox.form.RadioStack");});
require(["dojox/form/RadioStack"]);
