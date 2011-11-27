require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/xml/Script", ['dojo/_base/declare', 'dojo/parser', './widgetParser'], function(declare, parser, widgetParser){

dojo.getObject("xml.Script", true, dojox);

declare("dojox.xml.Script", null, {
	constructor: function(props, node){
		parser.instantiate(
			widgetParser._processScript(node)
		);
	}
});

return dojox.xml.Script;

});
