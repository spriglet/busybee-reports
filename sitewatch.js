var querystring = require('query-string');
var jjv = require('jjv');
var jscomb = require('js-combinatorics');
//employee fields: employee.name,employeerole.name,saleemployees.profitcenter
// creates the site watch rest api	
function setupSiteWatch(app,_){
   function relationship(str){return str.split("/");};
   var entities = ['employee','site','customer','terminal'];
   var data = ['facts','items'];
   var mainpath = "/sitewatch"
   var salepath = mainpath+"/sale/"
   var saleurls =  _.map(entities,function(entity){  return salepath+entity; });
   var paths = saleurls;
   //Builds the sitewatch sale relationship 
   _.each(saleurls,function(url){
   		paths.push(url.toString());
        _.each(data,function(val){	 
        	paths.push(salepath+val.toString());
        	paths.push(url.toString()+"/"+val.toString());
   		});
   	});	 
     _.each(paths,function(val){
     		app.get(val.toString(),
				function(req, res) {
				  res.send(relationship(req.url));
			});

     });	

}
module.exports = setupSiteWatch;