require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/grid/enhanced/plugins/filter/ClearFilterConfirm", ["dojo", "dijit", "dojox", "dijit/form/Button", "dijit/_WidgetsInTemplateMixin"], function(dojo, dijit, dojox){

dojo.declare("dojox.grid.enhanced.plugins.filter.ClearFilterConfirm",[dijit._Widget, dijit._TemplatedMixin, dijit._WidgetsInTemplateMixin], {
	// summary:
	//		The UI for user to confirm the operation of clearing filter.
	templateString: dojo.cache("dojox.grid", "enhanced/templates/ClearFilterConfirmPane.html"),
	widgetsInTemplate: true,
	plugin: null,
	postMixInProperties: function(){
		var nls = this.plugin.nls;
		this._clearBtnLabel = nls["clearButton"];
		this._cancelBtnLabel = nls["cancelButton"];
		this._clearFilterMsg = nls["clearFilterMsg"];
	},
	postCreate: function(){
		this.inherited(arguments);
		this.cancelBtn.domNode.setAttribute("aria-label", this.plugin.nls["waiCancelButton"]);
		this.clearBtn.domNode.setAttribute("aria-label", this.plugin.nls["waiClearButton"]);
	},
	uninitialize: function(){
		this.plugin = null;
	},
	_onCancel: function(){
		this.plugin.clearFilterDialog.hide();
	},
	_onClear: function(){
		this.plugin.clearFilterDialog.hide();
		this.plugin.filterDefDialog.clearFilter(this.plugin.filterDefDialog._clearWithoutRefresh);
	}
});

return dojox.grid.enhanced.plugins.filter.ClearFilterConfirm;

});