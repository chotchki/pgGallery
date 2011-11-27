require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/form/BusyButton", ["dojo","dijit","dojox","dijit/form/Button","dijit/form/DropDownButton","dijit/form/ComboButton","dojo/i18n","dijit/nls/loading"], function(dojo, dijit, dojox){
dojo.getObject("dojox.form.BusyButton", 1);
/* builder delete begin
dojo.provide("dojox.form.BusyButton");


 builder delete end */
/* builder delete begin
dojo.require("dijit.form.Button");

 builder delete end */
/* builder delete begin
dojo.require("dijit.form.DropDownButton");

 builder delete end */
/* builder delete begin
dojo.require("dijit.form.ComboButton");


 builder delete end */
dojo.requireLocalization("dijit", "loading");

dojo.declare("dojox.form._BusyButtonMixin",
	null,
	{
		
	isBusy: false,
	busyLabel: "", // text while button is busy
	timeout: null, // timeout, should be controlled by xhr call
	useIcon: true, // use a busy icon
 
	postMixInProperties: function(){
		this.inherited(arguments);
		if(!this.busyLabel){
			this.busyLabel = dojo.i18n.getLocalization("dijit", "loading", this.lang).loadingState;
		}
	},
	
	postCreate: function(){
		// summary:
		//	stores initial label and timeout for reference
		this.inherited(arguments);
		this._label = this.containerNode.innerHTML;
		this._initTimeout = this.timeout;
		
		// for initial busy buttons
		if(this.isBusy){
			this.makeBusy();
		}
	},
	
	makeBusy: function(){
		// summary:
		//	sets state from idle to busy
		this.isBusy = true;
		this.set("disabled", true);
			
		this.setLabel(this.busyLabel, this.timeout);
	},
	
	cancel: function(){
		// summary:
		//	if no timeout is set or for other reason the user can put the button back
		//  to being idle
		this.set("disabled", false);
		this.isBusy = false;
		this.setLabel(this._label);
		if(this._timeout){	clearTimeout(this._timeout); }
		this.timeout = this._initTimeout;
	},
	
	resetTimeout: function(/*Int*/ timeout){
		// summary:
		//	to reset existing timeout and setting a new timeout
		if(this._timeout){
			clearTimeout(this._timeout);
		}
		
		// new timeout
		if(timeout){
			this._timeout = setTimeout(dojo.hitch(this, function(){
				this.cancel();
			}), timeout);
		}else if(timeout == undefined || timeout === 0){
			this.cancel();
		}
	},
	
	setLabel: function(/*String*/ content, /*Int*/ timeout){
		// summary:
		//	setting a label and optional timeout of the labels state
		
		// this.inherited(arguments); FIXME: throws an Unknown runtime error
		
		// Begin IE hack
		// summary: reset the label (text) of the button; takes an HTML string
		this.label = content;
		// remove children
		while (this.containerNode.firstChild){
			this.containerNode.removeChild(this.containerNode.firstChild);
		}
		this.containerNode.innerHTML = this.label;
		
		if(this.showLabel == false && !(dojo.attr(this.domNode, "title"))){
			this.titleNode.title=dojo.trim(this.containerNode.innerText || this.containerNode.textContent || '');
		}
		// End IE hack
		
		// setting timeout
		if(timeout){
			this.resetTimeout(timeout);
		}else{
			this.timeout = null;
		}
		
		// create optional busy image
		if(this.useIcon && this.isBusy){
			var node = new Image();
			node.src = this._blankGif;
			dojo.attr(node, "id", this.id+"_icon");
			dojo.addClass(node, "dojoxBusyButtonIcon");
			this.containerNode.appendChild(node);
		}
	},
	
	_onClick: function(e){
		// summary:
		//	on button click the button state gets changed
		
		// only do something if button is not busy
		if(!this.isBusy){
			this.makeBusy();
		}
	}
});

dojo.declare("dojox.form.BusyButton", [dijit.form.Button, dojox.form._BusyButtonMixin], {});
dojo.declare("dojox.form.BusyComboButton", [dijit.form.ComboButton, dojox.form._BusyButtonMixin], {});
dojo.declare("dojox.form.BusyDropDownButton", [dijit.form.DropDownButton, dojox.form._BusyButtonMixin], {});

return dojo.getObject("dojox.form.BusyButton");});
require(["dojox/form/BusyButton"]);
