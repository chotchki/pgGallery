//This module unhides a css class AFTER the dijit parser runs.
define(
	["dojo/ready", "dojo/parser", "dojo/query", "dojo/dom-style"],
	function(_r, _p, _q, _s){
		var NoFlicker = {
			show : function(_class){
				var ready = _r;
				ready(function(){
					var css_class = _class;
					var query = _q;
					query(css_class).forEach(function(node, index, arr){
						var style = _s;
						style.set(node, "display", "block");
					});
				});
			}
		};
		return NoFlicker;
	}
);