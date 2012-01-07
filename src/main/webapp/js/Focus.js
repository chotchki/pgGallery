//This module sets the focus on the given dijit by id, AFTER the dojo parser runs
define(
	["dojo/ready", "dojo/parser", "dijit/registry"],
	function(_r, _p, _d){
		var Focus = {
			focus : function(_id){
				var ready = _r;
				ready(function(){
					var id = _id;
					var d = _d;
					var node = d.byId(id);				
					node.focus();
				});
			}
		};
		return Focus;
	}
);