require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

require.cache["dijit/templates/MenuBarItem.html"]="<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" dojoAttachPoint=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\"\n\t\tdojoAttachEvent=\"onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick\">\n\t<span dojoAttachPoint=\"containerNode\"></span>\n</div>\n";

define("dijit/MenuBarItem", [
	"dojo/_base/kernel",
	".",
	"dojo/text!./templates/MenuBarItem.html",
	"./MenuItem",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit, template){

	// module:
	//		dijit/MenuBarItem
	// summary:
	//		Item in a MenuBar that's clickable, and doesn't spawn a submenu when pressed (or hovered)


	dojo.declare("dijit._MenuBarItemMixin", null, {
		templateString: template,

		// Map widget attributes to DOMNode attributes.
		_setIconClassAttr: null	// cancel MenuItem setter because we don't have a place for an icon
	});

	dojo.declare("dijit.MenuBarItem", [dijit.MenuItem, dijit._MenuBarItemMixin], {
		// summary:
		//		Item in a MenuBar that's clickable, and doesn't spawn a submenu when pressed (or hovered)

	});


	return dijit.MenuBarItem;
});
