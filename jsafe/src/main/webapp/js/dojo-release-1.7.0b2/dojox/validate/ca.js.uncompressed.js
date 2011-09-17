require.built();
/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

define("dojox/validate/ca", ["dojo/_base/kernel", "./_base", "./regexp", "./us"], function(dojo, validate, xregexp, us){
/*=====

	dojox.validate.ca = {
		// summary: Module which includes Canadian-specific methods for dojox.validate
	}

=====*/

var ca = dojo.getObject("ca", true, validate);
dojo.mixin(ca, {
	
	isPhoneNumber: function(/* String */value){
		// summary: Validates Canadian 10-digit phone number for several common formats
		return us.isPhoneNumber(value);  // Boolean
	},

	isProvince: function(/* String[2] */value) {
		// summary: Validates Canadian province abbreviations (2 characters)
		var re = new RegExp("^" + xregexp.ca.province() + "$", "i");
		return re.test(value); // Boolean
	},
 
	isSocialInsuranceNumber: function(/* String */value) {
		// summary: Validates Canadian 9 digit social insurance number for several
		//		common formats
		//
		// description:
		//		Validates Canadian 9 digit social insurance number for several
		//		common formats. This routine only pattern matches and does not
		//		use the Luhn Algorithm to validate number.
		//
		var flags = { format: [ "###-###-###", "### ### ###", "#########" ]};
		return validate.isNumberFormat(value, flags); // Boolean
	},

	isPostalCode: function(value) {
		// summary: Validates Canadian 6 digit postal code
		//
		// description:
		//		Validates Canadian 6 digit postal code.
		//		Canadian postal codes are in the format ANA NAN,
		//		where A is a letter and N is a digit, with a space
		//		separating the third and fourth characters.
		//
		var re = new RegExp("^" + xregexp.ca.postalCode() + "$", "i");
		return re.test(value); // Boolean
	}

});

return ca;
});