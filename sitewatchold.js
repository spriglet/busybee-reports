var config = require('./swconfig')
var url = require('url');
var querystring = require('query-string');
var schema = require('./schema');
var http = require('http');
var paths = require('./paths');
var entities = config.RESTconfig.sale.paths.entities;
var data = config.RESTconfig.sale.paths.data;
var branches = config.RESTconfig.sale.branches;
var  test ='test outside';
var mainpath =  config.RESTconfig.mainpath;
function SiteWatch(){
  var p = config.RESTconfig.sale.paths;
  branches.forEach(function(branch){
      var arr = branch.map(function(val){ return p[val]; })
      paths.addbranches(mainpath+'/sale',arr); 
  });
  
}
function request(){
  
  
}
// Checks the path to make sure its a valid site watch path
// Takes a path as a parasmte to validatd
// takes an array of schemas 
SiteWatch.prototype.validaterequest = function(schemas,inputs,schema){
  var relationship = schema.merge(Object.create(schemas),'object',false);
  return schema.validate(relationship,inputs);

}
// test for avalid request to the sitewatch rest API
SiteWatch.prototype.validurl = function(str,url,schema){
    if(this.ispath(str)){
       var arr = str.substr(("/sitewatch/").length).split('/');
       var pathschemas = arr.map(function(val){ return config[val]; })
       var queryfields = url.parse(str,true).query; 
       var errors = this.validaterequest(pathschemas,queryfields,schema);
       return errors;
    }else{
      return false;
    }s
  
}
// sets up a sitewatch rest api
//SiteWatch.prototype.app = function(app,url,schema,querystring,http,paths){
SiteWatch.prototype.app = function(app,callback){

    var validate = this.validaterequest;
    paths.branches.forEach(function(branch){
    callback(branch);
    //app.get(branch.toString(),function(req, res) {    
        //res.send('Test');
/*
        var arr = branch.substr(("/sitewatch/").length).split('/');
        var pathschemas = arr.map(function(val){ return config[val]; });
        var fields = config['sale'].fields.join(',')+','+config[arr[1]].fields.join(',')
        //delete relationship.fields;
        var queryfields = url.parse(req.url,true).query; 

        var relationship = schema.merge(pathschemas,'object',false);
        var errors = schema.validate(relationship,queryfields);

        if(!errors){
            
        }  
        else{
              res.write(errors)
        }
          
          
          /* console.log(test); 
      
          var arr = branch.substr(("/sitewatch/").length).split('/');
              var pathschemas = arr.map(function(val){ return config[val]; });
              var fields = config['sale'].fields.join(',')+','+config[arr[1]].fields.join(',')
              //delete relationship.fields;
              var queryfields = url.parse(req.url,true).query; 
                           
              var errors = validate(pathschemas,queryfields,schema);
               //res.send( relationship);
              if(!errors){
                
                var queryfields = _.extend(queryfields,{logdate:queryfields.to+'TO'+queryfields.from})
                var swdata = {'entity':_.intersection(arr,entities),'data':_.intersection(arr,data),'fields':fields};
                swdata = _.extend(swdata,queryfields); 
                delete  swdata['from'];
                delete swdata['to'];
              
              http.get('http://50.240.52.173:5544/index.php?'+
                querystring.stringify(swdata), 
                function (response)
                var finalData = "";

                response.on("data", function (data)
                  finalData += data.toString();
                });
                 response.on("end", function() {
                  console.log(finalData.length);
                  res.send(finalData.toString());
                });
              });  
                     
               res.send(querystring.stringify(swdata));
              }else{   
                res.send(errors);
              }
             */
    	  //}); 
  
     });
}

module.exports =  SiteWatch;