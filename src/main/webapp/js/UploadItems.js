//This module shows the dialog for file upload and handles the preview before submission.
define(
	["dojo/ready", "dojo/parser", "dijit/registry", "dojo/on", "dojo/dom-construct", "dojo/dom"],
	function(ready, _p, _d, _o, _dc, _dom){
		var UploadItems = {
			button : function(_button_id, _dialog_id){
				ready(function(){
					var id = _button_id;
					var dom = _d;
					var on = _o;
					var node = dom.byId(id); 
					on(node,"click", function(e){
						var dialog_id = _dialog_id;
						var dom2 = _d;
						dom2.byId(dialog_id).show();
					});
				});
			},
			manage: function(_multi_input_id, _list_id){
				ready(function(){
					var multi_input_id = _multi_input_id;
					var dijit = _d;
					var on = _o;
					on(dijit.byId(multi_input_id), "change", function(e){
						var list_id = _list_id;
						var multi_input_id = _multi_input_id;
						var dijit = _d;
						var file_list_node = dijit.byId(multi_input_id);
						var file_list = file_list_node._files;
						var dc = _dc;
						dc.empty(list_id);
						for(var i=0; i < file_list.length; i++){
							  var liI = dc.create("li", null, list_id);
							  dc.create("img", {
								  height: "50px",
								  width: "50px",
								  src: window.URL.createObjectURL(file_list[i]),
								  onload: function(){
									  window.URL.revokeObjectURL(this.src);
								  }
							  }, liI);
						}
					});
				});
			} 
		};
		return UploadItems;
	}
);