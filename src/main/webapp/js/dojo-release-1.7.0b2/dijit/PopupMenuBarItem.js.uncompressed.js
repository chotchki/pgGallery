require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/PopupMenuBarItem", [
	"dojo/_base/kernel",
	".",
	"./PopupMenuItem",
	"./MenuBarItem",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit){

	// module:
	//		dijit/PopupMenuBarItem
	// summary:
	//		Item in a MenuBar like "File" or "Edit", that spawns a submenu when pressed (or hovered)


	dojo.declare("dijit.PopupMenuBarItem", [dijit.PopupMenuItem, dijit._MenuBarItemMixin], {
		// summary:
		//		Item in a MenuBar like "File" or "Edit", that spawns a submenu when pressed (or hovered)
	});


	return dijit.PopupMenuBarItem;
});
