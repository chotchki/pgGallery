require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/widget/gauge/_Gauge", ["dojo","dijit","dojox","dojox/gauges/_Gauge"], function(dojo, dijit, dojox){
dojo.getObject("dojox.widget.gauge._Gauge", 1);
/* builder delete begin
dojo.provide("dojox.widget.gauge._Gauge");

 builder delete end */
/* builder delete begin
dojo.require("dojox.gauges._Gauge");


 builder delete end */
dojox.widget.gauge._Gauge = dojox.gauges._Gauge;
dojox.widget.gauge.Range = dojox.gauges.Range;
dojox.widget.gauge._indicator = dojox.gauges._indicator;

return dojo.getObject("dojox.widget.gauge._Gauge");});
require(["dojox/widget/gauge/_Gauge"]);
