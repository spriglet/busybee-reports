var REST = require('./REST');
var url = require('url');
  var schema = require('./schema');
module.exports = function(wagner,app) {
  var sitewatch = new REST('./swconfig.js');
  // builds the sitewatch REST API 
  function appget(branch,schemas){
     app.get(branch,function(req,res){
            var reqschema = schema.merge(schemas,'object');
            var queryfields = url.parse(req.url,true).query; 
            var errors = schema.validate(reqschema,queryfields);
            if(!errors)
             res.send(reqschema);
            else
             res.send(errors);
      });
    
  }
  function makerequest(path){
      var schema = sitewatch.getpathschemas(path)
      appget('/sitewatch/sale/employee',schema)
    
  }
  wagner.factory('sitewatch_REST_app',function(){   
     sitewatch.app(function(branch,schemas){
          appget(branch,schemas)
     });
  });
  // employee report
  wagner.factory('sitewatch_sale_employee',function(){    
        makerequest('/sitewatch/sale/employee')
  });
  
  
}