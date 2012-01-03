define(
		["dojo/dom", "dojo/dom-construct", "dojo/fx", "dojo/on"], 
		function(_dom, _dc, _fx, _on){
		
			//This function adds a sucess / error message to the message bar
			var Message = {
					_add_message : function(new_content, css_class){
							var dom = _dom;
							var dc = _dc;
							var fx = _fx;
							var on = _on;
							
							dc.empty("message");
							var n = dc.create("p", {class: css_class, innerHTML: new_content }, "message");
							var c = dc.create("a", {href: "#", innerHTML: "close"}, "message");
		    		        var wipeArgs = {
		    		            node: "message"
		    		        };
		    		        on(dom.byId("message"), "click", function(){
		    		        	var args = wipeArgs;
		    		        	fx.wipeOut(args).play();
		    		        });
		    		        fx.wipeIn(wipeArgs).play();
					},
			
					error : function(content){
						var m = Message;
						m._add_message(content, "error");
					},
					
					success : function(content){
						var m = Message;
						m._add_message(content, "success");
					}
			};
			return Message;
		}
);