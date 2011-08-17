require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/TimeSpinner", ["dojo","dijit","dojox","dijit/form/_Spinner","dojo/date","dojo/date/locale","dojo/date/stamp"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form.TimeSpinner", 1);
/* builder delete begin
dojo.provide("dojox.form.TimeSpinner");


 builder delete end */
/* builder delete begin
dojo.require("dijit.form._Spinner");

 builder delete end */
/* builder delete begin
dojo.require("dojo.date");

 builder delete end */
/* builder delete begin
dojo.require("dojo.date.locale");

 builder delete end */
/* builder delete begin
dojo.require("dojo.date.stamp");


 builder delete end */
dojo.declare(
"dojox.form.TimeSpinner",
[dijit.form._Spinner],
{
	// summary: Time Spinner
	// description: This widget is the same as a normal NumberSpinner, but for the time component of a date object instead

	required: false,

	adjust: function(/* Object */ val, /*Number*/ delta){
		return dojo.date.add(val, "minute", delta)
	},

	//FIXME should we allow for constraints in this widget?
	isValid: function(){return true;},

	smallDelta: 5,

	largeDelta: 30,

	timeoutChangeRate: 0.50,

	parse: function(time, locale){
		return dojo.date.locale.parse(time, {selector:"time", formatLength:"short"});
	},

	format: function(time, locale){
		if (dojo.isString(time)) { return time; }
		return dojo.date.locale.format(time, {selector:"time", formatLength:"short"});
	},

	serialize: dojo.date.stamp.toISOString,

	value: "12:00 AM",

       _onKeyPress: function(e){
                if((e.charOrCode == dojo.keys.HOME || e.charOrCode == dojo.keys.END) && !(e.ctrlKey || e.altKey || e.metaKey)
                && typeof this.get('value') != 'undefined' /* gibberish, so HOME and END are default editing keys*/){
                        var value = this.constraints[(e.charOrCode == dojo.keys.HOME ? "min" : "max")];
                        if(value){
                                this._setValueAttr(value,true);
                        }
                        // eat home or end key whether we change the value or not
                        dojo.stopEvent(e);
                }
        }


});

return dojo.getObject("dojox.form.TimeSpinner");});
require(["dojox/form/TimeSpinner"]);
