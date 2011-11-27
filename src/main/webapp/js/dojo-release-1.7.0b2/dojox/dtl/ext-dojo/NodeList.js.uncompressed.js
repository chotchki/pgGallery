require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/dtl/ext-dojo/NodeList", ["dojo/_base/kernel","dojo/_base/lang","../_base"], function(dojo,lang,dd){
	dojo.getObject("dtl.ext-dojo.NodeList", true, dojox);

	dojo.extend(dojo.NodeList, {
		dtl: function(template, context){
			// template: dojox.dtl.__StringArgs|String
			//		The template string or location
			// context: dojox.dtl.__ObjectArgs|Object
			//		The context object or location
			var d = dd;

			var self = this;
			var render = function(template, context){
				var content = template.render(new d._Context(context));
				self.forEach(function(node){
					node.innerHTML = content;
				});
			}

			d.text._resolveTemplateArg(template).addCallback(function(templateString){
				template = new d.Template(templateString);
				d.text._resolveContextArg(context).addCallback(function(context){
					render(template, context);
				});
			});

			return this;
		}
	});
	return dojox.dtl.ext-dojo.NodeList;
});