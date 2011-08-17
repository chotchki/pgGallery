require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/storage/_common", ["dojo","dijit","dojox","dojox/storage/Provider","dojox/storage/manager","dojox/storage/LocalStorageProvider","dojox/storage/GearsStorageProvider","dojox/storage/WhatWGStorageProvider","dojox/storage/FlashStorageProvider","dojox/storage/BehaviorStorageProvider","dojox/storage/CookieStorageProvider"], function(dojo, dijit, dojox){
dojo.getObject("dojox.storage._common", 1);
/* builder delete begin
dojo.provide("dojox.storage._common");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.Provider");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.manager");


 builder delete end */
/*
  Note: if you are doing Dojo Offline builds you _must_
  have offlineProfile=true when you run the build script:
  ./build.sh action=release profile=offline offlineProfile=true
*/
/* builder delete begin
dojo.require("dojox.storage.LocalStorageProvider");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.GearsStorageProvider");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.WhatWGStorageProvider");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.FlashStorageProvider");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.BehaviorStorageProvider");

 builder delete end */
/* builder delete begin
dojo.require("dojox.storage.CookieStorageProvider");


 builder delete end */
// now that we are loaded and registered tell the storage manager to
// initialize itself
dojox.storage.manager.initialize();

return dojo.getObject("dojox.storage._common");});
require(["dojox/storage/_common"]);
