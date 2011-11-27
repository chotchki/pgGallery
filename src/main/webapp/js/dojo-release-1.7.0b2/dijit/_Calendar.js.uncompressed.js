require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dijit/_Calendar", [
	"dojo/_base/kernel", // dojo.deprecated
	".",
	"./Calendar"
], function(dojo, dijit){

	// module:
	//		dijit/_Calendar
	// summary:
	//		Deprecated widget, used dijit/Calendar instead

	dojo.deprecated("dijit._Calendar is deprecated", "dijit._Calendar moved to dijit.Calendar", 1.5);

	// dijit._Calendar had an underscore all this time merely because it did
	// not satisfy dijit's a11y policy.
	dijit._Calendar = dijit.Calendar;


	return dijit._Calendar;
});
