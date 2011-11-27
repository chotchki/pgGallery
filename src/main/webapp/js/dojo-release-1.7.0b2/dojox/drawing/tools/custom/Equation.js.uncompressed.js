require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/drawing/tools/custom/Equation", [
	"../../util/oo",
	"../TextBlock"], function(){

dojox.drawing.tools.custom.Equation = dojox.drawing.util.oo.declare(
	// summary:
	//		Essentially the same as the TextBlock tool, but
	//		allows for a different icon and tooltip title.
	//
	dojox.drawing.tools.TextBlock,
	function(options){
	
	},
	{
		customType:"equation"
	}
	
);

dojox.drawing.tools.custom.Equation.setup = {
	// summary: See stencil._Base ToolsSetup
	//
	name:"dojox.drawing.tools.custom.Equation",
	tooltip:"Equation Tool",
	iconClass:"iconEq"
};
dojox.drawing.register(dojox.drawing.tools.custom.Equation.setup, "tool");

return dojox.drawing.tools.custom.Equation;
});