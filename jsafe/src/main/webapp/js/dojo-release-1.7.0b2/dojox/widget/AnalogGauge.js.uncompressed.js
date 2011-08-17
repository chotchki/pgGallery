require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/widget/AnalogGauge", ["dojo","dijit","dojox","dojox/widget/gauge/_Gauge","dojox/gauges/AnalogGauge"], function(dojo, dijit, dojox){
dojo.getObject("dojox.widget.AnalogGauge", 1);
// backward compatibility for dojox.widget.AnalogGauge
/* builder delete begin
dojo.provide("dojox.widget.AnalogGauge");

 builder delete end */
/* builder delete begin
dojo.require("dojox.widget.gauge._Gauge");


 builder delete end */
/* builder delete begin
dojo.require("dojox.gauges.AnalogGauge");

 builder delete end */
dojox.widget.AnalogGauge = dojox.gauges.AnalogGauge;
dojox.widget.gauge.AnalogLineIndicator = dojox.gauges.AnalogLineIndicator;

return dojo.getObject("dojox.widget.AnalogGauge");});
require(["dojox/widget/AnalogGauge"]);
