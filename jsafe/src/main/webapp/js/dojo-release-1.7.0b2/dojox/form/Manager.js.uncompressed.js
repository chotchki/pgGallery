require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/Manager", ["dojo","dijit","dojox","dijit/_Widget","dijit/_TemplatedMixin","dojox/form/manager/_Mixin","dojox/form/manager/_NodeMixin","dojox/form/manager/_FormMixin","dojox/form/manager/_ValueMixin","dojox/form/manager/_EnableMixin","dojox/form/manager/_DisplayMixin","dojox/form/manager/_ClassMixin"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form.Manager", 1);
/* builder delete begin
dojo.provide("dojox.form.Manager");


 builder delete end */
/* builder delete begin
dojo.require("dijit._Widget");

 builder delete end */
/* builder delete begin
dojo.require("dijit._TemplatedMixin");


 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._Mixin");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._NodeMixin");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._FormMixin");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._ValueMixin");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._EnableMixin");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._DisplayMixin");

 builder delete end */
/* builder delete begin
dojo.require("dojox.form.manager._ClassMixin");


 builder delete end */
dojo.declare("dojox.form.Manager", [
		dijit._Widget,
		dojox.form.manager._Mixin,
		dojox.form.manager._NodeMixin,
		dojox.form.manager._FormMixin,
		dojox.form.manager._ValueMixin,
		dojox.form.manager._EnableMixin,
		dojox.form.manager._DisplayMixin,
		dojox.form.manager._ClassMixin
], {
	// summary:
	//		The widget to orchestrate dynamic forms.
	// description:
	//		This widget hosts dojox.form.manager mixins.
	//		See dojox.form.manager._Mixin for more info.

	buildRendering: function(){
		var node = (this.domNode = this.srcNodeRef);
		if(!this.containerNode){
			// all widgets with descendants must set containerNode
				this.containerNode = node;
		}
		this.inherited(arguments);
		this._attachPoints = [];
		this._attachEvents = [];
		dijit._TemplatedMixin.prototype._attachTemplateNodes.call(this, node, function(n, p){ return n.getAttribute(p); });
	},
	
	destroyRendering: function(preserveDom){
		// ctm: calling _TemplatedMixin
		if(!this.__ctm){
			// avoid recursive call from _TemplatedMixin
			this.__ctm = true;
			dijit._TemplatedMixin.prototype.destroyRendering.apply(this, arguments);
			delete this.__ctm;
			this.inherited(arguments);
		}
	}
});

return dojo.getObject("dojox.form.Manager");});
require(["dojox/form/Manager"]);
