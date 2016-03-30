var paths = require('./paths');
var config;
var schemaexist;
var mainpath
var schema = require('./schema');
var url = require('url');
// builds the RESP api based of a configuration file. 
function REST(configfile){
  config = require('./'+configfile);
  mainpath =  config.RESTconfig.mainpath;
  schemaexist = config.schemas;
  var trees = config.RESTconfig.trees;
  _.each(trees,function(tree){ 
      tree.branches.forEach(function(branch){
              var arr = branch.map(function(val){ return tree.paths[val]; })
              paths.addbranches(mainpath+'/'+tree.name.toString(),arr); 
      });                          
  });
}
// Returns the schema paths.
REST.prototype.getpathdata = function(path){
    return config.RESTconfig.trees[path].paths;
}
REST.prototype.validateschemaqrystr = function(testschema,urlstr){
  
    // Parse the query string to get the query vars 
    var queryfields = url.parse(urlstr,true).query; 
    var queryfields = _.extend(queryfields,{logdate:queryfields.to+'TO'+queryfields.from})
    // Checks for errors with the schema 
    var errors = schema.validate(testschema,queryfields);
    return errors;
}
REST.prototype.queryvars = function(url){
  
  
  
}
REST.prototype.ispath = function(path){
   return paths.ispath(path);
}
REST.prototype.getpathschemas = function(path){
    
    
    if(paths.ispath(path)){ // if there are schemas in the config file then it uses a different call back function
       var foldernames = path.substr(('/'+mainpath+'/').length).split('/');  // names of the schemas to combine
       var schemas = foldernames.map(function(key){  return config.schemas[key];     });
       return schemas;
    }else{
       return 'Path does not exist';
    }
  
}
// Sets up a REST rest api
REST.prototype.app = function(callback){
    var getpathschemas = this.getpathschemas;
    paths.branches.forEach(function(branch){  
     
        if(schemaexist){ // if there are schemas in the config file then it uses a different call back function
          var schemas = getpathschemas(branch);
          
          callback(branch,schemas) ;
        }
        else
          callback(branch,foldernames);
    });
}
module.exports =  REST;