var jjv = require('jjv');
var jjv = jjv();
jjv.addType('date', function (v) {
      var dateformat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
      var regex = new RegExp(dateformat);
      return regex.exec(v);
});

function dispatch(fn, args) {
    fn = (typeof fn == "function") ? fn : window[fn];  // Allow fn to be a function object or the name of a global function
    return fn.apply(this, args || []);  // args is optional, use an empty array by default
}
exports.validate = function(sch,data){
	jjv.addSchema('schema',sch);
	return jjv.validate('schema',data);
}
// merges schemas together
exports.merge = function(schemas,type){
		var properties = schemas.map(function(val){ return val.properties  });
    var arr = schemas.map(function(val) { return val.required});
		var required = arr.filter(function(val){ return val!=undefined; });
		return {type:type,
				  properties:dispatch(_.extend,properties),
				  required:dispatch(_.extend,required),
		 }; 
}

