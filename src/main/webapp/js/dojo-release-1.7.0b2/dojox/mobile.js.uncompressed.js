require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

require({cache:{
'dijit*_Contained':function(){
define("dijit/_Contained", [
	"dojo/_base/kernel",
	".",
	"dojo/_base/declare" // dojo.declare
], function(dojo, dijit){

	// module:
	//		dijit/_Contained
	// summary:
	//		Mixin for widgets that are children of a container widget

	dojo.declare("dijit._Contained", null, {
		// summary:
		//		Mixin for widgets that are children of a container widget
		//
		// example:
		// | 	// make a basic custom widget that knows about it's parents
		// |	dojo.declare("my.customClass",[dijit._Widget,dijit._Contained],{});

		getParent: function(){
			// summary:
			//		Returns the parent widget of this widget, assuming the parent
			//		specifies isContainer
			var parent = dijit.getEnclosingWidget(this.domNode.parentNode);
			return parent && parent.isContainer ? parent : null;
		},

		_getSibling: function(/*String*/ which){
			// summary:
			//      Returns next or previous sibling
			// which:
			//      Either "next" or "previous"
			// tags:
			//      private
			var node = this.domNode;
			do{
				node = node[which+"Sibling"];
			}while(node && node.nodeType != 1);
			return node && dijit.byNode(node);	// dijit._Widget
		},

		getPreviousSibling: function(){
			// summary:
			//		Returns null if this is the first child of the parent,
			//		otherwise returns the next element sibling to the "left".

			return this._getSibling("previous"); // dijit._Widget
		},

		getNextSibling: function(){
			// summary:
			//		Returns null if this is the last child of the parent,
			//		otherwise returns the next element sibling to the "right".

			return this._getSibling("next"); // dijit._Widget
		},

		getIndexInParent: function(){
			// summary:
			//		Returns the index of this widget within its container parent.
			//		It returns -1 if the parent does not exist, or if the parent
			//		is not a dijit._Container

			var p = this.getParent();
			if(!p || !p.getIndexOfChild){
				return -1; // int
			}
			return p.getIndexOfChild(this); // int
		}
	});


	return dijit._Contained;
});

},
'dojox*mobile/RoundRectCategory':function(){
define(["dijit/_WidgetBase","dijit/_Contained"], function(WidgetBase,Contained){
	// module:
	//		dojox/mobile/RoundRectCategory
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.RoundRectCategory", [dijit._WidgetBase, dijit._Contained],{
		label: "",

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement("H2");
			this.domNode.className = "mblRoundRectCategory";
			if(!this.label){
				this.label = this.domNode.innerHTML;
			}
		},

		_setLabelAttr: function(/*String*/label){
			this.label = label;
			this.domNode.innerHTML = this._cv(label);
		}
	});

});

},
'dojo*DeferredList':function(){
define(["./_base/kernel", "./_base/Deferred", "./_base/array"], function(dojo) {
	// module:
	//		dojo/DeferredList
	// summary:
	//		TODOC


dojo.DeferredList = function(/*Array*/ list, /*Boolean?*/ fireOnOneCallback, /*Boolean?*/ fireOnOneErrback, /*Boolean?*/ consumeErrors, /*Function?*/ canceller){
	// summary:
	//		Provides event handling for a group of Deferred objects.
	// description:
	//		DeferredList takes an array of existing deferreds and returns a new deferred of its own
	//		this new deferred will typically have its callback fired when all of the deferreds in
	//		the given list have fired their own deferreds.  The parameters `fireOnOneCallback` and
	//		fireOnOneErrback, will fire before all the deferreds as appropriate
	//
	//	list:
	//		The list of deferreds to be synchronizied with this DeferredList
	//	fireOnOneCallback:
	//		Will cause the DeferredLists callback to be fired as soon as any
	//		of the deferreds in its list have been fired instead of waiting until
	//		the entire list has finished
	//	fireonOneErrback:
	//		Will cause the errback to fire upon any of the deferreds errback
	//	canceller:
	//		A deferred canceller function, see dojo.Deferred
	var resultList = [];
	dojo.Deferred.call(this);
	var self = this;
	if(list.length === 0 && !fireOnOneCallback){
		this.resolve([0, []]);
	}
	var finished = 0;
	dojo.forEach(list, function(item, i){
		item.then(function(result){
			if(fireOnOneCallback){
				self.resolve([i, result]);
			}else{
				addResult(true, result);
			}
		},function(error){
			if(fireOnOneErrback){
				self.reject(error);
			}else{
				addResult(false, error);
			}
			if(consumeErrors){
				return null;
			}
			throw error;
		});
		function addResult(succeeded, result){
			resultList[i] = [succeeded, result];
			finished++;
			if(finished === list.length){
				self.resolve(resultList);
			}

		}
	});
};
dojo.DeferredList.prototype = new dojo.Deferred();

dojo.DeferredList.prototype.gatherResults = function(deferredList){
	// summary:
	//	Gathers the results of the deferreds for packaging
	//	as the parameters to the Deferred Lists' callback

	var d = new dojo.DeferredList(deferredList, false, true, false);
	d.addCallback(function(results){
		var ret = [];
		dojo.forEach(results, function(result){
			ret.push(result[1]);
		});
		return ret;
	});
	return d;
};

return dojo.DeferredList;
});

},
'dojox*mobile/Switch':function(){
define(["./common","dijit/_WidgetBase","dijit/_Contained"], function(mcommon,WidgetBase,Contained){
	// module:
	//		dojox/mobile/Switch
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.Switch", [dijit._WidgetBase,dijit._Contained],{
		value: "on",
		name: "",
		leftLabel: "ON",
		rightLabel: "OFF",
		_width: 53,

		buildRendering: function(){
			this.domNode = dojo.doc.createElement("DIV");
			var c = this.srcNodeRef ? this.srcNodeRef.className : this.className;
			this._swClass = (c || "").replace(/ .*/,"");
			this.domNode.className = "mblSwitch";
			var nameAttr = this.name ? " name=\"" + this.name + "\"" : "";
			this.domNode.innerHTML =
				  '<div class="mblSwitchInner">'
				+	'<div class="mblSwitchBg mblSwitchBgLeft">'
				+		'<div class="mblSwitchText mblSwitchTextLeft"></div>'
				+	'</div>'
				+	'<div class="mblSwitchBg mblSwitchBgRight">'
				+		'<div class="mblSwitchText mblSwitchTextRight"></div>'
				+	'</div>'
				+	'<div class="mblSwitchKnob"></div>'
				+	'<input type="hidden"'+nameAttr+'></div>'
				+ '</div>';
			var n = this.inner = this.domNode.firstChild;
			this.left = n.childNodes[0];
			this.right = n.childNodes[1];
			this.knob = n.childNodes[2];
			this.input = n.childNodes[3];
		},

		postCreate: function(){
			this.connect(this.domNode, "onclick", "onClick");
			this.connect(this.domNode, dojox.mobile.hasTouch ? "touchstart" : "onmousedown", "onTouchStart");
		},

		_changeState: function(/*String*/state, /*Boolean*/anim){
			var on = (state === "on");
			this.left.style.display = "";
			this.right.style.display = "";
			this.inner.style.left = "";
			if(anim){
				dojo.addClass(this.domNode, "mblSwitchAnimation");
			}
			dojo.removeClass(this.domNode, on ? "mblSwitchOff" : "mblSwitchOn");
			dojo.addClass(this.domNode, on ? "mblSwitchOn" : "mblSwitchOff");
	
			var _this = this;
			setTimeout(function(){
				_this.left.style.display = on ? "" : "none";
				_this.right.style.display = !on ? "" : "none";
				dojo.removeClass(_this.domNode, "mblSwitchAnimation");
			}, anim ? 300 : 0);
		},

		startup: function(){
			if(this._swClass.indexOf("Round") != -1){
				var r = Math.round(this.domNode.offsetHeight / 2);
				this.createRoundMask(this._swClass, r, this.domNode.offsetWidth);
			}
		},
	
		createRoundMask: function(className, r, w){
			if(!dojo.isWebKit || !className){ return; }
			if(!this._createdMasks){ this._createdMasks = []; }
			if(this._createdMasks[className]){ return; }
			this._createdMasks[className] = 1;
	
			var ctx = dojo.doc.getCSSCanvasContext("2d", className+"Mask", w, 100);
			ctx.fillStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(r, 0);
			ctx.arcTo(0, 0, 0, 2*r, r);
			ctx.arcTo(0, 2*r, r, 2*r, r);
			ctx.lineTo(w - r, 2*r);
			ctx.arcTo(w, 2*r, w, r, r);
			ctx.arcTo(w, 0, w - r, 0, r);
			ctx.closePath();
			ctx.fill();
		},
	
		onClick: function(e){
			if(this._moved){ return; }
			this.value = this.input.value = (this.value == "on") ? "off" : "on";
			this._changeState(this.value, true);
			this.onStateChanged(this.value);
		},
	
		onTouchStart: function(e){
			this._moved = false;
			this.innerStartX = this.inner.offsetLeft;
			if(!this._conn){
				this._conn = [];
				this._conn.push(dojo.connect(this.inner, dojox.mobile.hasTouch ? "touchmove" : "onmousemove", this, "onTouchMove"));
				this._conn.push(dojo.connect(this.inner, dojox.mobile.hasTouch ? "touchend" : "onmouseup", this, "onTouchEnd"));
			}
			this.touchStartX = e.touches ? e.touches[0].pageX : e.clientX;
			this.left.style.display = "";
			this.right.style.display = "";
			dojo.stopEvent(e);
		},
	
		onTouchMove: function(e){
			e.preventDefault();
			var dx;
			if(e.targetTouches){
				if(e.targetTouches.length != 1){ return false; }
				dx = e.targetTouches[0].clientX - this.touchStartX;
			}else{
				dx = e.clientX - this.touchStartX;
			}
			var pos = this.innerStartX + dx;
			var d = 10;
			if(pos <= -(this._width-d)){ pos = -this._width; }
			if(pos >= -d){ pos = 0; }
			this.inner.style.left = pos + "px";
			if(Math.abs(dx) > d){
				this._moved = true;
			}
		},
	
		onTouchEnd: function(e){
			dojo.forEach(this._conn, dojo.disconnect);
			this._conn = null;
			if(this.innerStartX == this.inner.offsetLeft){
				if(dojox.mobile.hasTouch){
					var ev = dojo.doc.createEvent("MouseEvents");
					ev.initEvent("click", true, true);
					this.inner.dispatchEvent(ev);
				}
				return;
			}
			var newState = (this.inner.offsetLeft < -(this._width/2)) ? "off" : "on";
			this._changeState(newState, true);
			if(newState != this.value){
				this.value = this.input.value = newState;
				this.onStateChanged(newState);
			}
		},
	
		onStateChanged: function(/*String*/newState){
		},
	
		_setValueAttr: function(/*String*/value){
			this._changeState(value, false);
			if(this.value != value){
				this.onStateChanged(value);
			}
			this.value = this.input.value = value;
		},
	
		_setLeftLabelAttr: function(/*String*/label){
			this.leftLabel = label;
			this.left.firstChild.innerHTML = this._cv(label);
		},
	
		_setRightLabelAttr: function(/*String*/label){
			this.rightLabel = label;
			this.right.firstChild.innerHTML = this._cv(label);
		}
	});
});

},
'dojox*mobile/EdgeToEdgeList':function(){
define(["./RoundRectList"], function(RoundRectList){
	return dojo.declare("dojox.mobile.EdgeToEdgeList", dojox.mobile.RoundRectList, {
		buildRendering: function(){
			this.inherited(arguments);
			this.domNode.className = "mblEdgeToEdgeList";
		}
	});
});

},
'dojox*mobile/ProgressIndicator':function(){
define(["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/html"],
	function(dojo, declare, dhtml){
	dojo.declare("dojox.mobile.ProgressIndicator", null, {
		interval: 100, // milliseconds
		colors: [
			"#C0C0C0", "#C0C0C0", "#C0C0C0", "#C0C0C0",
			"#C0C0C0", "#C0C0C0", "#B8B9B8", "#AEAFAE",
			"#A4A5A4", "#9A9A9A", "#8E8E8E", "#838383"
		],

		_bars: [],

		constructor: function(){
			this.domNode = dojo.create("DIV");
			this.domNode.className = "mblProgContainer";
			if(dojo.config["mblAndroidWorkaround"] !== false && dojo.isAndroid >= 2.2 && dojo.isAndroid < 3){
				// workaround to avoid the side effects of the fixes for android screen flicker problem
				dojo.style(this.domNode, "webkitTransform", "translate3d(0,0,0)");
			}
			this.spinnerNode = dojo.create("DIV", null, this.domNode);
			for(var i = 0; i < this.colors.length; i++){
				var div = dojo.create("DIV", {className:"mblProg mblProg"+i}, this.spinnerNode);
				this._bars.push(div);
			}
		},
	
		start: function(){
			if(this.imageNode){
				var img = this.imageNode;
				var l = Math.round((this.domNode.offsetWidth - img.offsetWidth) / 2);
				var t = Math.round((this.domNode.offsetHeight - img.offsetHeight) / 2);
				img.style.margin = t+"px "+l+"px";
				return;
			}
			var cntr = 0;
			var _this = this;
			var n = this.colors.length;
			this.timer = setInterval(function(){
				cntr--;
				cntr = cntr < 0 ? n - 1 : cntr;
				var c = _this.colors;
				for(var i = 0; i < n; i++){
					var idx = (cntr + i) % n;
					_this._bars[i].style.backgroundColor = c[idx];
				}
			}, this.interval);
		},
	
		stop: function(){
			if(this.timer){
				clearInterval(this.timer);
			}
			this.timer = null;
			if(this.domNode.parentNode){
				this.domNode.parentNode.removeChild(this.domNode);
			}
		},

		setImage: function(/*String*/file){
			// summary:
			//		Set an indicator icon image file (typically animated GIF).
			//		If null is specified, restores the default spinner.
			if(file){
				this.imageNode = dojo.create("IMG", {src:file}, this.domNode);
				this.spinnerNode.style.display = "none";
			}else{
				if(this.imageNode){
					this.domNode.removeChild(this.imageNode);
					this.imageNode = null;
				}
				this.spinnerNode.style.display = "";
			}
		}
	});
	dojox.mobile.ProgressIndicator._instance = null;
	dojox.mobile.ProgressIndicator.getInstance = function(){
		if(!dojox.mobile.ProgressIndicator._instance){
			dojox.mobile.ProgressIndicator._instance = new dojox.mobile.ProgressIndicator();
		}
		return dojox.mobile.ProgressIndicator._instance;
	};

	return dojox.mobile.ProgressIndicator;
});

},
'dojox*mobile/TransitionEvent':function(){
define(["dojo/_base/kernel", "dojo/_base/declare", "dojo/on", "./transition"],
	function(dojo, declare, on, transition){

	return dojo.declare("dojox.mobile.TransitionEvent", null, {
		constructor: function(target, transitionOptions, triggerEvent){
			this.transitionOptions=transitionOptions;	
			this.target = target;
			this.triggerEvent=triggerEvent||null;	
		},

		dispatch: function(){
			var opts = {bubbles:true, cancelable:true, detail: this.transitionOptions, triggerEvent: this.triggerEvent};	
			//console.log("Target: ", this.target, " opts: ", opts);

			var evt = on.emit(this.target,"startTransition", opts);
			//console.log('evt: ', evt);
			if (evt){
				dojo.when(transition.call(this, evt), dojo.hitch(this, function(results){
					this.endTransition(results);
				}));
			}
		},

		endTransition: function(results){
			on.emit(this.target, "endTransition" , {detail: results.transitionOptions});
		}
	});
});

},
'dojox*mobile/common':function(){
define(["dojo/_base/kernel", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/html", "dojo/ready", "dijit/_WidgetBase"],
	function(dojo, dlang, darray, dhtml, ready, WidgetBase){

	dojo.getObject("mobile", true, dojox);

// summary:
//		Mobile Widgets
// description:
//		This module provides a number of widgets that can be used to build
//		web-based applications for mobile devices such as iPhone or Android.
//		These widgets work best with webkit-based browsers, such as Safari or
//		Chrome, since webkit-specific CSS3 features are used.
//		However, the widgets should work in a "graceful degradation" manner
//		even on non-CSS3 browsers, such as IE or Firefox. In that case,
//		fancy effects, such as animation, gradient color, or round corner
//		rectangle, may not work, but you can still operate your application.
//
//		Furthermore, as a separate file, a compatibility module,
//		dojox.mobile.compat, is available that simulates some of CSS3 features
//		used in this module. If you use the compatibility module, fancy visual
//		effects work better even on non-CSS3 browsers.
//
//		Note that use of dijit._Templated and dojo.query was intentionally
//		avoided to reduce download code size.

	var ua = navigator.userAgent;

	// BlackBerry (OS 6 or later only)
	dojo.isBB = ua.indexOf("BlackBerry") >= 0 && parseFloat(ua.split("Version/")[1]) || undefined;

	// Android
	dojo.isAndroid = parseFloat(ua.split("Android ")[1]) || undefined;

	// iPhone, iPod, or iPad
	// If iPod or iPad is detected, in addition to dojo.isIPod or dojo.isIPad,
	// dojo.isIPhone will also have iOS version number.
	if(ua.match(/(iPhone|iPod|iPad)/)){
		var p = "is" + RegExp.$1.replace(/i/, 'I');
		var v = ua.match(/OS ([\d_]+)/) ? RegExp.$1 : "1";
		dojo.isIPhone = dojo[p] = parseFloat(v.replace(/_/, '.').replace(/_/g, ''));
	}

	var html = dojo.doc.documentElement;
	html.className += dojo.trim([
		dojo.isBB ? "dj_bb" : "",
		dojo.isAndroid ? "dj_android" : "",
		dojo.isIPhone ? "dj_iphone" : "",
		dojo.isIPod ? "dj_ipod" : "",
		dojo.isIPad ? "dj_ipad" : ""
	].join(" ").replace(/ +/g," "));

	var dm = dojox.mobile;

	dm.getScreenSize = function(){
		return {
			h: dojo.global.innerHeight || dojo.doc.documentElement.clientHeight,
			w: dojo.global.innerWidth || dojo.doc.documentElement.clientWidth
		};
	};

	dm.updateOrient = function(){
		var dim = dm.getScreenSize();
		dojo.replaceClass(dojo.doc.documentElement,
				  dim.h > dim.w ? "dj_portrait" : "dj_landscape",
				  dim.h > dim.w ? "dj_landscape" : "dj_portrait");
	};
	dm.updateOrient();

	dm.tabletSize = 500;
	dm.detectScreenSize = function(/*Boolean?*/force){
		var dim = dm.getScreenSize();
		var sz = Math.min(dim.w, dim.h);
		var from, to;
		if(sz >= dm.tabletSize && (force || (!this._sz || this._sz < dm.tabletSize))){
			from = "phone";
			to = "tablet";
		}else if(sz < dm.tabletSize && (force || (!this._sz || this._sz >= dm.tabletSize))){
			from = "tablet";
			to = "phone";
		}
		if(to){
			dojo.replaceClass(dojo.doc.documentElement, "dj_"+to, "dj_"+from);
			dojo.publish("/dojox/mobile/screenSize/"+to, [dim]);
		}
		this._sz = sz;
	};
	dm.detectScreenSize();

	dm.setupIcon = function(/*DomNode*/iconNode, /*String*/iconPos){
		if(iconNode && iconPos){
			var arr = dojo.map(iconPos.split(/[ ,]/),function(item){return item-0});
			var t = arr[0]; // top
			var r = arr[1] + arr[2]; // right
			var b = arr[0] + arr[3]; // bottom
			var l = arr[1]; // left
			var offset = iconNode.parentNode ? dojo.style(iconNode.parentNode, "paddingLeft") : 8;
			dojo.style(iconNode, {
				clip: "rect("+t+"px "+r+"px "+b+"px "+l+"px)",
				top: (iconNode.parentNode ? dojo.style(iconNode, "top") : 0) - t + "px",
				left: offset - l + "px"
			});
		}
	};

	dm.hideAddressBarWait = typeof(dojo.config["mblHideAddressBarWait"]) === "number" ?
		dojo.config["mblHideAddressBarWait"] : 1500; // [ms] value must be larger than 800
	dm.hide_1 = function(force){
		scrollTo(0, 1);
		var h = dm.getScreenSize().h + "px";
		if(dojo.isAndroid){
			if(force)
				dojo.body().style.minHeight = h;
			dm.resizeAll();
		}else{
			if(force || dm._h === h && h !== dojo.body().style.minHeight){
				dojo.body().style.minHeight = h;
				dm.resizeAll();
			}
		}
		dm._h = h;
	};
	dm.hide_fs = function(){
		// for fail-safe, in case of failure to complete the address bar hiding in time
		var t = dojo.body().style.minHeight;
		dojo.body().style.minHeight = (dm.getScreenSize().h * 2) + "px"; // to ensure enough height for scrollTo to work
		scrollTo(0, 1);
		setTimeout(function(){
			dm.hide_1(1);
			dm._hiding = false;
		}, 1000);
	};
	dm.hideAddressBar = function(/*Event?*/evt){
		if(dm.disableHideAddressBar || dm._hiding){ return; }
		dm._hiding = true;
		dm._h = 0;
		dojo.body().style.minHeight = (dm.getScreenSize().h * 2) + "px"; // to ensure enough height for scrollTo to work
		setTimeout(dm.hide_1, 0);
		setTimeout(dm.hide_1, 200);
		setTimeout(dm.hide_1, 800);
		setTimeout(dm.hide_fs, dm.hideAddressBarWait);
	};

	dm.resizeAll = function(/*Event?*/evt, /*Widget?*/root){
		// summary:
		//		Call the resize() method of all the top level resizable widgets.
		// description:
		//		Find all widgets that do not have a parent or the parent does not
		//		have the resize() method, and call resize() for them.
		//		If a widget has a parent that has resize(), call of the widget's
		//		resize() is its parent's responsibility.
		// evt:
		//		Native event object
		// root:
		//		If specified, search the specified widget recursively for top level
		//		resizable widgets.
		//		root.resize() is always called regardless of whether root is a
		//		top level widget or not.
		//		If omitted, search the entire page.
		if(dm.disableResizeAll){ return; }
		dojo.publish("/dojox/mobile/resizeAll", [evt, root]);
		dm.updateOrient();
		dm.detectScreenSize();
		var isTopLevel = function(w){
			var parent = w.getParent && w.getParent();
			return !!((!parent || !parent.resize) && w.resize);
		};
		var resizeRecursively = function(w){
			dojo.forEach(w.getChildren(), function(child){
				if(isTopLevel(child)){ child.resize(); }
				resizeRecursively(child);
			});
		};
		if(root){
			if(root.resize){ root.resize(); }
			resizeRecursively(root);
		}else{
			dijit.registry.filter(isTopLevel).forEach(function(w){
				w.resize();
			});
		}
	};

	dm.openWindow = function(url, target){
		dojo.global.open(url, target || "_blank");
	};

	dm.createDomButton = function(/*DomNode*/refNode, /*Object?*/style, /*DomNode?*/toNode){
		var s = refNode.className;
		var node = toNode || refNode;
		if(s.match(/(mblDomButton\w+)/) && s.indexOf("/") === -1){
			var btnClass = RegExp.$1;
			var nDiv = 4;
			if(s.match(/(mblDomButton\w+_(\d+))/)){
				nDiv = RegExp.$2 - 0;
			}
			for(var i = 0, p = node; i < nDiv; i++){
				p = p.firstChild || dojo.create("DIV", null, p);
			}
			if(toNode){
				setTimeout(function(){
					dojo.removeClass(refNode, btnClass);
				}, 0);
				dojo.addClass(toNode, btnClass);
			}
		}else if(s.indexOf(".") !== -1){ // file name
			dojo.create("IMG", {src:s}, node);
		}else{
			return null;
		}
		dojo.addClass(node, "mblDomButton");
		dojo.style(node, style);
		return node;
	};
	
	dm.createIcon = function(/*String*/icon, /*String*/iconPos, /*DomNode*/node, /*String?*/title, /*DomNode?*/parent){
		// summary:
		//		Create or update a ListItem icon node
		// description:
		//		If node exists, update the existing node. Otherwise, create a new one.
		// icon:
		//		Path for an image, or DOM button class name.
		if(icon && icon.indexOf("mblDomButton") === 0){
			// DOM button
			if(node && node.className.match(/(mblDomButton\w+)/)){
				dojo.removeClass(node, RegExp.$1);
			}else{
				node = dojo.create("DIV");
			}
			node.title = title;
			dojo.addClass(node, icon);
			dm.createDomButton(node);
		}else if(icon && icon !== "none"){
			// Image
			if(!node || node.nodeName !== "IMG"){
				node = dojo.create("IMG", {
					alt: title
				});
			}
			node.src = icon;
			dm.setupIcon(node, iconPos);
			if(parent && iconPos){
				var arr = iconPos.split(/[ ,]/);
				dojo.style(parent, {
					width: arr[2] + "px",
					height: arr[3] + "px"
				});
			}
		}
		if(parent){
			parent.appendChild(node);
		}
		return node;
	};

	if(dojo.config.parseOnLoad){
		dojo.ready(90, function(){
			// avoid use of dojo.query
			/*
			var list = dojo.query('[lazy=true] [dojoType]', null);
			list.forEach(function(node, index, nodeList){
				node.setAttribute("__dojoType", node.getAttribute("dojoType"));
				node.removeAttribute("dojoType");
			});
			*/
		
			var nodes = dojo.body().getElementsByTagName("*");
			var i, len, s;
			len = nodes.length;
			for(i = 0; i < len; i++){
				s = nodes[i].getAttribute("dojoType");
				if(s){
					if(nodes[i].parentNode.getAttribute("lazy") == "true"){
						nodes[i].setAttribute("__dojoType", s);
						nodes[i].removeAttribute("dojoType");
					}
				}
			}
		});
	}
	
	dojo.addOnLoad(function(){
		dm.detectScreenSize(true);
		if(dojo.config["mblApplyPageStyles"] !== false){
			dojo.addClass(dojo.doc.documentElement, "mobile");
		}

		if(dojo.config["mblAndroidWorkaround"] !== false && dojo.isAndroid >= 2.2 && dojo.isAndroid < 3.1){ // workaround for android screen flicker problem
			if(dojo.config["mblAndroidWorkaroundButtonStyle"] !== false){
				// workaround to avoid buttons disappear due to the side-effect of the webkitTransform workaroud below
				dojo.create("style", {innerHTML:"BUTTON,INPUT[type='button'],INPUT[type='submit'],INPUT[type='reset'],INPUT[type='file']::-webkit-file-upload-button{-webkit-appearance:none;}"}, dojo.doc.head, "first");
			}
			if(dojo.isAndroid < 3){ // for Android 2.2.x and 2.3.x
				dojo.style(dojo.doc.documentElement, "webkitTransform", "translate3d(0,0,0)");
				// workaround for auto-scroll issue when focusing input fields
				dojo.connect(null, "onfocus", null, function(e){
					dojo.style(dojo.doc.documentElement, "webkitTransform", "");
				});
				dojo.connect(null, "onblur", null, function(e){
					dojo.style(dojo.doc.documentElement, "webkitTransform", "translate3d(0,0,0)");
				});
			}else{ // for Android 3.0.x
				if(dojo.config["mblAndroid3Workaround"] !== false){
					dojo.style(dojo.doc.documentElement, {
						webkitBackfaceVisibility: "hidden",
						webkitPerspective: 8000
					});
				}
			}
		}
	
		//	You can disable hiding the address bar with the following djConfig.
		//	var djConfig = { mblHideAddressBar: false };
		var f = dm.resizeAll;
		if(dojo.config["mblHideAddressBar"] !== false &&
			navigator.appVersion.indexOf("Mobile") != -1 ||
			dojo.config["mblForceHideAddressBar"] === true){
			dm.hideAddressBar();
			if(dojo.config["mblAlwaysHideAddressBar"] === true){
				f = dm.hideAddressBar;
			}
		}
		dojo.connect(null, (dojo.global.onorientationchange !== undefined && !dojo.isAndroid)
			? "onorientationchange" : "onresize", null, f);
	
		// avoid use of dojo.query
		/*
		var list = dojo.query('[__dojoType]', null);
		list.forEach(function(node, index, nodeList){
			node.setAttribute("dojoType", node.getAttribute("__dojoType"));
			node.removeAttribute("__dojoType");
		});
		*/
	
		var nodes = dojo.body().getElementsByTagName("*");
		var i, len = nodes.length, s;
		for(i = 0; i < len; i++){
			s = nodes[i].getAttribute("__dojoType");
			if(s){
				nodes[i].setAttribute("dojoType", s);
				nodes[i].removeAttribute("__dojoType");
			}
		}
	
		if(dojo.hash){
			// find widgets under root recursively
			var findWidgets = function(root){
				var arr;
				arr = dijit.findWidgets(root);
				var widgets = arr;
				for(var i = 0; i < widgets.length; i++){
					arr = arr.concat(findWidgets(widgets[i].containerNode));
				}
				return arr;
			};
			dojo.subscribe("/dojo/hashchange", null, function(value){
				var view = dm.currentView;
				if(!view){ return; }
				var params = dm._params;
				if(!params){ // browser back/forward button was pressed
					var moveTo = value ? value : dm._defaultView.id;
					var widgets = findWidgets(view.domNode);
					var dir = 1, transition = "slide";
					for(i = 0; i < widgets.length; i++){
						var w = widgets[i];
						if("#"+moveTo == w.moveTo){
							// found a widget that has the given moveTo
							transition = w.transition;
								dir = (w instanceof dm.Heading) ? -1 : 1;
							break;
						}
					}
					params = [ moveTo, dir, transition ];
				}
				view.performTransition.apply(view, params);
				dm._params = null;
			});
		}
	
		dojo.body().style.visibility = "visible";
	});
	
	dijit.getEnclosingWidget = function(node){
		while(node && node.tagName !== "BODY"){
			if(node.getAttribute && node.getAttribute("widgetId")){
				return dijit.registry.byId(node.getAttribute("widgetId"));
			}
			node = node._parentNode || node.parentNode;
		}
		return null;
	};

	dojo.extend(dijit._WidgetBase, {
		_cv: function(s){ return s; } // convert the given string
	});

	(function(){
		// feature detection
		if(dojo.isWebKit){
			dm.hasTouch = (typeof dojo.doc.documentElement.ontouchstart != "undefined" &&
				navigator.appVersion.indexOf("Mobile") != -1) || !!dojo.isAndroid;
		}
	})();

	return dm;
});

},
'dijit*_Container':function(){
define("dijit/_Container", [
	"dojo/_base/kernel",
	".",
	"dojo/_base/array", // dojo.forEach dojo.indexOf
	"dojo/_base/declare", // dojo.declare
	"dojo/_base/html" // dojo.place
], function(dojo, dijit){

	// module:
	//		dijit/_Container
	// summary:
	//		Mixin for widgets that contain a set of widget children.

	dojo.declare("dijit._Container", null, {
		// summary:
		//		Mixin for widgets that contain a set of widget children.
		// description:
		//		Use this mixin for widgets that needs to know about and
		//		keep track of their widget children. Suitable for widgets like BorderContainer
		//		and TabContainer which contain (only) a set of child widgets.
		//
		//		It's not suitable for widgets like ContentPane
		//		which contains mixed HTML (plain DOM nodes in addition to widgets),
		//		and where contained widgets are not necessarily directly below
		//		this.containerNode.   In that case calls like addChild(node, position)
		//		wouldn't make sense.

		// isContainer: [protected] Boolean
		//		Indicates that this widget acts as a "parent" to the descendant widgets.
		//		When the parent is started it will call startup() on the child widgets.
		//		See also `isLayoutContainer`.
		isContainer: true,

		buildRendering: function(){
			this.inherited(arguments);
			if(!this.containerNode){
				// all widgets with descendants must set containerNode
	 				this.containerNode = this.domNode;
			}
		},

		addChild: function(/*dijit._Widget*/ widget, /*int?*/ insertIndex){
			// summary:
			//		Makes the given widget a child of this widget.
			// description:
			//		Inserts specified child widget's dom node as a child of this widget's
			//		container node, and possibly does other processing (such as layout).

			var refNode = this.containerNode;
			if(insertIndex && typeof insertIndex == "number"){
				var children = this.getChildren();
				if(children && children.length >= insertIndex){
					refNode = children[insertIndex-1].domNode;
					insertIndex = "after";
				}
			}
			dojo.place(widget.domNode, refNode, insertIndex);

			// If I've been started but the child widget hasn't been started,
			// start it now.  Make sure to do this after widget has been
			// inserted into the DOM tree, so it can see that it's being controlled by me,
			// so it doesn't try to size itself.
			if(this._started && !widget._started){
				widget.startup();
			}
		},

		removeChild: function(/*Widget|int*/ widget){
			// summary:
			//		Removes the passed widget instance from this widget but does
			//		not destroy it.  You can also pass in an integer indicating
			//		the index within the container to remove

			if(typeof widget == "number"){
				widget = this.getChildren()[widget];
			}

			if(widget){
				var node = widget.domNode;
				if(node && node.parentNode){
					node.parentNode.removeChild(node); // detach but don't destroy
				}
			}
		},

		hasChildren: function(){
			// summary:
			//		Returns true if widget has children, i.e. if this.containerNode contains something.
			return this.getChildren().length > 0;	// Boolean
		},

		destroyDescendants: function(/*Boolean*/ preserveDom){
			// summary:
			//      Destroys all the widgets inside this.containerNode,
			//      but not this widget itself
			dojo.forEach(this.getChildren(), function(child){ child.destroyRecursive(preserveDom); });
		},

		_getSiblingOfChild: function(/*dijit._Widget*/ child, /*int*/ dir){
			// summary:
			//		Get the next or previous widget sibling of child
			// dir:
			//		if 1, get the next sibling
			//		if -1, get the previous sibling
			// tags:
			//      private
			var node = child.domNode,
				which = (dir>0 ? "nextSibling" : "previousSibling");
			do{
				node = node[which];
			}while(node && (node.nodeType != 1 || !dijit.byNode(node)));
			return node && dijit.byNode(node);	// dijit._Widget
		},

		getIndexOfChild: function(/*dijit._Widget*/ child){
			// summary:
			//		Gets the index of the child in this container or -1 if not found
			return dojo.indexOf(this.getChildren(), child);	// int
		},

		startup: function(){
			// summary:
			//		Called after all the widgets have been instantiated and their
			//		dom nodes have been inserted somewhere under dojo.doc.body.
			//
			//		Widgets should override this method to do any initialization
			//		dependent on other widgets existing, and then call
			//		this superclass method to finish things off.
			//
			//		startup() in subclasses shouldn't do anything
			//		size related because the size of the widget hasn't been set yet.

			if(this._started){ return; }

			// Startup all children of this widget
			dojo.forEach(this.getChildren(), function(child){ child.startup(); });

			this.inherited(arguments);
		}
	});

	return dijit._Container;
});

},
'dojox*mobile/ListItem':function(){
define("dojox/mobile/ListItem", ["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/array", "dojo/_base/html", "./_ItemBase", "./TransitionEvent"],
	function(dojo, declare, darray, dhtml, ItemBase, TransitionEvent){
	// module:
	//		dojox/mobile/ListItem
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.ListItem", dojox.mobile._ItemBase, {
		//icon: "", // inherit from _ItemBase
		//label: "", // inherit from _ItemBase
		rightText: "",
		rightIcon2: "",
		rightIcon: "",

		anchorLabel: false,
		noArrow: false,
		selected: false,
		checked: false,
		arrowClass: "mblDomButtonArrow",
		checkClass: "mblDomButtonCheck",
		variableHeight: false,

		rightIconTitle: "",
		rightIcon2Title: "",

		// for backward compatibility
		btnClass: "",
		btnClass2: "",
	
		postMixInProperties: function(){
			// for backward compatibility
			if(this.btnClass){
				this.rightIcon = this.btnClass;
			}
			this._setBtnClassAttr = this._setRightIconAttr;
			this._setBtnClass2Attr = this._setRightIcon2Attr;
		},

		buildRendering: function(){
			this.inherited(arguments);
			this.domNode.className = "mblListItem" + (this.selected ? " mblItemSelected" : "");

			// label
			var box = this.box = dojo.create("DIV");
			box.className = "mblListItemTextBox";
			if(this.anchorLabel){
				box.style.cursor = "pointer";
			}
			var r = this.srcNodeRef;
			if(r && !this.label){
				this.label = "";
				for(var i = 0, len = r.childNodes.length; i < len; i++){
					var n = r.firstChild;
					if(n.nodeType === 3 && dojo.trim(n.nodeValue) !== ""){
						n.nodeValue = this._cv(n.nodeValue);
						this.labelNode = dojo.create("SPAN", {className:"mblListItemLabel"});
						this.labelNode.appendChild(n);
						n = this.labelNode;
					}
					box.appendChild(n);
				}
			}
			if(!this.labelNode){
				this.labelNode = dojo.create("SPAN", {className:"mblListItemLabel"}, box);
			}
			if(this.anchorLabel){
				box.style.display = "inline"; // to narrow the text region
			}

			var a = this.anchorNode = dojo.create("A");
			a.className = "mblListItemAnchor";
			this.domNode.appendChild(a);
			a.appendChild(box);

			// right text
			this.rightTextNode = dojo.create("DIV", {className:"mblListItemRightText"}, a, "first");

			// right icon2
			this.rightIcon2Node = dojo.create("DIV", {className:"mblListItemRightIcon2"}, a, "first");

			// right icon
			this.rightIconNode = dojo.create("DIV", {className:"mblListItemRightIcon"}, a, "first");

			// icon
			this.iconNode = dojo.create("DIV", {className:"mblListItemIcon"}, a, "first");
		},

		startup: function(){
			if(this._started){ return; }
			this.inheritParams();
			var parent = this.getParent();
			if(this.moveTo || this.href || this.url || this.clickable){
				this.connect(this.anchorNode, "onclick", "onClick");
			}
			this.setArrow();
			if(parent && parent.select){
				this.connect(this.anchorNode, "onclick", "onClick");
			}

			if(dojo.hasClass(this.domNode, "mblVariableHeight")){
				this.variableHeight = true;
			}
			if(this.variableHeight){
				dojo.addClass(this.domNode, "mblVariableHeight");
				dojo.subscribe("/dojox/mobile/resizeAll", this, "layoutVariableHeight");
				setTimeout(dojo.hitch(this, "layoutVariableHeight"));
			}

			this.set("icon", this.icon);
			this.inherited(arguments);
		},

		onClick: function(e){
			var a = e.currentTarget;
			var li = a.parentNode;
			if(dojo.hasClass(li, "mblItemSelected")){ return; } // already selected
			if(this.anchorLabel){
				for(var p = e.target; p.tagName !== "LI"; p = p.parentNode){
					if(p.className == "mblListItemTextBox"){
						dojo.addClass(p, "mblListItemTextBoxSelected");
						setTimeout(function(){
							dojo.removeClass(p, "mblListItemTextBoxSelected");
						}, dojo.isAndroid ? 300 : 1000);
						this.onAnchorLabelClicked(e);
						return;
					}
				}
			}
			var parent = this.getParent();
			if(parent.select){
				if(parent.select === "single"){
					if(!this.checked){
						this.set("checked", true);
					}
				}else if(parent.select === "multiple"){
					this.set("checked", !this.checked);
				}
			}
			this.select();

			var transOpts;
			if (this.moveTo || this.href || this.url || this.scene){
				transOpts = {moveTo: this.moveTo, href: this.href, url: this.url, scene: this.scene, transition: this.transition, transitionDir: this.transitionDir};
			}else if (this.transitionOptions){
				transOpts = this.transitionOptions;
			}	

			if (transOpts){
				this.setTransitionPos(e);
				return new TransitionEvent(this.domNode,transOpts,e).dispatch();
			}
		},
	
		deselect: function(){
			dojo.removeClass(this.domNode, "mblItemSelected");
		},
	
		select: function(){
			var parent = this.getParent();
			if(parent.stateful){
				parent.deselectAll();
			}else{
				var _this = this;
				setTimeout(function(){
					_this.deselect();
				}, dojo.isAndroid ? 300 : 1000);
			}
			dojo.addClass(this.domNode, "mblItemSelected");
		},
	
		onAnchorLabelClicked: function(e){
			// Stub function to connect to from your application.
		},

		layoutVariableHeight: function(e){
			var h = this.anchorNode.offsetHeight;
			dojo.forEach([
					this.rightTextNode,
					this.rightIcon2Node,
					this.rightIconNode,
					this.iconNode
				], function(n){
					var t = Math.round((h - n.offsetHeight) / 2);
					n.style.marginTop = t + "px";
				});
		},

		setArrow: function(){
			if(this.checked){ return; }
			var c = "";
			var parent = this.getParent();
			if(this.moveTo || this.href || this.url || this.clickable){
				if(!this.noArrow && !(parent && parent.stateful)){
					c = this.arrowClass;
				}
			}
			if(c){
				this._setRightIconAttr(c);
			}
		},

		_setIconAttr: function(icon){
			if(!this.getParent()){ return; } // icon may be invalid because inheritParams is not called yet
			this.icon = icon;
			var a = this.anchorNode;
			dojo.empty(this.iconNode);
			if(icon && icon !== "none"){
				dojox.mobile.createIcon(icon, this.iconPos, null, this.alt, this.iconNode);
				if(this.iconPos){
					dojo.addClass(this.iconNode.firstChild, "mblListItemSpriteIcon");
				}
				dojo.removeClass(a, "mblListItemAnchorNoIcon");
			}else{
				dojo.addClass(a, "mblListItemAnchorNoIcon");
			}
		},
	
		_setCheckedAttr: function(/*Boolean*/checked){
			var parent = this.getParent();
			if(parent.select === "single" && checked){
				dojo.forEach(parent.getChildren(), function(child){
					child.set("checked", false);
				});
			}
			this._setRightIconAttr(this.checkClass);
			this.rightIconNode.style.display = checked ? "" : "none";
			dojo.toggleClass(this.domNode, "mblListItemChecked", checked);
			if(this.checked !== checked){
				this.getParent().onCheckStateChanged(this, checked);
			}
			this.checked = checked;
		},
	
		_setRightTextAttr: function(/*String*/text){
			this.rightText = text;
			this.rightTextNode.innerHTML = this._cv(text);
		},
	
		_setRightIconAttr: function(/*String*/icon){
			this.rightIcon = icon;
			dojo.empty(this.rightIconNode);
			dojox.mobile.createIcon(icon, null, null, this.rightIconTitle, this.rightIconNode);
		},
	
		_setRightIcon2Attr: function(/*String*/icon){
			this.rightIcon2 = icon;
			dojo.empty(this.rightIcon2Node);
			dojox.mobile.createIcon(icon, null, null, this.rightIcon2Title, this.rightIcon2Node);
		},
	
		_setLabelAttr: function(/*String*/text){
			this.label = text;
			this.labelNode.innerHTML = this._cv(text);
		}
	});
});

},
'dojox*mobile/EdgeToEdgeCategory':function(){
define(["./RoundRectCategory"],function(RoundRectCategory){
	return dojo.declare("dojox.mobile.EdgeToEdgeCategory", dojox.mobile.RoundRectCategory, {
		buildRendering: function(){
			this.inherited(arguments);
			this.domNode.className = "mblEdgeToEdgeCategory";
		}
	});
});

},
'dojox*mobile/ViewController':function(){
define(["dojo/_base/kernel", "dojo/_base/declare","dojo/on","dojo/_base/array","dojo/DeferredList","./TransitionEvent","./ProgressIndicator"],
	function(dojo, declare, on, darra, DeferredList, TransitionEvent, ProgressIndicator){

	var Controller = dojo.declare(null, {
		constructor: function(){
			this.viewMap={};
			this.currentView=null;
			this.defaultView=null;
			dojo.ready(dojo.hitch(this, function(){
				on(dojo.body(), "startTransition", dojo.hitch(this, "onStartTransition"));
			}));
		},

		findCurrentView: function(moveTo,src){
			if(moveTo){
				var w = dijit.byId(moveTo);
				if(w && w.getShowingView){ return w.getShowingView(); }
			}
			if (dojox.mobile.currentView) {
				return dojox.mobile.currentView;
			}
			w = src;
			while(true){
				w = w.getParent();
				if(!w){ return null; }
				if(w instanceof dojox.mobile.View){ break; }
			}
			return w;
		},

		onStartTransition: function(evt){
			//console.log("onStartTransition:", evt.detail, evt.detail.moveTo, evt.detail.href, evt.detail.scene, evt);
			evt.preventDefault();
			if(!evt.detail || (evt.detail && !evt.detail.moveTo && !evt.detail.href && !evt.detail.url && !evt.detail.scene)){ return; }
			var w = this.findCurrentView(evt.detail.moveTo, (evt.target && evt.target.id)?dijit.byId(evt.target.id):dijit.byId(evt.target)); // the current view widget
			if(!w || (evt.detail && evt.detail.moveTo && w === dijit.byId(evt.detail.moveTo))){ return; }
			if(evt.detail.href){
				var t = dijit.byId(evt.target.id).hrefTarget;
				if(t){
					dojox.mobile.openWindow(evt.detail.href, t);
				}else{
					w.performTransition(null, evt.detail.transitionDir, evt.detail.transition, evt.target, function(){location.href = evt.detail.href;});
				}
				return;
			} else if(evt.detail.scene){
				dojo.publish("/dojox/mobile/app/pushScene", [evt.detail.scene]);
				return;
			}
			var moveTo = evt.detail.moveTo;
			if(evt.detail.url){
				var id;
				if(dojox.mobile._viewMap && dojox.mobile._viewMap[evt.detail.url]){
					// external view has already been loaded
					id = dojox.mobile._viewMap[evt.detail.url];
				}else{
					// get the specified external view and append it to the <body>
					var text = this._text;
					if(!text){
						if(dijit.byId(evt.target.id).sync){
							text = dojo.trim(dojo._getText(evt.detail.url));
						}else{
							require(["dojo/_base/xhr"], dojo.hitch(this, function(xhr){ 
								var prog = ProgressIndicator.getInstance();
								dojo.body().appendChild(prog.domNode);
								prog.start();
								var xhr = dojo.xhrGet({
									url: evt.detail.url,
									handleAs: "text"
								});
								xhr.addCallback(dojo.hitch(this, function(response, ioArgs){
									prog.stop();
									if(response){
										this._text = response;
										new TransitionEvent(evt.target, {
												transition: evt.detail.transition,
											 	transitionDir: evt.detail.transitionDir, 
											 	moveTo: moveTo, 
											 	href: evt.detail.href, 
											 	url: evt.detail.url, 
											 	scene: evt.detail.scene}, 
											 		evt.detail)
											 			.dispatch(); 
									}
								}));
								xhr.addErrback(function(error){
									prog.stop();
									console.log("Failed to load "+evt.detail.url+"\n"+(error.description||error));
								});
							}));
							return;
						}
					}
					this._text = null;
					id = this._parse(text);
					if(!dojox.mobile._viewMap){
						dojox.mobile._viewMap = [];
					}
					dojox.mobile._viewMap[evt.detail.url] = id;
				}
				moveTo = id;
				w = this.findCurrentView(moveTo,dijit.byId(evt.target.id)) || w; // the current view widget
			}
			w.performTransition(moveTo, evt.detail.transitionDir, evt.detail.transition, null, null);
		},

		_parse: function(text,id){
			var container = dojo.create("DIV");
			var view;
			var currentView	 = this.findCurrentView();
			var target = dijit.byId(id) && dijit.byId(id).containerNode 
						|| dojo.byId(id) 
						|| currentView && currentView.domNode.parentNode 
						|| dojo.body();
			if(text.charAt(0) == "<"){ // html markup
			//container.innerHTML = text;
			var container = dojo.create("DIV",{innerHTML: text});
				view = container.firstChild; // <div dojoType="dojox.mobile.View">
				if(!view && view.nodeType != 1){
					console.log("dojox.mobile._ItemBase#transitionTo: invalid view content");
					return;
				}
				view.style.visibility = "hidden";
				target.appendChild(container);
				var ws = dojo.parser.parse(container);
				dojo.forEach(ws, function(w){
					if(w && !w._started && w.startup){
						w.startup();
					}
				});
				target.appendChild(target.removeChild(container).firstChild); // reparent
				dijit.byNode(view)._visible = true;
			}else if(text.charAt(0) == "{"){ // json
				target.appendChild(container);
				this._ws = [];
				view = this._instantiate(eval('('+text+')'), container);
				for(var i = 0; i < this._ws.length; i++){
						var w = this._ws[i];
						w.startup && !w._started && (!w.getParent || !w.getParent()) && w.startup();
				}
				this._ws = null;
			}
			view.style.display = "none";
			view.style.visibility = "visible";
			var id = view.id;
			return dojo.hash ? "#" + id : id;
		},

		_instantiate: function(/*Object*/obj, /*DomNode*/node, /*Widget*/parent){
			var widget;
			for(var key in obj){
				if(key.charAt(0) == "@"){ continue; }
				var cls = dojo.getObject(key);
				if(!cls){ continue; }
				var params = {};
				var proto = cls.prototype;
				var objs = dojo.isArray(obj[key]) ? obj[key] : [obj[key]];
				for(var i = 0; i < objs.length; i++){
					for(var prop in objs[i]){
						if(prop.charAt(0) == "@"){
							var val = objs[i][prop];
							prop = prop.substring(1);
							if(typeof proto[prop] == "string"){
								params[prop] = val;
							}else if(typeof proto[prop] == "number"){
								params[prop] = val - 0;
							}else if(typeof proto[prop] == "boolean"){
							params[prop] = (val != "false");
							}else if(typeof proto[prop] == "object"){
								params[prop] = eval("(" + val + ")");
							}
						}
					}
					widget = new cls(params, node);
					if(node){ // to call View's startup()
						widget._visible = true;
						this._ws.push(widget);
					}
					if(parent && parent.addChild){
						parent.addChild(widget);
					}
					this._instantiate(objs[i], null, widget);
				}
			}
			return widget && widget.domNode;
		}
	});
	new Controller(); // singleton
	return Controller;
});


},
'dojox*mobile/_base':function(){
define([
  "./common",
  "./View",
  "./Heading",
  "./RoundRect",
  "./RoundRectCategory",
  "./EdgeToEdgeCategory",
  "./RoundRectList",
  "./EdgeToEdgeList",
  "./ListItem",
  "./Switch",
  "./ToolBarButton",
  "./ProgressIndicator"
], function(dojo, dijit) {
	// module:
	//		dojox/mobile/_base
	// summary:
	//		TODOC

return dojox.mobile._base;
});

},
'dojox*mobile/Heading':function(){
define(["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/html", "dojo/_base/array", "dojo/_base/lang", "./common","dijit/_WidgetBase","dijit/_Container","dijit/_Contained"],
	function(dojo, declare, dhtml, darray, dlang, mcommon, WidgetBase, Container, Contained){
	// module:
	//		dojox/mobile/Heading
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.Heading", [dijit._WidgetBase,dijit._Container,dijit._Contained],{
		back: "",
		href: "",
		moveTo: "",
		transition: "slide",
		label: "",
		iconBase: "",
		backProp: {className: "mblArrowButton"},
		tag: "H1",

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement(this.tag);
			this.domNode.className = "mblHeading";
			if(!this.label){
				dojo.forEach(this.domNode.childNodes, function(n){
					if(n.nodeType == 3){
						var v = dojo.trim(n.nodeValue);
						if(v){
							this.label = v;
							this.labelNode = dojo.create("SPAN", {innerHTML:v}, n, "replace");
						}
					}
				}, this);
			}
			if(!this.labelNode){
				this.labelNode = dojo.create("SPAN", null, this.domNode);
			}
			this.labelNode.className = "mblHeadingSpanTitle";
			this.labelDivNode = dojo.create("DIV", {
				className: "mblHeadingDivTitle",
				innerHTML: this.labelNode.innerHTML
			}, this.domNode);
		},

		startup: function(){
			if(this._started){ return; }
			var parent = this.getParent && this.getParent();
			if(!parent || !parent.resize){ // top level widget
				var _this = this;
				setTimeout(function(){ // necessary to render correctly
					_this.resize();
				}, 0);
			}
			this.inherited(arguments);
		},
	
		resize: function(){
			if(this._btn){
				this._btn.style.width = this._body.offsetWidth + this._head.offsetWidth + "px";
			}
			if(this.labelNode){
				// find the rightmost left button (B), and leftmost right button (C)
				// +-----------------------------+
				// | |A| |B|             |C| |D| |
				// +-----------------------------+
				var leftBtn, rightBtn;
				var children = this.containerNode.childNodes;
				for(var i = children.length - 1; i >= 0; i--){
					var c = children[i];
					if(c.nodeType === 1){
						if(!rightBtn && dojo.hasClass(c, "mblToolbarButton") && dojo.style(c, "float") === "right"){
							rightBtn = c;
						}
						if(!leftBtn && (dojo.hasClass(c, "mblToolbarButton") && dojo.style(c, "float") === "left" || c === this._btn)){
							leftBtn = c;
						}
					}
				}

				if(!this.labelNodeLen && this.label){
					this.labelNode.style.display = "inline";
					this.labelNodeLen = this.labelNode.offsetWidth;
					this.labelNode.style.display = "";
				}

				var bw = this.domNode.offsetWidth; // bar width
				var rw = rightBtn ? bw - rightBtn.offsetLeft + 5 : 0; // rightBtn width
				var lw = leftBtn ? leftBtn.offsetLeft + leftBtn.offsetWidth + 5 : 0; // leftBtn width
				var tw = this.labelNodeLen || 0; // title width
				dojo[bw - Math.max(rw,lw)*2 > tw ? "addClass" : "removeClass"](this.domNode, "mblHeadingCenterTitle");
			}
			dojo.forEach(this.getChildren(), function(child){
				if(child.resize){ child.resize(); }
			});
		},

		_setBackAttr: function(/*String*/back){
			if(!this._btn){
				var btn = dojo.create("DIV", this.backProp, this.domNode, "first");
				var head = dojo.create("DIV", {className:"mblArrowButtonHead"}, btn);
				var body = dojo.create("DIV", {className:"mblArrowButtonBody mblArrowButtonText"}, btn);

				this._body = body;
				this._head = head;
				this._btn = btn;
				this.backBtnNode = btn;
				this.connect(body, "onclick", "onClick");
				var neck = dojo.create("DIV", {className:"mblArrowButtonNeck"}, btn);
			}
			this.back = back;
			this._body.innerHTML = this._cv(this.back);
			this.resize();
		},
	
		_setLabelAttr: function(/*String*/label){
			this.label = label;
			this.labelNode.innerHTML = this.labelDivNode.innerHTML = this._cv(label);
		},
	
		findCurrentView: function(){
			var w = this;
			while(true){
				w = w.getParent();
				if(!w){ return null; }
				if(w instanceof dojox.mobile.View){ break; }
			}
			return w;
		},

		onClick: function(e){
			var h1 = this.domNode;
			dojo.addClass(h1, "mblArrowButtonSelected");
			setTimeout(function(){
				dojo.removeClass(h1, "mblArrowButtonSelected");
			}, 1000);

			if (this.back && !this.moveTo && !this.href && history){
				history.back();	
				return;
			}	
	
			// keep the clicked position for transition animations
			var view = this.findCurrentView();
			if(view){
				view.clickedPosX = e.clientX;
				view.clickedPosY = e.clientY;
			}
			this.goTo(this.moveTo, this.href);
		},
	
		goTo: function(moveTo, href){
			var view = this.findCurrentView();
			if(!view){ return; }
			if(href){
				view.performTransition(null, -1, this.transition, this, function(){location.href = href;});
			}else{
				if(dojox.mobile.app && dojox.mobile.app.STAGE_CONTROLLER_ACTIVE){
					// If in a full mobile app, then use its mechanisms to move back a scene
					dojo.publish("/dojox/mobile/app/goback");
				}else{
					// Basically transition should be performed between two
					// siblings that share the same parent.
					// However, when views are nested and transition occurs from
					// an inner view, search for an ancestor view that is a sibling
					// of the target view, and use it as a source view.
					var node = dijit.byId(view.convertToId(moveTo));
					if(node){
						var parent = node.getParent();
						while(view){
							var myParent = view.getParent();
							if (parent === myParent){
								break;
							}
							view = myParent;
						}
					}
					if(view){
						view.performTransition(moveTo, -1, this.transition);
					}
				}
			}
		}
	});
});

},
'dojox*mobile/transition':function(){
define(["dojo/_base/kernel", "dojo/_base/array","dojo/_base/html","dojo/DeferredList"],
	function(dojo, darray, dhtml, DeferredList){
	return function(from, to, options){
		var rev = (options && options.reverse) ? " mblReverse" : "";
		if(!options || !options.transition){
			console.log("from: ", from, "to: ", to);
			if (from && from.tagname) {
				dojo.style(from,"display","none");
			}
			if (to){
				dojo.style(to, "display", "");
			}
		}else{
			var defs=[];
			if(to){
				dojo.style(to, "display", "");
			}
			if (from){
				dojo.style(from, "display", ""); 
				var fromDef = new dojo.Deferred();
				var fromHandle = dojo.connect(from, "webkitAnimationEnd", function(){
					dojo.style(from,"display","none");
					//remove the animation classes in the node
					dojo.forEach([options.transition,"mblIn","mblOut","mblReverse"], function(item){
						dojo.removeClass(from, item);
					});
					
					dojo.disconnect(fromHandle);		
					fromDef.resolve(from);
				}); 
				defs.push(fromDef);
			}
			
			var toDef = new dojo.Deferred();
			var toHandle= dojo.connect(to, "webkitAnimationEnd", function(){
				//remove the animation classes in the node
				dojo.forEach([options.transition,"mblIn","mblOut","mblReverse"], function(item){
					dojo.removeClass(to, item);
				});
				
				dojo.disconnect(toHandle);		
				toDef.resolve(to);
			}); 

			defs.push(toDef);
			options.transition = "mbl"+(options.transition.charAt(0).toUpperCase() + options.transition.substring(1));

			dojo.addClass(from, options.transition + " mblOut" + rev);
			dojo.addClass(to, options.transition + " mblIn" + rev);

			return new dojo.DeferredList(defs);
			
		}
	}
});

},
'dojo*Stateful':function(){
define(["./_base/kernel", "./_base/declare", "./_base/array"], function(dojo, declare) {
	// module:
	//		dojo/Stateful
	// summary:
	//		TODOC

return dojo.declare("dojo.Stateful", null, {
	// summary:
	//		Base class for objects that provide named properties with optional getter/setter
	//		control and the ability to watch for property changes
	// example:
	//	|	var obj = new dojo.Stateful();
	//	|	obj.watch("foo", function(){
	//	|		console.log("foo changed to " + this.get("foo"));
	//	|	});
	//	|	obj.set("foo","bar");
	postscript: function(mixin){
		if(mixin){
			dojo.mixin(this, mixin);
		}
	},

	get: function(/*String*/name){
		// summary:
		//		Get a property on a Stateful instance.
		//	name:
		//		The property to get.
		// description:
		//		Get a named property on a Stateful object. The property may
		//		potentially be retrieved via a getter method in subclasses. In the base class
		// 		this just retrieves the object's property.
		// 		For example:
		//	|	stateful = new dojo.Stateful({foo: 3});
		//	|	stateful.get("foo") // returns 3
		//	|	stateful.foo // returns 3

		return this[name];
	},
	set: function(/*String*/name, /*Object*/value){
		// summary:
		//		Set a property on a Stateful instance
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		// description:
		//		Sets named properties on a stateful object and notifies any watchers of
		// 		the property. A programmatic setter may be defined in subclasses.
		// 		For example:
		//	|	stateful = new dojo.Stateful();
		//	|	stateful.watch(function(name, oldValue, value){
		//	|		// this will be called on the set below
		//	|	}
		//	|	stateful.set(foo, 5);
		//
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|	myObj.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	})
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)
		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks){
			this._watchCallbacks(name, oldValue, value);
		}
		return this;
	},
	watch: function(/*String?*/name, /*Function*/callback){
		// summary:
		//		Watches a property for changes
		//	name:
		//		Indicates the property to watch. This is optional (the callback may be the
		// 		only parameter), and if omitted, all the properties will be watched
		// returns:
		//		An object handle for the watch. The unwatch method of this object
		// 		can be used to discontinue watching this property:
		//		|	var watchHandle = obj.watch("foo", callback);
		//		|	watchHandle.unwatch(); // callback won't be called now
		//	callback:
		//		The function to execute when the property changes. This will be called after
		//		the property has been changed. The callback will be called with the |this|
		//		set to the instance, the first argument as the name of the property, the
		// 		second argument as the old value and the third argument as the new value.

		var callbacks = this._watchCallbacks;
		if(!callbacks){
			var self = this;
			callbacks = this._watchCallbacks = function(name, oldValue, value, ignoreCatchall){
				var notify = function(propertyCallbacks){
					if(propertyCallbacks){
                        propertyCallbacks = propertyCallbacks.slice();
						for(var i = 0, l = propertyCallbacks.length; i < l; i++){
							try{
								propertyCallbacks[i].call(self, name, oldValue, value);
							}catch(e){
								console.error(e);
							}
						}
					}
				};
				notify(callbacks['_' + name]);
				if(!ignoreCatchall){
					notify(callbacks["*"]); // the catch-all
				}
			}; // we use a function instead of an object so it will be ignored by JSON conversion
		}
		if(!callback && typeof name === "function"){
			callback = name;
			name = "*";
		}else{
			// prepend with dash to prevent name conflicts with function (like "name" property)
			name = '_' + name;
		}
		var propertyCallbacks = callbacks[name];
		if(typeof propertyCallbacks !== "object"){
			propertyCallbacks = callbacks[name] = [];
		}
		propertyCallbacks.push(callback);
		return {
			unwatch: function(){
				propertyCallbacks.splice(dojo.indexOf(propertyCallbacks, callback), 1);
			}
		};
	}

});

});

},
'dijit*main':function(){
define("dijit/main", [
	"dojo/_base/kernel"
], function(dojo){
	// module:
	//		dijit
	// summary:
	//		The dijit package main module

	return dojo.dijit;
});

},
'dojox*mobile/ToolBarButton':function(){
define(["dojo/_base/kernel", "dojo/_base/declare", "dojo/_base/array","dojo/_base/html", "./_ItemBase"],
	function(dojo, declare, darray, dhtml, ItemBase){
	// module:
	//		dojox/mobile/ToolBarButton
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.ToolBarButton", dojox.mobile._ItemBase, {
		selected: false,
		btnClass: "",
		_defaultColor: "mblColorDefault",
		_selColor: "mblColorDefaultSel",

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement("div");
			this.inheritParams();
			dojo.addClass(this.domNode, "mblToolbarButton mblArrowButtonText");
			var color;
			if(this.selected){
				color = this._selColor;
			}else if(this.domNode.className.indexOf("mblColor") == -1){
				color = this._defaultColor;
			}
			dojo.addClass(this.domNode, color);
	
			if(!this.label){
				this.label = this.domNode.innerHTML;
			}
			this.domNode.innerHTML = this._cv(this.label);
	
			if(this.icon && this.icon != "none"){
				var img;
				if(this.iconPos){
					var iconDiv = dojo.create("DIV", null, this.domNode);
					img = dojo.create("IMG", null, iconDiv);
					img.style.position = "absolute";
					var arr = this.iconPos.split(/[ ,]/);
					dojo.style(iconDiv, {
						position: "relative",
						width: arr[2] + "px",
						height: arr[3] + "px"
					});
				}else{
					img = dojo.create("IMG", null, this.domNode);
				}
				img.src = this.icon;
				img.alt = this.alt;
				dojox.mobile.setupIcon(img, this.iconPos);
				this.iconNode = img;
			}else{
				if(dojox.mobile.createDomButton(this.domNode)){
					dojo.addClass(this.domNode, "mblToolbarButtonDomButton");
				}
			}
			this.connect(this.domNode, "onclick", "onClick");
		},
	
		select: function(/*Boolean?*/deselect){
			dojo.toggleClass(this.domNode, this._selColor, !deselect);
			this.selected = !deselect;
		},
	
		onClick: function(e){
			this.setTransitionPos(e);
			this.defaultClickAction();
		},
	
		_setBtnClassAttr: function(/*String*/btnClass){
			var node = this.domNode;
			if(node.className.match(/(mblDomButton\w+)/)){
				dojo.removeClass(node, RegExp.$1);
			}
			dojo.addClass(node, btnClass);
			if(dojox.mobile.createDomButton(this.domNode)){
				dojo.addClass(this.domNode, "mblToolbarButtonDomButton");
			}
		}
	});
});

},
'dojox*mobile/_ItemBase':function(){
define("dojox/mobile/_ItemBase", ["./common","dijit/_WidgetBase","dijit/_Container","dijit/_Contained","./ProgressIndicator","./TransitionEvent"], function(mcommon,WidgetBase,Container,Contained,ProgressIndicator,TransitionEvent){
	// module:
	//		dojox/mobile/_ItemBase
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile._ItemBase", [dijit._WidgetBase,dijit._Container,dijit._Contained],{
		icon: "",
		iconPos: "", // top,left,width,height (ex. "0,0,29,29")
		alt: "",
		href: "",
		hrefTarget: "",
		moveTo: "",
		scene: "",
		clickable: false,
		url: "",
		urlTarget: "", // node id under which a new view is created
		transition: "",
		transitionDir: 1,
		transitionOptions: null,
		callback: null,
		sync: true,
		label: "",
		toggle: false,
		_duration: 800, // duration of selection, milliseconds
	
		inheritParams: function(){
			var parent = this.getParent();
			if(parent){
				if(!this.transition){ this.transition = parent.transition; }
				if(this.icon && parent.iconBase &&
					parent.iconBase.charAt(parent.iconBase.length - 1) === '/'){
					this.icon = parent.iconBase + this.icon;
				}
				if(!this.icon){ this.icon = parent.iconBase; }
				if(!this.iconPos){ this.iconPos = parent.iconPos; }
			}
		},
	
		select: function(/*Boolean?*/deselect){
			// subclass must implement
		},
	
		defaultClickAction: function(e){
			if(this.toggle){
				this.select(this.selected);
			}else if(!this.selected){
				this.select();
				if(!this.selectOne){
					var _this = this;
					setTimeout(function(){
						_this.select(true);
					}, this._duration);
				}
				var transOpts;
				if (this.moveTo || this.href || this.url || this.scene){
					transOpts = {moveTo: this.moveTo, href: this.href, url: this.url, scene: this.scene, transition: this.transition, transitionDir: this.transitionDir};
				}else if (this.transitionOptions){
					transOpts = this.transitionOptions;
				}	
				if (transOpts){
					return new TransitionEvent(this.domNode,transOpts,e).dispatch();
				}
			}
		},
	
		getParent: function(){
			// almost equivalent to _Contained#getParent, but this method does not
			// cause a script error even if this widget has no parent yet.
			var ref = this.srcNodeRef || this.domNode;
			return ref && ref.parentNode ? dijit.getEnclosingWidget(ref.parentNode) : null;
		},

		setTransitionPos: function(e){
			var w = this;
			while(true){
				w = w.getParent();
				if(!w || w instanceof dojox.mobile.View){ break; }
			}
			if(w){
				w.clickedPosX = e.clientX;
				w.clickedPosY = e.clientY;
			}
		},

		transitionTo: function(moveTo,href,url,scene){
			// deprecated
			if(dojo.config.isDebug){
				var alreadyCalledHash = arguments.callee._ach || (arguments.callee._ach = {}),
					caller = (arguments.callee.caller || "unknown caller").toString();
				if(!alreadyCalledHash[caller]){
					dojo.deprecated(this.declaredClass + "::transitionTo() is deprecated." +
					caller, "", "2.0");
					alreadyCalledHash[caller] = true;
				}
			}
			new TransitionEvent(this.domNode, {moveTo: moveTo, href: href, url: url, scene: scene,
						transition: this.transition, transitionDir: this.transitionDir}).dispatch();
		}
	});
});

},
'dojox*mobile/RoundRectList':function(){
define(["dijit/_WidgetBase", "dijit/_Container", "dijit/_Contained"], function(WidgetBase,Container,Contained){
	// module:
	//		dojox/mobile/RoundRectList
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.RoundRectList", [dijit._WidgetBase,dijit._Container,dijit._Contained], {
		transition: "slide",
		iconBase: "",
		iconPos: "",
		select: "", // "single", "multiple", or ""
		stateful: false, // keep the selection state or not

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement("UL");
			this.domNode.className = "mblRoundRectList";
		},
	
		onCheckStateChanged: function(/*Widget*/listItem, /*String*/newState){
			// Stub function to connect to from your application.
		},

		_setStatefulAttr: function(stateful){
			this.stateful = stateful;
			dojo.forEach(this.getChildren(), function(child){
				child.setArrow && child.setArrow();
			});
		},

		deselectItem: function(/*ListItem*/item){
			item.deselectItem();
		},

		deselectAll: function(){
			dojo.forEach(this.getChildren(), function(child){
				child.deselect && child.deselect();
			});
		},

		selectItem: function(/*ListItem*/item){
			item.select();
		}
	});
});

},
'dojox*main':function(){
define(["dojo/_base/kernel"], function(dojo) {
	// module:
	//		dojox/main
	// summary:
	//		The dojox package main module; dojox package is somewhat unusual in that the main module currently just provides an empty object.

	return dojo.dojox;
});
},
'dojox*mobile/View':function(){
define("dojox/mobile/View", ["./common","dijit/_WidgetBase","dijit/_Container","dijit/_Contained","./ViewController"], function(mcommon,WidgetBase,Container,Contained){
	// module:
	//		dojox/mobile/View
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.View", [dijit._WidgetBase,dijit._Container,dijit._Contained],{
		// summary:
		//		A widget that represents a view that occupies the full screen
		// description:
		//		View acts as a container for any HTML and/or widgets. An entire HTML page
		//		can have multiple View widgets and the user can navigate through
		//		the views back and forth without page transitions.
	
		// selected: Boolean
		//		If true, the view is displayed at startup time.
		selected: false,

		// keepScrollPos: Boolean
		//		If true, the scroll position is kept between views.
		keepScrollPos: true,
	
		constructor: function(params, node){
			if(node){
				dojo.byId(node).style.visibility = "hidden";
			}
		},
	
		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement("DIV");
			this.domNode.className = "mblView";
			if(dojo.config["mblAndroidWorkaround"] !== false && dojo.isAndroid >= 2.2 && dojo.isAndroid < 3.1){ // workaround for android screen flicker problem
				if(dojo.isAndroid < 3){ // for Android 2.2.x and 2.3.x
					dojo.style(this.domNode, "webkitTransform", "translate3d(0,0,0)");
					// workaround for auto-scroll issue when focusing input fields
					this.connect(null, "onfocus", function(e){
						dojo.style(this.domNode, "webkitTransform", "");
					});
					this.connect(null, "onblur", function(e){
						dojo.style(this.domNode, "webkitTransform", "translate3d(0,0,0)");
					});
				}else{ // for Android 3.0.x
					if(dojo.config["mblAndroid3Workaround"] !== false){
						dojo.style(this.domNode, {
							webkitBackfaceVisibility: "hidden",
							webkitPerspective: 8000
						});
					}
				}
			}
			this.connect(this.domNode, "webkitAnimationEnd", "onAnimationEnd");
			this.connect(this.domNode, "webkitAnimationStart", "onAnimationStart");
			var id = location.href.match(/#(\w+)([^\w=]|$)/) ? RegExp.$1 : null;
	
			this._visible = this.selected && !id || this.id == id;
	
			if(this.selected){
				dojox.mobile._defaultView = this;
			}
		},

		startup: function(){
			if(this._started){ return; }
			var siblings = [];
			var children = this.domNode.parentNode.childNodes;
			var visible = false;
			// check if a visible view exists
			for(var i = 0; i < children.length; i++){
				var c = children[i];
				if(c.nodeType === 1 && dojo.hasClass(c, "mblView")){
					siblings.push(c);
					visible = visible || dijit.byNode(c)._visible;
				}
			}
			var _visible = this._visible;
			// if no visible view exists, make the first view visible
			if(siblings.length === 1 || (!visible && siblings[0] === this.domNode)){
				_visible = true;
			}
			var _this = this;
			setTimeout(function(){ // necessary to render the view correctly
				if(!_visible){
					_this.domNode.style.display = "none";
				}else{
					dojox.mobile.currentView = _this;
					_this.onStartView();
					dojo.publish("/dojox/mobile/startView", [_this]);
				}
				if(_this.domNode.style.visibility != "visible"){ // this check is to avoid screen flickers
					_this.domNode.style.visibility = "visible";
				}
				var parent = _this.getParent && _this.getParent();
				if(!parent || !parent.resize){ // top level widget
					_this.resize();
				}
			}, dojo.isIE?100:0); // give IE a little time to complete drawing
			this.inherited(arguments);
		},
	
		resize: function(){
			dojo.forEach(this.getChildren(), function(child){
				if(child.resize){ child.resize(); }
			});
		},

		onStartView: function(){
			// Stub function to connect to from your application.
			// Called only when this view is shown at startup time.
		},
	
		onBeforeTransitionIn: function(moveTo, dir, transition, context, method){
			// Stub function to connect to from your application.
		},
	
		onAfterTransitionIn: function(moveTo, dir, transition, context, method){
			// Stub function to connect to from your application.
		},
	
		onBeforeTransitionOut: function(moveTo, dir, transition, context, method){
			// Stub function to connect to from your application.
		},
	
		onAfterTransitionOut: function(moveTo, dir, transition, context, method){
			// Stub function to connect to from your application.
		},
	
		_saveState: function(moveTo, dir, transition, context, method){
			this._context = context;
			this._method = method;
			if(transition == "none"){
				transition = null;
			}
			this._moveTo = moveTo;
			this._dir = dir;
			this._transition = transition;
			this._arguments = dojo._toArray(arguments);
			this._args = [];
			if(context || method){
				for(var i = 5; i < arguments.length; i++){
					this._args.push(arguments[i]);
				}
			}
		},
	
		convertToId: function(moveTo){
			if(typeof(moveTo) == "string"){
				// removes a leading hash mark (#) and params if exists
				// ex. "#bar&myParam=0003" -> "bar"
				moveTo.match(/^#?([^&]+)/);
				return RegExp.$1;
			}
			return moveTo;
		},
	
		performTransition: function(/*String*/moveTo, /*Number*/dir, /*String*/transition,
									/*Object|null*/context, /*String|Function*/method /*optional args*/){
			// summary:
			//		Function to perform the various types of view transitions, such as fade, slide, and flip.
			// moveTo: String
			//		The destination view id to transition the current view to.
			//		If null, transitions to a blank view.
			//		If "#", returns immediately without transition.
			// dir: Number
			//		The transition direction. If 1, transition forward. If -1, transition backward.
			//		For example, the slide transition slides the view from right to left when dir == 1,
			//		and from left to right when dir == -1.
			// transision: String
			//		The type of transition to perform. "slide", "fade", or "flip"
			// context: Object
			//		The object that the callback function will receive as "this".
			// method: String|Function
			//		A callback function that is called when the transition has been finished.
			//		A function reference, or name of a function in context.
			// tags:
			//		public
			// example:
			//		Transitions to the blank view, and then opens another page.
			//	|	performTransition(null, 1, "slide", null, function(){location.href = href;});
			if(moveTo === "#"){ return; }
			if(dojo.hash){
				if(typeof(moveTo) == "string" && moveTo.charAt(0) == '#' && !dojox.mobile._params){
					dojox.mobile._params = [];
					for(var i = 0; i < arguments.length; i++){
						dojox.mobile._params.push(arguments[i]);
					}
					dojo.hash(moveTo);
					return;
				}
			}
			this._saveState.apply(this, arguments);
			var toNode;
			if(moveTo){
				toNode = this.convertToId(moveTo);
			}else{
				if(!this._dummyNode){
					this._dummyNode = dojo.doc.createElement("DIV");
					dojo.body().appendChild(this._dummyNode);
				}
				toNode = this._dummyNode;
			}
			var fromNode = this.domNode;
			var fromTop = fromNode.offsetTop;
			toNode = this.toNode = dojo.byId(toNode);
			if(!toNode){ console.log("dojox.mobile.View#performTransition: destination view not found: "+moveTo); return; }
			toNode.style.visibility = "hidden";
			toNode.style.display = "";
			var toWidget = dijit.byNode(toNode);
			if(toWidget){
				// Now that the target view became visible, it's time to run resize()
				dojox.mobile.resizeAll(null, toWidget);
	
				if(transition && transition != "none"){
					// Temporarily add padding to align with the fromNode while transition
					toWidget.containerNode.style.paddingTop = fromTop + "px";
				}
			}
	
			this.onBeforeTransitionOut.apply(this, arguments);
			dojo.publish("/dojox/mobile/beforeTransitionOut", [this].concat(dojo._toArray(arguments)));
			if(toWidget){
				// perform view transition keeping the scroll position
				if(this.keepScrollPos && !this.getParent()){
					var scrollTop = dojo.body().scrollTop || dojo.doc.documentElement.scrollTop || dojo.global.pageYOffset || 0;
					fromNode._scrollTop = scrollTop;
					var toTop = (dir == 1) ? 0 : (toNode._scrollTop || 0);
					toNode.style.top = "0px";
					if(scrollTop > 1 || toTop !== 0){
						fromNode.style.top = toTop - scrollTop + "px";
						if(dojo.config["mblHideAddressBar"] !== false){
							setTimeout(function(){ // iPhone needs setTimeout
								dojo.global.scrollTo(0, (toTop || 1));
							}, 0);
						}
					}
				}else{
					toNode.style.top = "0px";
				}
				toWidget.onBeforeTransitionIn.apply(toWidget, arguments);
				dojo.publish("/dojox/mobile/beforeTransitionIn", [toWidget].concat(dojo._toArray(arguments)));
			}
			toNode.style.display = "none";
			toNode.style.visibility = "visible";
			this._doTransition(fromNode, toNode, transition, dir);
		},
		_toCls: function(s){
			// convert from transition name to corresponding class name
			// ex. "slide" -> "mblSlide"
			return "mbl"+s.charAt(0).toUpperCase() + s.substring(1);
		},
	
		_doTransition: function(fromNode, toNode, transition, dir){
			var rev = (dir == -1) ? " mblReverse" : "";
			toNode.style.display = "";
			if(!transition || transition == "none"){
				this.domNode.style.display = "none";
				this.invokeCallback();
			}else{
				var s = this._toCls(transition);
				dojo.addClass(fromNode, s + " mblOut" + rev);
				dojo.addClass(toNode, s + " mblIn" + rev);
				// set transform origin
				var fromOrigin = "50% 50%";
				var toOrigin = "50% 50%";
				var scrollTop, posX, posY;
				if(transition.indexOf("swirl") != -1 || transition.indexOf("zoom") != -1){
					if(this.keepScrollPos && !this.getParent()){
						scrollTop = dojo.body().scrollTop || dojo.doc.documentElement.scrollTop || dojo.global.pageYOffset || 0;
					}else{
						scrollTop = -dojo.position(fromNode, true).y;
					}
					posY = dojo.global.innerHeight / 2 + scrollTop;
					fromOrigin = "50% " + posY + "px";
					toOrigin = "50% " + posY + "px";
				}else if(transition.indexOf("scale") != -1){
					var viewPos = dojo.position(fromNode, true);
					posX = ((this.clickedPosX !== undefined) ? this.clickedPosX : dojo.global.innerWidth / 2) - viewPos.x;
					if(this.keepScrollPos && !this.getParent()){
						scrollTop = dojo.body().scrollTop || dojo.doc.documentElement.scrollTop || dojo.global.pageYOffset || 0;
					}else{
						scrollTop = -viewPos.y;
					}
					posY = ((this.clickedPosY !== undefined) ? this.clickedPosY : dojo.global.innerHeight / 2) + scrollTop;
					fromOrigin = posX + "px " + posY + "px";
					toOrigin = posX + "px " + posY + "px";
				}
				dojo.style(fromNode, {webkitTransformOrigin:fromOrigin});
				dojo.style(toNode, {webkitTransformOrigin:toOrigin});
			}
			dojox.mobile.currentView = dijit.byNode(toNode);
		},
	
		onAnimationStart: function(e){
		},


		onAnimationEnd: function(e){
			if(e.animationName.indexOf("Out") === -1 &&
				e.animationName.indexOf("In") === -1 &&
				e.animationName.indexOf("Shrink") === -1){ return; }
			var isOut = false;
			if(dojo.hasClass(this.domNode, "mblOut")){
				isOut = true;
				this.domNode.style.display = "none";
				dojo.removeClass(this.domNode, [this._toCls(this._transition), "mblIn", "mblOut", "mblReverse"]);
			}else{
				// Reset the temporary padding
				this.containerNode.style.paddingTop = "";
			}
			if(e.animationName.indexOf("Shrink") !== -1){
				var li = e.target;
				li.style.display = "none";
				dojo.removeClass(li, "mblCloseContent");
			}
			if(isOut){
				this.invokeCallback();
			}
			// this.domNode may be destroyed as a result of invoking the callback,
			// so check for that before accessing it.
			this.domNode && (this.domNode.className = "mblView");

			// clear the clicked position
			this.clickedPosX = this.clickedPosY = undefined;
		},

		invokeCallback: function(){
			this.onAfterTransitionOut.apply(this, this._arguments);
			dojo.publish("/dojox/mobile/afterTransitionOut", [this].concat(this._arguments));
			var toWidget = dijit.byNode(this.toNode);
			if(toWidget){
				toWidget.onAfterTransitionIn.apply(toWidget, this._arguments);
				dojo.publish("/dojox/mobile/afterTransitionIn", [toWidget].concat(this._arguments));
			}

			var c = this._context, m = this._method;
			if(!c && !m){ return; }
			if(!m){
				m = c;
				c = null;
			}
			c = c || dojo.global;
			if(typeof(m) == "string"){
				c[m].apply(c, this._args);
			}else{
				m.apply(c, this._args);
			}
		},
	
		getShowingView: function(){
			// summary:
			//		Find the currently showing view from my sibling views.
			// description:
			//		Note that dojox.mobile.currentView is the last shown view.
			//		If the page consists of a splitter, there are multiple showing views.
			var nodes = this.domNode.parentNode.childNodes;
			for(var i = 0; i < nodes.length; i++){
				if(dojo.hasClass(nodes[i], "mblView") && dojo.style(nodes[i], "display") != "none"){
					return dijit.byNode(nodes[i]);
				}
			}
			return null;
		},
	
		show: function(){
			// summary:
			//		Shows this view without a transition animation.
			var view = this.getShowingView();
			if(view){
				view.domNode.style.display = "none"; // from-style
			}
			this.domNode.style.display = ""; // to-style
			dojox.mobile.currentView = this;
		}
	});
});

},
'dijit*_WidgetBase':function(){
define("dijit/_WidgetBase", [
	"require",			// require.toUrl
	"dojo/_base/kernel", // dojo.config.blankGif
	".",
	"dojo/aspect",
	"./_base/manager",
	"dojo/Stateful", // dojo.Stateful
	"dojo/_base/NodeList", // .map
	"dojo/_base/array", // dojo.forEach dojo.map
	"dojo/_base/connect", // dojo.connect dojo.disconnect dojo.subscribe dojo.unsubscribe
	"dojo/_base/declare", // dojo.declare
	"dojo/_base/html", // dojo.addClass dojo.attr dojo.byId dojo.create dojo.destroy dojo.place dojo.removeAttr dojo.replaceClass dojo.style
	"dojo/_base/lang", // dojo.hitch dojo.isArray dojo.isFunction dojo.isObject
	"dojo/_base/window", // dojo.doc.createTextNode
	"dojo/query" // dojo.query
], function(require, dojo, dijit, aspect){

// module:
//		dijit/_WidgetBase
// summary:
//		Future base class for all Dijit widgets.


dojo.declare("dijit._WidgetBase", dojo.Stateful, {
	// summary:
	//		Future base class for all Dijit widgets.
	// description:
	//		Future base class for all Dijit widgets.
	//		_Widget extends this class adding support for various features needed by desktop.
	//
	//		Provides stubs for widget lifecycle methods for subclasses to extend, like postMixInProperties(), buildRendering(),
	//		postCreate(), startup(), and destroy(), and also public API methods like set(), get(), and watch().
	//
	//		Widgets can provide custom setters/getters for widget attributes, which are called automatically by set(name, value).
	//		For an attribute XXX, define methods _setXXXAttr() and/or _getXXXAttr().
	//
	//		_setXXXAttr can also be a string/hash/array mapping from a widget attribute XXX to the widget's DOMNodes:
	//
	//		- DOM node attribute
	// |		_setFocusAttr: {node: "focusNode", type: "attribute"}
	// |		_setFocusAttr: "focusNode"	(shorthand)
	// |		_setFocusAttr: ""		(shorthand, maps to this.domNode)
	// 		Maps this.focus to this.focusNode.focus, or (last example) this.domNode.focus
	//
	//		- DOM node innerHTML
	//	|		_setTitleAttr: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		_setTitleAttr: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		_setMyClassAttr: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value of _setXXXAttr is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		If the custom setter is null, no action is performed other than saving the new value
	//		in the widget (in this).
	//
	//		If no custom setter is defined for an attribute, then it will be copied
	//		to this.focusNode (if the widget defines a focusNode), or this.domNode otherwise.
	//		That's only done though for attributes that match DOMNode attributes (title,
	//		alt, aria-labelledby, etc.)

	// id: [const] String
	//		A unique, opaque ID string that can be assigned by users or by the
	//		system. If the developer passes an ID which is known not to be
	//		unique, the specified ID is ignored and the system-generated ID is
	//		used instead.
	id: "",
	_setIdAttr: "domNode",	// to copy to this.domNode even for auto-generated id's

	// lang: [const] String
	//		Rarely used.  Overrides the default Dojo locale used to render this widget,
	//		as defined by the [HTML LANG](http://www.w3.org/TR/html401/struct/dirlang.html#adef-lang) attribute.
	//		Value must be among the list of locales specified during by the Dojo bootstrap,
	//		formatted according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt) (like en-us).
	lang: "",
	_setLangAttr: "domNode",	// to set on domNode even when there's a focus node

	// dir: [const] String
	//		Bi-directional support, as defined by the [HTML DIR](http://www.w3.org/TR/html401/struct/dirlang.html#adef-dir)
	//		attribute. Either left-to-right "ltr" or right-to-left "rtl".  If undefined, widgets renders in page's
	//		default direction.
	dir: "",
	_setDirAttr: "domNode",	// to set on domNode even when there's a focus node

	// textDir: String
	//		Bi-directional support,	the main variable which is responsible for the direction of the text.
	//		The text direction can be different than the GUI direction by using this parameter in creation
	//		of a widget.
	// 		Allowed values:
	//			1. "ltr"
	//			2. "rtl"
	//			3. "auto" - contextual the direction of a text defined by first strong letter.
	//		By default is as the page direction.
	textDir: "",

	// class: String
	//		HTML class attribute
	"class": "",
	_setClassAttr: { node: "domNode", type: "class" },

	// style: String||Object
	//		HTML style attributes as cssText string or name/value hash
	style: "",

	// title: String
	//		HTML title attribute.
	//
	//		For form widgets this specifies a tooltip to display when hovering over
	//		the widget (just like the native HTML title attribute).
	//
	//		For TitlePane or for when this widget is a child of a TabContainer, AccordionContainer,
	//		etc., it's used to specify the tab label, accordion pane title, etc.
	title: "",

	// tooltip: String
	//		When this widget's title attribute is used to for a tab label, accordion pane title, etc.,
	//		this specifies the tooltip to appear when the mouse is hovered over that text.
	tooltip: "",

	// baseClass: [protected] String
	//		Root CSS class of the widget (ex: dijitTextBox), used to construct CSS classes to indicate
	//		widget state.
	baseClass: "",

	// srcNodeRef: [readonly] DomNode
	//		pointer to original DOM node
	srcNodeRef: null,

	// domNode: [readonly] DomNode
	//		This is our visible representation of the widget! Other DOM
	//		Nodes may by assigned to other properties, usually through the
	//		template system's dojoAttachPoint syntax, but the domNode
	//		property is the canonical "top level" node in widget UI.
	domNode: null,

	// containerNode: [readonly] DomNode
	//		Designates where children of the source DOM node will be placed.
	//		"Children" in this case refers to both DOM nodes and widgets.
	//		For example, for myWidget:
	//
	//		|	<div dojoType=myWidget>
	//		|		<b> here's a plain DOM node
	//		|		<span dojoType=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//		|	</div>
	//
	//		containerNode would point to:
	//
	//		|		<b> here's a plain DOM node
	//		|		<span dojoType=subWidget>and a widget</span>
	//		|		<i> and another plain DOM node </i>
	//
	//		In templated widgets, "containerNode" is set via a
	//		dojoAttachPoint assignment.
	//
	//		containerNode must be defined for any widget that accepts innerHTML
	//		(like ContentPane or BorderContainer or even Button), and conversely
	//		is null for widgets that don't, like TextBox.
	containerNode: null,

/*=====
	// _started: Boolean
	//		startup() has completed.
	_started: false,
=====*/

	// attributeMap: [protected] Object
	//		Deprecated.   Instead of attributeMap, widget should have a _setXXXAttr attribute
	//		for each XXX attribute to be mapped to the DOM.
	//
	//		attributeMap sets up a "binding" between attributes (aka properties)
	//		of the widget and the widget's DOM.
	//		Changes to widget attributes listed in attributeMap will be
	//		reflected into the DOM.
	//
	//		For example, calling set('title', 'hello')
	//		on a TitlePane will automatically cause the TitlePane's DOM to update
	//		with the new title.
	//
	//		attributeMap is a hash where the key is an attribute of the widget,
	//		and the value reflects a binding to a:
	//
	//		- DOM node attribute
	// |		focus: {node: "focusNode", type: "attribute"}
	// 		Maps this.focus to this.focusNode.focus
	//
	//		- DOM node innerHTML
	//	|		title: { node: "titleNode", type: "innerHTML" }
	//		Maps this.title to this.titleNode.innerHTML
	//
	//		- DOM node innerText
	//	|		title: { node: "titleNode", type: "innerText" }
	//		Maps this.title to this.titleNode.innerText
	//
	//		- DOM node CSS class
	// |		myClass: { node: "domNode", type: "class" }
	//		Maps this.myClass to this.domNode.className
	//
	//		If the value is an array, then each element in the array matches one of the
	//		formats of the above list.
	//
	//		There are also some shorthands for backwards compatibility:
	//		- string --> { node: string, type: "attribute" }, for example:
	//	|	"focusNode" ---> { node: "focusNode", type: "attribute" }
	//		- "" --> { node: "domNode", type: "attribute" }
	attributeMap: {},

	// _blankGif: [protected] String
	//		Path to a blank 1x1 image.
	//		Used by <img> nodes in templates that really get their image via CSS background-image.
	_blankGif: dojo.config.blankGif || require.toUrl("dojo/resources/blank.gif"),

	//////////// INITIALIZATION METHODS ///////////////////////////////////////

	postscript: function(/*Object?*/params, /*DomNode|String*/srcNodeRef){
		// summary:
		//		Kicks off widget instantiation.  See create() for details.
		// tags:
		//		private
		this.create(params, srcNodeRef);
	},

	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		// summary:
		//		Kick off the life-cycle of a widget
		// params:
		//		Hash of initialization parameters for widget, including
		//		scalar values (like title, duration etc.) and functions,
		//		typically callbacks like onClick.
		// srcNodeRef:
		//		If a srcNodeRef (DOM node) is specified:
		//			- use srcNodeRef.innerHTML as my contents
		//			- if this is a behavioral widget then apply behavior
		//			  to that srcNodeRef
		//			- otherwise, replace srcNodeRef with my generated DOM
		//			  tree
		// description:
		//		Create calls a number of widget methods (postMixInProperties, buildRendering, postCreate,
		//		etc.), some of which of you'll want to override. See http://docs.dojocampus.org/dijit/_Widget
		//		for a discussion of the widget creation lifecycle.
		//
		//		Of course, adventurous developers could override create entirely, but this should
		//		only be done as a last resort.
		// tags:
		//		private

		// store pointer to original DOM tree
		this.srcNodeRef = dojo.byId(srcNodeRef);

		// For garbage collection.  An array of listener handles returned by this.connect() / this.subscribe()
		this._connects = [];

		// For widgets internal to this widget, invisible to calling code
		this._supportingWidgets = [];

		// this is here for back-compat, remove in 2.0 (but check NodeList-instantiate.html test)
		if(this.srcNodeRef && (typeof this.srcNodeRef.id == "string")){ this.id = this.srcNodeRef.id; }

		// mix in our passed parameters
		if(params){
			this.params = params;
			dojo._mixin(this, params);
		}
		this.postMixInProperties();

		// generate an id for the widget if one wasn't specified
		// (be sure to do this before buildRendering() because that function might
		// expect the id to be there.)
		if(!this.id){
			this.id = dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
		}
		dijit.registry.add(this);

		this.buildRendering();

		if(this.domNode){
			// Copy attributes listed in attributeMap into the [newly created] DOM for the widget.
			// Also calls custom setters for all attributes with custom setters.
			this._applyAttributes();

			// If srcNodeRef was specified, then swap out original srcNode for this widget's DOM tree.
			// For 2.0, move this after postCreate().  postCreate() shouldn't depend on the
			// widget being attached to the DOM since it isn't when a widget is created programmatically like
			// new MyWidget({}).   See #11635.
			var source = this.srcNodeRef;
			if(source && source.parentNode && this.domNode !== source){
				source.parentNode.replaceChild(this.domNode, source);
			}
		}

		if(this.domNode){
			// Note: for 2.0 may want to rename widgetId to dojo._scopeName + "_widgetId",
			// assuming that dojo._scopeName even exists in 2.0
			this.domNode.setAttribute("widgetId", this.id);
		}
		this.postCreate();

		// If srcNodeRef has been processed and removed from the DOM (e.g. TemplatedWidget) then delete it to allow GC.
		if(this.srcNodeRef && !this.srcNodeRef.parentNode){
			delete this.srcNodeRef;
		}

		this._created = true;
	},

	_applyAttributes: function(){
		// summary:
		//		Step during widget creation to copy  widget attributes to the
		//		DOM according to attributeMap and _setXXXAttr objects, and also to call
		//		custom _setXXXAttr() methods.
		//
		//		Skips over blank/false attribute values, unless they were explicitly specified
		//		as parameters to the widget, since those are the default anyway,
		//		and setting tabIndex="" is different than not setting tabIndex at all.
		//
		//		For backwards-compatibility reasons attributeMap overrides _setXXXAttr when
		//		_setXXXAttr is a hash/string/array, but _setXXXAttr as a functions override attributeMap.
		// tags:
		//		private

		// Get list of attributes where this.set(name, value) will do something beyond
		// setting this[name] = value.  Specifically, attributes that have:
		//		- associated _setXXXAttr() method/hash/string/array
		//		- entries in attributeMap.
		var ctor = this.constructor,
			list = ctor._setterAttrs;
		if(!list){
			list = (ctor._setterAttrs = []);
			for(var attr in this.attributeMap){
				list.push(attr);
			}

			var proto = ctor.prototype;
			for(var fxName in proto){
				if(fxName in this.attributeMap){ continue; }
				var setterName = "_set" + fxName.replace(/^[a-z]|-[a-zA-Z]/g, function(c){ return c.charAt(c.length-1).toUpperCase(); }) + "Attr";
				if(setterName in proto){
					list.push(fxName);
				}
			}
		}

		// Call this.set() for each attribute that was either specified as parameter to constructor,
		// or was found above and has a default non-null value.   For correlated attributes like value and displayedValue, the one
		// specified as a parameter should take precedence, so apply attributes in this.params last.
		// Particularly important for new DateTextBox({displayedValue: ...}) since DateTextBox's default value is
		// NaN and thus is not ignored like a default value of "".
		dojo.forEach(list, function(attr){
			if(this.params && attr in this.params){
				// skip this one, do it below
			}else if(this[attr]){
				this.set(attr, this[attr]);
			}
		}, this);
		for(var param in this.params){
			this.set(param, this[param]);
		}
	},

	postMixInProperties: function(){
		// summary:
		//		Called after the parameters to the widget have been read-in,
		//		but before the widget template is instantiated. Especially
		//		useful to set properties that are referenced in the widget
		//		template.
		// tags:
		//		protected
	},

	buildRendering: function(){
		// summary:
		//		Construct the UI for this widget, setting this.domNode.
		//		Most widgets will mixin `dijit._TemplatedMixin`, which implements this method.
		// tags:
		//		protected

		if(!this.domNode){
			// Create root node if it wasn't created by _Templated
			this.domNode = this.srcNodeRef || dojo.create('div');
		}

		// baseClass is a single class name or occasionally a space-separated list of names.
		// Add those classes to the DOMNode.  If RTL mode then also add with Rtl suffix.
		// TODO: make baseClass custom setter
		if(this.baseClass){
			var classes = this.baseClass.split(" ");
			if(!this.isLeftToRight()){
				classes = classes.concat( dojo.map(classes, function(name){ return name+"Rtl"; }));
			}
			dojo.addClass(this.domNode, classes);
		}
	},

	postCreate: function(){
		// summary:
		//		Processing after the DOM fragment is created
		// description:
		//		Called after the DOM fragment has been created, but not necessarily
		//		added to the document.  Do not include any operations which rely on
		//		node dimensions or placement.
		// tags:
		//		protected
	},

	startup: function(){
		// summary:
		//		Processing after the DOM fragment is added to the document
		// description:
		//		Called after a widget and its children have been created and added to the page,
		//		and all related widgets have finished their create() cycle, up through postCreate().
		//		This is useful for composite widgets that need to control or layout sub-widgets.
		//		Many layout widgets can use this as a wiring phase.
		this._started = true;
	},

	//////////// DESTROY FUNCTIONS ////////////////////////////////

	destroyRecursive: function(/*Boolean?*/ preserveDom){
		// summary:
		// 		Destroy this widget and its descendants
		// description:
		//		This is the generic "destructor" function that all widget users
		// 		should call to cleanly discard with a widget. Once a widget is
		// 		destroyed, it is removed from the manager object.
		// preserveDom:
		//		If true, this method will leave the original DOM structure
		//		alone of descendant Widgets. Note: This will NOT work with
		//		dijit._Templated widgets.

		this._beingDestroyed = true;
		this.destroyDescendants(preserveDom);
		this.destroy(preserveDom);
	},

	destroy: function(/*Boolean*/ preserveDom){
		// summary:
		// 		Destroy this widget, but not its descendants.
		//		This method will, however, destroy internal widgets such as those used within a template.
		// preserveDom: Boolean
		//		If true, this method will leave the original DOM structure alone.
		//		Note: This will not yet work with _Templated widgets

		this._beingDestroyed = true;
		this.uninitialize();

		// remove dojo.connect() and dojo.subscribe() listeners
		var c;
		while(c = this._connects.pop()){
			c.remove();
		}

		// destroy widgets created as part of template, etc.
		var w;
		while(w = this._supportingWidgets.pop()){
			if(w.destroyRecursive){
				w.destroyRecursive();
			}else if(w.destroy){
				w.destroy();
			}
		}

		this.destroyRendering(preserveDom);
		dijit.registry.remove(this.id);
		this._destroyed = true;
	},

	destroyRendering: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Destroys the DOM nodes associated with this widget
		// preserveDom:
		//		If true, this method will leave the original DOM structure alone
		//		during tear-down. Note: this will not work with _Templated
		//		widgets yet.
		// tags:
		//		protected

		if(this.bgIframe){
			this.bgIframe.destroy(preserveDom);
			delete this.bgIframe;
		}

		if(this.domNode){
			if(preserveDom){
				dojo.removeAttr(this.domNode, "widgetId");
			}else{
				dojo.destroy(this.domNode);
			}
			delete this.domNode;
		}

		if(this.srcNodeRef){
			if(!preserveDom){
				dojo.destroy(this.srcNodeRef);
			}
			delete this.srcNodeRef;
		}
	},

	destroyDescendants: function(/*Boolean?*/ preserveDom){
		// summary:
		//		Recursively destroy the children of this widget and their
		//		descendants.
		// preserveDom:
		//		If true, the preserveDom attribute is passed to all descendant
		//		widget's .destroy() method. Not for use with _Templated
		//		widgets.

		// get all direct descendants and destroy them recursively
		dojo.forEach(this.getChildren(), function(widget){
			if(widget.destroyRecursive){
				widget.destroyRecursive(preserveDom);
			}
		});
	},

	uninitialize: function(){
		// summary:
		//		Stub function. Override to implement custom widget tear-down
		//		behavior.
		// tags:
		//		protected
		return false;
	},

	////////////////// GET/SET, CUSTOM SETTERS, ETC. ///////////////////

	_setStyleAttr: function(/*String||Object*/ value){
		// summary:
		//		Sets the style attribute of the widget according to value,
		//		which is either a hash like {height: "5px", width: "3px"}
		//		or a plain string
		// description:
		//		Determines which node to set the style on based on style setting
		//		in attributeMap.
		// tags:
		//		protected

		var mapNode = this.domNode;

		// Note: technically we should revert any style setting made in a previous call
		// to his method, but that's difficult to keep track of.

		if(dojo.isObject(value)){
			dojo.style(mapNode, value);
		}else{
			if(mapNode.style.cssText){
				mapNode.style.cssText += "; " + value;
			}else{
				mapNode.style.cssText = value;
			}
		}

		this._set("style", value);
	},

	_attrToDom: function(/*String*/ attr, /*String*/ value, /*Object?*/ commands){
		// summary:
		//		Reflect a widget attribute (title, tabIndex, duration etc.) to
		//		the widget DOM, as specified by commands parameter.
		//		If commands isn't specified then it's looked up from attributeMap.
		//		Note some attributes like "type"
		//		cannot be processed this way as they are not mutable.
		//
		// tags:
		//		private

		commands = arguments.length >= 3 ? commands : this.attributeMap[attr];

		dojo.forEach(dojo.isArray(commands) ? commands : [commands], function(command){

			// Get target node and what we are doing to that node
			var mapNode = this[command.node || command || "domNode"];	// DOM node
			var type = command.type || "attribute";	// class, innerHTML, innerText, or attribute

			switch(type){
				case "attribute":
					if(dojo.isFunction(value)){ // functions execute in the context of the widget
						value = dojo.hitch(this, value);
					}

					// Get the name of the DOM node attribute; usually it's the same
					// as the name of the attribute in the widget (attr), but can be overridden.
					// Also maps handler names to lowercase, like onSubmit --> onsubmit
					var attrName = command.attribute ? command.attribute :
						(/^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr);

					dojo.attr(mapNode, attrName, value);
					break;
				case "innerText":
					mapNode.innerHTML = "";
					mapNode.appendChild(dojo.doc.createTextNode(value));
					break;
				case "innerHTML":
					mapNode.innerHTML = value;
					break;
				case "class":
					dojo.replaceClass(mapNode, value, this[attr]);
					break;
			}
		}, this);
	},

	get: function(name){
		// summary:
		//		Get a property from a widget.
		//	name:
		//		The property to get.
		// description:
		//		Get a named property from a widget. The property may
		//		potentially be retrieved via a getter method. If no getter is defined, this
		// 		just retrieves the object's property.
		// 		For example, if the widget has a properties "foo"
		//		and "bar" and a method named "_getFooAttr", calling:
		//	|	myWidget.get("foo");
		//		would be equivalent to writing:
		//	|	widget._getFooAttr();
		//		and:
		//	|	myWidget.get("bar");
		//		would be equivalent to writing:
		//	|	widget.bar;
		var names = this._getAttrNames(name);
		return this[names.g] ? this[names.g]() : this[name];
	},

	set: function(name, value){
		// summary:
		//		Set a property on a widget
		//	name:
		//		The property to set.
		//	value:
		//		The value to set in the property.
		// description:
		//		Sets named properties on a widget which may potentially be handled by a
		// 		setter in the widget.
		// 		For example, if the widget has a properties "foo"
		//		and "bar" and a method named "_setFooAttr", calling:
		//	|	myWidget.set("foo", "Howdy!");
		//		would be equivalent to writing:
		//	|	widget._setFooAttr("Howdy!");
		//		and:
		//	|	myWidget.set("bar", 3);
		//		would be equivalent to writing:
		//	|	widget.bar = 3;
		//
		//	set() may also be called with a hash of name/value pairs, ex:
		//	|	myWidget.set({
		//	|		foo: "Howdy",
		//	|		bar: 3
		//	|	})
		//	This is equivalent to calling set(foo, "Howdy") and set(bar, 3)

		if(typeof name === "object"){
			for(var x in name){
				this.set(x, name[x]);
			}
			return this;
		}
		var names = this._getAttrNames(name),
			setter = this[names.s];
		if(dojo.isFunction(setter)){
			// use the explicit setter
			var result = setter.apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			// Mapping from widget attribute to DOMNode attribute/value/etc.
			// Map according to:
			//		1. attributeMap setting, if one exists (TODO: attributeMap deprecated, remove in 2.0)
			//		2. _setFooAttr: {...} type attribute in the widget (if one exists)
			//		3. apply to focusNode or domNode if standard attribute name
			var defaultNode = this.focusNode ? "focusNode" : "domNode",
				map =	name in this.attributeMap ? this.attributeMap[name] :
						names.s in this ? this[names.s] :
						(name in this[defaultNode] || /^aria-|^role$/.test(name)) ? defaultNode : null;
			if(map != null){
				this._attrToDom(name, value, map);
			}
			this._set(name, value);
		}
		return result || this;
	},

	_attrPairNames: {},		// shared between all widgets
	_getAttrNames: function(name){
		// summary:
		//		Helper function for get() and set().
		//		Caches attribute name values so we don't do the string ops every time.
		// tags:
		//		private

		var apn = this._attrPairNames;
		if(apn[name]){ return apn[name]; }
		var uc = name.replace(/^[a-z]|-[a-zA-Z]/g, function(c){ return c.charAt(c.length-1).toUpperCase(); });
		return (apn[name] = {
			n: name+"Node",
			s: "_set"+uc+"Attr",
			g: "_get"+uc+"Attr"
		});
	},

	_set: function(/*String*/ name, /*anything*/ value){
		// summary:
		//		Helper function to set new value for specified attribute, and call handlers
		//		registered with watch() if the value has changed.
		var oldValue = this[name];
		this[name] = value;
		if(this._watchCallbacks && this._created && value !== oldValue){
			this._watchCallbacks(name, oldValue, value);
		}
	},

	on: function(/*String*/ type, /*Function*/ func){
		// summary:
		//		Call specified function when event "type" occurs, ex: myWidget.on("click", function(){ ... }).
		// description:
		//		Call specified function when event "type" occurs, ex: myWidget.on("click", function(){ ... }).
		//		It's also implicitly called from dojo.connect(myWidget, "onClick", ...).
		//		Note that the function is not run in any particular scope, so if (for example) you want it to run in the
		//		widget's scope you must do myWidget.on("click", dojo.hitch(myWidget, func)).

		type = type.replace(/^on/, "");
		return aspect.after(this, "on" + type.charAt(0).toUpperCase() + type.substr(1), func, true);
	},

	toString: function(){
		// summary:
		//		Returns a string that represents the widget
		// description:
		//		When a widget is cast to a string, this method will be used to generate the
		//		output. Currently, it does not implement any sort of reversible
		//		serialization.
		return '[Widget ' + this.declaredClass + ', ' + (this.id || 'NO ID') + ']'; // String
	},

	getDescendants: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		This method should generally be avoided as it returns widgets declared in templates, which are
		//		supposed to be internal/hidden, but it's left here for back-compat reasons.

		return this.containerNode ? dojo.query('[widgetId]', this.containerNode).map(dijit.byNode) : []; // dijit._Widget[]
	},

	getChildren: function(){
		// summary:
		//		Returns all the widgets contained by this, i.e., all widgets underneath this.containerNode.
		//		Does not return nested widgets, nor widgets that are part of this widget's template.
		return this.containerNode ? dijit.findWidgets(this.containerNode) : []; // dijit._Widget[]
	},

	connect: function(
			/*Object|null*/ obj,
			/*String|Function*/ event,
			/*String|Function*/ method){
		// summary:
		//		Connects specified obj/event to specified method of this object
		//		and registers for disconnect() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.connect, except with the
		//		implicit use of this widget as the target object.
		//		Events connected with `this.connect` are disconnected upon
		//		destruction.
		// returns:
		//		A handle that can be passed to `disconnect` in order to disconnect before
		//		the widget is destroyed.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when foo.bar() is called, call the listener we're going to
		//	|	// provide in the scope of btn
		//	|	btn.connect(foo, "bar", function(){
		//	|		console.debug(this.toString());
		//	|	});
		// tags:
		//		protected

		var handle = dojo.connect(obj, event, this, method);
		this._connects.push(handle);
		return handle;		// _Widget.Handle
	},

	disconnect: function(handle){
		// summary:
		//		Disconnects handle created by `connect`.
		//		Also removes handle from this widget's list of connects.
		// tags:
		//		protected

		for(var i=0; i<this._connects.length; i++){
			if(this._connects[i] == handle){
				handle.remove();
				this._connects.splice(i, 1);
				return;
			}
		}
	},

	subscribe: function(
			/*String*/ topic,
			/*String|Function*/ method){
		// summary:
		//		Subscribes to the specified topic and calls the specified method
		//		of this object and registers for unsubscribe() on widget destroy.
		// description:
		//		Provide widget-specific analog to dojo.subscribe, except with the
		//		implicit use of this widget as the target object.
		// example:
		//	|	var btn = new dijit.form.Button();
		//	|	// when /my/topic is published, this button changes its label to
		//	|   // be the parameter of the topic.
		//	|	btn.subscribe("/my/topic", function(v){
		//	|		this.set("label", v);
		//	|	});
		// tags:
		//		protected
		var handle = dojo.subscribe(topic, this, method);
		this._connects.push(handle);
		return handle;		// _Widget.Handle
	},

	unsubscribe: function(/*Object*/ handle){
		// summary:
		//		Unsubscribes handle created by this.subscribe.
		//		Also removes handle from this widget's list of subscriptions
		// tags:
		//		protected
		this.disconnect(handle);
	},

	isLeftToRight: function(){
		// summary:
		//		Return this widget's explicit or implicit orientation (true for LTR, false for RTL)
		// tags:
		//		protected
		return this.dir ? (this.dir == "ltr") : dojo._isBodyLtr(); //Boolean
	},

	isFocusable: function(){
		// summary:
		//		Return true if this widget can currently be focused
		//		and false if not
		return this.focus && (dojo.style(this.domNode, "display") != "none");
	},

	placeAt: function(/* String|DomNode|_Widget */reference, /* String?|Int? */position){
		// summary:
		//		Place this widget's domNode reference somewhere in the DOM based
		//		on standard dojo.place conventions, or passing a Widget reference that
		//		contains and addChild member.
		//
		// description:
		//		A convenience function provided in all _Widgets, providing a simple
		//		shorthand mechanism to put an existing (or newly created) Widget
		//		somewhere in the dom, and allow chaining.
		//
		// reference:
		//		The String id of a domNode, a domNode reference, or a reference to a Widget possessing
		//		an addChild method.
		//
		// position:
		//		If passed a string or domNode reference, the position argument
		//		accepts a string just as dojo.place does, one of: "first", "last",
		//		"before", or "after".
		//
		//		If passed a _Widget reference, and that widget reference has an ".addChild" method,
		//		it will be called passing this widget instance into that method, supplying the optional
		//		position index passed.
		//
		// returns:
		//		dijit._Widget
		//		Provides a useful return of the newly created dijit._Widget instance so you
		//		can "chain" this function by instantiating, placing, then saving the return value
		//		to a variable.
		//
		// example:
		// | 	// create a Button with no srcNodeRef, and place it in the body:
		// | 	var button = new dijit.form.Button({ label:"click" }).placeAt(dojo.body());
		// | 	// now, 'button' is still the widget reference to the newly created button
		// | 	dojo.connect(button, "onClick", function(e){ console.log('click'); });
		//
		// example:
		// |	// create a button out of a node with id="src" and append it to id="wrapper":
		// | 	var button = new dijit.form.Button({},"src").placeAt("wrapper");
		//
		// example:
		// |	// place a new button as the first element of some div
		// |	var button = new dijit.form.Button({ label:"click" }).placeAt("wrapper","first");
		//
		// example:
		// |	// create a contentpane and add it to a TabContainer
		// |	var tc = dijit.byId("myTabs");
		// |	new dijit.layout.ContentPane({ href:"foo.html", title:"Wow!" }).placeAt(tc)

		if(reference.declaredClass && reference.addChild){
			reference.addChild(this, position);
		}else{
			dojo.place(this.domNode, reference, position);
		}
		return this;
	},

	getTextDir: function(/*String*/ text,/*String*/ originalDir){
		// summary:
		//		Return direction of the text.
		//		The function overridden in the _BidiSupport module,
		//		its main purpose is to calculate the direction of the
		//		text, if was defined by the programmer through textDir.
		//	tags:
		//		protected.
		return originalDir;
	},

	applyTextDir: function(/*Object*/ element, /*String*/ text){
		// summary:
		//		The function overridden in the _BidiSupport module,
		//		originally used for setting element.dir according to this.textDir.
		//		In this case does nothing.
		//	tags:
		//		protected.
	}
});

