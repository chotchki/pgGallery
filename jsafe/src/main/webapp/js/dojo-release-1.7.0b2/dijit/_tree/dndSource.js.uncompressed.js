require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/_tree/dndSource", [
	"dojo/_base/kernel", // dojo.deprecated
	"..",
	"../tree/dndSource"
], function(dojo, dijit){
	// module:
	//		dijit/_tree/dndSource
	// summary:
	//		Deprecated module, use dijit.tree.dndSource instead

	// TODO: remove this file in 2.0
	dojo.deprecated("dijit._tree.dndSource has been moved to dijit.tree.dndSource, use that instead", "", "2.0");

	dojo.getObject("_tree", true, dijit);

	dijit._tree.dndSource = dijit.tree.dndSource;


	return dijit._tree.dndSource;
});
