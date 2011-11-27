require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/charting/themes/PrimaryColors", ["../Theme", "./gradientGenerator", "./common"], function(Theme, gradientGenerator){

	var themes = dojox.charting.themes,
		colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "./common"],
		defaultFill = {type: "linear", space: "plot", x1: 0, y1: 0, x2: 0, y2: 100};

	themes.PrimaryColors = new Theme({
		seriesThemes: gradientGenerator.generateMiniTheme(colors, defaultFill, 90, 40, 25)
	});
	
	return themes.PrimaryColors;
});
