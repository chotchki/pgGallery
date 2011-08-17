require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

require.cache["dijit/templates/Menu.html"]="<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" dojoAttachPoint=\"containerNode\"></tbody>\n</table>\n";

define("dijit/DropDownMenu", [
	"dojo/_base/kernel",
	".",
	"dojo/text!./templates/Menu.html",
	"./_OnDijitClickMixin",
	"./_MenuBase",
	"dojo/_base/connect", // dojo.keys
	"dojo/_base/declare", // dojo.declare
	"dojo/_base/event" // dojo.stopEvent
], function(dojo, dijit, template){

	// module:
	//		dijit/DropDownMenu
	// summary:
	//		dijit.DropDownMenu widget

	dojo.declare("dijit.DropDownMenu", [dijit._MenuBase, dijit._OnDijitClickMixin], {
		// summary:
		//		A menu, without features for context menu (Meaning, drop down menu)

		templateString: template,

		baseClass: "dijitMenu",

		postCreate: function(){
			var k = dojo.keys, l = this.isLeftToRight();
			this._openSubMenuKey = l ? k.RIGHT_ARROW : k.LEFT_ARROW;
			this._closeSubMenuKey = l ? k.LEFT_ARROW : k.RIGHT_ARROW;
			this.connectKeyNavHandlers([k.UP_ARROW], [k.DOWN_ARROW]);
		},

		_onKeyPress: function(/*Event*/ evt){
			// summary:
			//		Handle keyboard based menu navigation.
			// tags:
			//		protected

			if(evt.ctrlKey || evt.altKey){ return; }

			switch(evt.charOrCode){
				case this._openSubMenuKey:
					this._moveToPopup(evt);
					dojo.stopEvent(evt);
					break;
				case this._closeSubMenuKey:
					if(this.parentMenu){
						if(this.parentMenu._isMenuBar){
							this.parentMenu.focusPrev();
						}else{
							this.onCancel(false);
						}
					}else{
						dojo.stopEvent(evt);
					}
					break;
			}
		}
	});

	return dijit.DropDownMenu;
});