return dijit._WidgetBase;
});

},
'dijit*_base/manager':function(){
define("dijit/_base/manager", [
	"dojo/_base/kernel", // dojo.config
	"..",
	"dojo/_base/NodeList", // .forEach
	"dojo/_base/array", // dojo.forEach dojo.map
	"dojo/_base/declare", // dojo.declare
	"dojo/_base/html", // dojo.attr dojo.byId dojo.hasAttr dojo.style
	"dojo/_base/sniff", // dojo.isIE
	"dojo/_base/unload", // dojo.addOnWindowUnload
	"dojo/_base/window", // dojo.body dojo.global
	"dojo/query" // dojo.query
], function(dojo, dijit){

	// module:
	//		dijit/_base/manager
	// summary:
	//		Many of the basic methods/classes used by dijit.

	dojo.declare("dijit.WidgetSet", null, {
		// summary:
		//		A set of widgets indexed by id. A default instance of this class is
		//		available as `dijit.registry`
		//
		// example:
		//		Create a small list of widgets:
		//		|	var ws = new dijit.WidgetSet();
		//		|	ws.add(dijit.byId("one"));
		//		| 	ws.add(dijit.byId("two"));
		//		|	// destroy both:
		//		|	ws.forEach(function(w){ w.destroy(); });
		//
		// example:
		//		Using dijit.registry:
		//		|	dijit.registry.forEach(function(w){ /* do something */ });

		constructor: function(){
			this._hash = {};
			this.length = 0;
		},

		add: function(/*dijit._Widget*/ widget){
			// summary:
			//		Add a widget to this list. If a duplicate ID is detected, a error is thrown.
			//
			// widget: dijit._Widget
			//		Any dijit._Widget subclass.
			if(this._hash[widget.id]){
				throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
			}
			this._hash[widget.id] = widget;
			this.length++;
		},

		remove: function(/*String*/ id){
			// summary:
			//		Remove a widget from this WidgetSet. Does not destroy the widget; simply
			//		removes the reference.
			if(this._hash[id]){
				delete this._hash[id];
				this.length--;
			}
		},

		forEach: function(/*Function*/ func, /* Object? */thisObj){
			// summary:
			//		Call specified function for each widget in this set.
			//
			// func:
			//		A callback function to run for each item. Is passed the widget, the index
			//		in the iteration, and the full hash, similar to `dojo.forEach`.
			//
			// thisObj:
			//		An optional scope parameter
			//
			// example:
			//		Using the default `dijit.registry` instance:
			//		|	dijit.registry.forEach(function(widget){
			//		|		console.log(widget.declaredClass);
			//		|	});
			//
			// returns:
			//		Returns self, in order to allow for further chaining.

			thisObj = thisObj || dojo.global;
			var i = 0, id;
			for(id in this._hash){
				func.call(thisObj, this._hash[id], i++, this._hash);
			}
			return this;	// dijit.WidgetSet
		},

		filter: function(/*Function*/ filter, /* Object? */thisObj){
			// summary:
			//		Filter down this WidgetSet to a smaller new WidgetSet
			//		Works the same as `dojo.filter` and `dojo.NodeList.filter`
			//
			// filter:
			//		Callback function to test truthiness. Is passed the widget
			//		reference and the pseudo-index in the object.
			//
			// thisObj: Object?
			//		Option scope to use for the filter function.
			//
			// example:
			//		Arbitrary: select the odd widgets in this list
			//		|	dijit.registry.filter(function(w, i){
			//		|		return i % 2 == 0;
			//		|	}).forEach(function(w){ /* odd ones */ });

			thisObj = thisObj || dojo.global;
			var res = new dijit.WidgetSet(), i = 0, id;
			for(id in this._hash){
				var w = this._hash[id];
				if(filter.call(thisObj, w, i++, this._hash)){
					res.add(w);
				}
			}
			return res; // dijit.WidgetSet
		},

		byId: function(/*String*/ id){
			// summary:
			//		Find a widget in this list by it's id.
			// example:
			//		Test if an id is in a particular WidgetSet
			//		| var ws = new dijit.WidgetSet();
			//		| ws.add(dijit.byId("bar"));
			//		| var t = ws.byId("bar") // returns a widget
			//		| var x = ws.byId("foo"); // returns undefined

			return this._hash[id];	// dijit._Widget
		},

		byClass: function(/*String*/ cls){
			// summary:
			//		Reduce this widgetset to a new WidgetSet of a particular `declaredClass`
			//
			// cls: String
			//		The Class to scan for. Full dot-notated string.
			//
			// example:
			//		Find all `dijit.TitlePane`s in a page:
			//		|	dijit.registry.byClass("dijit.TitlePane").forEach(function(tp){ tp.close(); });

			var res = new dijit.WidgetSet(), id, widget;
			for(id in this._hash){
				widget = this._hash[id];
				if(widget.declaredClass == cls){
					res.add(widget);
				}
			 }
			 return res; // dijit.WidgetSet
		},

		toArray: function(){
			// summary:
			//		Convert this WidgetSet into a true Array
			//
			// example:
			//		Work with the widget .domNodes in a real Array
			//		|	dojo.map(dijit.registry.toArray(), function(w){ return w.domNode; });

			var ar = [];
			for(var id in this._hash){
				ar.push(this._hash[id]);
			}
			return ar;	// dijit._Widget[]
	},

		map: function(/* Function */func, /* Object? */thisObj){
			// summary:
			//		Create a new Array from this WidgetSet, following the same rules as `dojo.map`
			// example:
			//		|	var nodes = dijit.registry.map(function(w){ return w.domNode; });
			//
			// returns:
			//		A new array of the returned values.
			return dojo.map(this.toArray(), func, thisObj); // Array
		},

		every: function(func, thisObj){
			// summary:
			// 		A synthetic clone of `dojo.every` acting explicitly on this WidgetSet
			//
			// func: Function
			//		A callback function run for every widget in this list. Exits loop
			//		when the first false return is encountered.
			//
			// thisObj: Object?
			//		Optional scope parameter to use for the callback

			thisObj = thisObj || dojo.global;
			var x = 0, i;
			for(i in this._hash){
				if(!func.call(thisObj, this._hash[i], x++, this._hash)){
					return false; // Boolean
				}
			}
			return true; // Boolean
		},

		some: function(func, thisObj){
			// summary:
			// 		A synthetic clone of `dojo.some` acting explictly on this WidgetSet
			//
			// func: Function
			//		A callback function run for every widget in this list. Exits loop
			//		when the first true return is encountered.
			//
			// thisObj: Object?
			//		Optional scope parameter to use for the callback

			thisObj = thisObj || dojo.global;
			var x = 0, i;
			for(i in this._hash){
				if(func.call(thisObj, this._hash[i], x++, this._hash)){
					return true; // Boolean
				}
			}
			return false; // Boolean
		}

	});

	/*=====
	dijit.registry = {
		// summary:
		//		A list of widgets on a page.
		// description:
		//		Is an instance of `dijit.WidgetSet`
	};
	=====*/
	dijit.registry = new dijit.WidgetSet();

	var hash = dijit.registry._hash,
		attr = dojo.attr,
		hasAttr = dojo.hasAttr,
		style = dojo.style;

	dijit.byId = function(/*String|dijit._Widget*/ id){
		// summary:
		//		Returns a widget by it's id, or if passed a widget, no-op (like dojo.byId())
		return typeof id == "string" ? hash[id] : id; // dijit._Widget
	};

	var _widgetTypeCtr = {};
	dijit.getUniqueId = function(/*String*/widgetType){
		// summary:
		//		Generates a unique id for a given widgetType

		var id;
		do{
			id = widgetType + "_" +
				(widgetType in _widgetTypeCtr ?
					++_widgetTypeCtr[widgetType] : _widgetTypeCtr[widgetType] = 0);
		}while(hash[id]);
		return dijit._scopeName == "dijit" ? id : dijit._scopeName + "_" + id; // String
	};

	dijit.findWidgets = function(/*DomNode*/ root){
		// summary:
		//		Search subtree under root returning widgets found.
		//		Doesn't search for nested widgets (ie, widgets inside other widgets).

		var outAry = [];

		function getChildrenHelper(root){
			for(var node = root.firstChild; node; node = node.nextSibling){
				if(node.nodeType == 1){
					var widgetId = node.getAttribute("widgetId");
					if(widgetId){
						var widget = hash[widgetId];
						if(widget){	// may be null on page w/multiple dojo's loaded
							outAry.push(widget);
						}
					}else{
						getChildrenHelper(node);
					}
				}
			}
		}

		getChildrenHelper(root);
		return outAry;
	};

	dijit._destroyAll = function(){
		// summary:
		//		Code to destroy all widgets and do other cleanup on page unload

		// Clean up focus manager lingering references to widgets and nodes
		dijit._curFocus = null;
		dijit._prevFocus = null;
		dijit._activeStack = [];

		// Destroy all the widgets, top down
		dojo.forEach(dijit.findWidgets(dojo.body()), function(widget){
			// Avoid double destroy of widgets like Menu that are attached to <body>
			// even though they are logically children of other widgets.
			if(!widget._destroyed){
				if(widget.destroyRecursive){
					widget.destroyRecursive();
				}else if(widget.destroy){
					widget.destroy();
				}
			}
		});
	};

	if(dojo.isIE){
		// Only run _destroyAll() for IE because we think it's only necessary in that case,
		// and because it causes problems on FF.  See bug #3531 for details.
		dojo.addOnWindowUnload(function(){
			dijit._destroyAll();
		});
	}

	dijit.byNode = function(/*DOMNode*/ node){
		// summary:
		//		Returns the widget corresponding to the given DOMNode
		return hash[node.getAttribute("widgetId")]; // dijit._Widget
	};

	dijit.getEnclosingWidget = function(/*DOMNode*/ node){
		// summary:
		//		Returns the widget whose DOM tree contains the specified DOMNode, or null if
		//		the node is not contained within the DOM tree of any widget
		while(node){
			var id = node.getAttribute && node.getAttribute("widgetId");
			if(id){
				return hash[id];
			}
			node = node.parentNode;
		}
		return null;
	};

	var shown = (dijit._isElementShown = function(/*Element*/ elem){
		var s = style(elem);
		return (s.visibility != "hidden")
			&& (s.visibility != "collapsed")
			&& (s.display != "none")
			&& (attr(elem, "type") != "hidden");
	});

	dijit.hasDefaultTabStop = function(/*Element*/ elem){
		// summary:
		//		Tests if element is tab-navigable even without an explicit tabIndex setting

		// No explicit tabIndex setting, need to investigate node type
		switch(elem.nodeName.toLowerCase()){
			case "a":
				// An <a> w/out a tabindex is only navigable if it has an href
				return hasAttr(elem, "href");
			case "area":
			case "button":
			case "input":
			case "object":
			case "select":
			case "textarea":
				// These are navigable by default
				return true;
			case "iframe":
				// If it's an editor <iframe> then it's tab navigable.
				var body;
				try{
					// non-IE
					var contentDocument = elem.contentDocument;
					if("designMode" in contentDocument && contentDocument.designMode == "on"){
						return true;
					}
					body = contentDocument.body;
				}catch(e1){
					// contentWindow.document isn't accessible within IE7/8
					// if the iframe.src points to a foreign url and this
					// page contains an element, that could get focus
					try{
						body = elem.contentWindow.document.body;
					}catch(e2){
						return false;
					}
				}
				return body.contentEditable == 'true' || (body.firstChild && body.firstChild.contentEditable == 'true');
			default:
				return elem.contentEditable == 'true';
		}
	};

	var isTabNavigable = (dijit.isTabNavigable = function(/*Element*/ elem){
		// summary:
		//		Tests if an element is tab-navigable

		// TODO: convert (and rename method) to return effective tabIndex; will save time in _getTabNavigable()
		if(attr(elem, "disabled")){
			return false;
		}else if(hasAttr(elem, "tabIndex")){
			// Explicit tab index setting
			return attr(elem, "tabIndex") >= 0; // boolean
		}else{
			// No explicit tabIndex setting, so depends on node type
			return dijit.hasDefaultTabStop(elem);
		}
	});

	dijit._getTabNavigable = function(/*DOMNode*/ root){
		// summary:
		//		Finds descendants of the specified root node.
		//
		// description:
		//		Finds the following descendants of the specified root node:
		//		* the first tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the last tab-navigable element in document order
		//		  without a tabIndex or with tabIndex="0"
		//		* the first element in document order with the lowest
		//		  positive tabIndex value
		//		* the last element in document order with the highest
		//		  positive tabIndex value
		var first, last, lowest, lowestTabindex, highest, highestTabindex, radioSelected = {};

		function radioName(node){
			// If this element is part of a radio button group, return the name for that group.
			return node && node.tagName.toLowerCase() == "input" &&
				node.type && node.type.toLowerCase() == "radio" &&
				node.name && node.name.toLowerCase();
		}

		var walkTree = function(/*DOMNode*/parent){
			dojo.query("> *", parent).forEach(function(child){
				// Skip hidden elements, and also non-HTML elements (those in custom namespaces) in IE,
				// since show() invokes getAttribute("type"), which crash on VML nodes in IE.
				if((dojo.isIE && child.scopeName !== "HTML") || !shown(child)){
					return;
				}

				if(isTabNavigable(child)){
					var tabindex = attr(child, "tabIndex");
					if(!hasAttr(child, "tabIndex") || tabindex == 0){
						if(!first){
							first = child;
						}
						last = child;
					}else if(tabindex > 0){
						if(!lowest || tabindex < lowestTabindex){
							lowestTabindex = tabindex;
							lowest = child;
						}
						if(!highest || tabindex >= highestTabindex){
							highestTabindex = tabindex;
							highest = child;
						}
					}
					var rn = radioName(child);
					if(dojo.attr(child, "checked") && rn){
						radioSelected[rn] = child;
					}
				}
				if(child.nodeName.toUpperCase() != 'SELECT'){
					walkTree(child);
				}
			});
		};
		if(shown(root)){
			walkTree(root);
		}
		function rs(node){
			// substitute checked radio button for unchecked one, if there is a checked one with the same name.
			return radioSelected[radioName(node)] || node;
		}

		return { first: rs(first), last: rs(last), lowest: rs(lowest), highest: rs(highest) };
	};
	dijit.getFirstInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is first in the tabbing order
		var elems = dijit._getTabNavigable(dojo.byId(root));
		return elems.lowest ? elems.lowest : elems.first; // DomNode
	};

	dijit.getLastInTabbingOrder = function(/*String|DOMNode*/ root){
		// summary:
		//		Finds the descendant of the specified root node
		//		that is last in the tabbing order
		var elems = dijit._getTabNavigable(dojo.byId(root));
		return elems.last ? elems.last : elems.highest; // DomNode
	};

	/*=====
	dojo.mixin(dijit, {
		// defaultDuration: Integer
		//		The default animation speed (in ms) to use for all Dijit
		//		transitional animations, unless otherwise specified
		//		on a per-instance basis. Defaults to 200, overrided by
		//		`djConfig.defaultDuration`
		defaultDuration: 200
	});
	=====*/

	dijit.defaultDuration = dojo.config["defaultDuration"] || 200;

	return dijit;
});

},
'dojox*mobile/RoundRect':function(){
define(["dijit/_WidgetBase", "dijit/_Contained","dijit/_Container"], function(WidgetBase,Contained,Container){
	// module:
	//		dojox/mobile/RoundRect
	// summary:
	//		TODOC

	return dojo.declare("dojox.mobile.RoundRect", [dijit._WidgetBase, dijit._Container,dijit._Contained], {

		shadow: false,

		buildRendering: function(){
			this.domNode = this.containerNode = this.srcNodeRef || dojo.doc.createElement("DIV");
			this.domNode.className = this.shadow ? "mblRoundRect mblShadow" : "mblRoundRect";
		},

		resize: function(){
			dojo.forEach(this.getChildren(), function(child){
				if(child.resize){ child.resize(); }
			});
		}
	});
});

}}});

define("dojox/mobile", [".", "dojo/_base/kernel", "dojox/mobile/_base"], function(dojox, dojo, base){
	dojo.getObject("mobile", true, dojox);
	dojo.experimental("dojox.mobile");
	return dojox.mobile;
});
