require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/widget/BarGauge", ["dojo","dijit","dojox","dojox/widget/gauge/_Gauge","dojox/gauges/BarGauge"], function(dojo, dijit, dojox){
dojo.getObject("dojox.widget.BarGauge", 1);
// backward compatibility for dojox.widget.BarGauge
/* builder delete begin
dojo.provide("dojox.widget.BarGauge");

 builder delete end */
/* builder delete begin
dojo.require("dojox.widget.gauge._Gauge");

 builder delete end */
/* builder delete begin
dojo.require("dojox.gauges.BarGauge");

 builder delete end */
dojox.widget.BarGauge = dojox.gauges.BarGauge;
dojox.widget.gauge.BarLineIndicator = dojox.gauges.BarLineIndicator;

return dojo.getObject("dojox.widget.BarGauge");});
require(["dojox/widget/BarGauge"]);
