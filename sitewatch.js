var config = require('./swconfig'); // sitewatch configuration file that maps the correct variables
function SiteWatch(paths){
  this.entities = ['employee','site','customer','terminal'];
  this.data = ['facts','items'];
  var mainpath = "sitewatch"
  paths.addbranches(mainpath+'/sale',[this.entities]);
  paths.addbranches(mainpath+'/sale',[this.entities,this.data]);
  this.branches = paths.branches
}
// takes an array of schemas 
SiteWatch.prototype.validaterequest = function(schemas,inputs,schema){
  var relationship = schema.merge(Object.create(schemas),'object',false);
  return schema.validate(relationship,inputs);

}
// sets up a sitewatch rest api
SiteWatch.prototype.app = function(app,url,schema,querystring,http,paths){
     
    var validate = this.validaterequest;
    this.branches.forEach(function(branch){
        app.get(branch.toString(),function(req, res) {             
              var arr = branch.substr(("/sitewatch/").length).split('/');
              var pathschemas = arr.map(function(val){ return config[val]; });
              var fields = config['sale'].fields.join(',')+','+config[arr[1]].fields.join(',')
              //delete relationship.fields;
              var queryfields = url.parse(req.url,true).query; 
                           
              var errors = validate(pathschemas,queryfields,schema);
               //res.send( relationship);
              if(!errors){
                
                var queryfields = _.extend(queryfields,{logdate:queryfields.to+'TO'+queryfields.from})
                var swdata = {'entity':_.intersection(arr,this.entities),'data':_.intersection(arr,this.data),'fields':fields};
                swdata = _.extend(swdata,queryfields); 
                delete swdata['from'];
                delete swdata['to'];
              /*
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
             */            
               res.send(querystring.stringify(swdata));
              }else{   
                res.send(errors);
              }
    	  });
     });
     
}

module.exports =  SiteWatch;