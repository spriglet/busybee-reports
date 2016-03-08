var config = require('./swconfig'); // sitewatch configuration file that maps the correct variables

function urlobject(path,callback){   
    var errors = [];
    var arr = path.substr(("/sitewatch/").length).split('/'); // removes sitewatch from the path
    callback(errors,arr);
}
//employee fields: employee.name,employeerole.name,saleemployees.profitcenter
function createpaths(mainpath,list){
   toptier = list[0].map(function(subpath){  return mainpath+subpath; });
   paths = [];
   toptier.forEach(function(url){
      paths.push(url.toString());
        list[1].forEach(function(val){   
          paths.push(mainpath+val.toString());
          paths.push(url.toString()+"/"+val.toString());
      });
    });  
    return paths
}
// creates the site watch rest api	
function setupSiteWatch(app,url,schema,querystring,_){
    var entities = ['employee','site','customer','terminal'];
    var data = ['facts','items'];
    var mainpath = "/sitewatch"
    var salepaths=   createpaths(mainpath+"/sale/",[entities,data]);
    salepaths.forEach(function(val){
     		app.get(val.toString(),function(req, res) {
           urlobject(url.parse(req.url).pathname,function(errors,arr){
              relationship = {type:'object',
              properties:_.extend(config[arr[0]].fieldtypes,config[arr[1]].fieldtypes),
              required:_.extend(config[arr[0]].required,config[arr[1].required]),
              additionalProperties: false }; 
              var queryfields = url.parse(req.url,true).query; 
              schema.addSchema('relationship',relationship);
              var errors = schema.validate('relationship',queryfields);
              if(!errors){
                var queryfields = _.extend(queryfields,{logdate:queryfields.to+'TO'+queryfields.from})
                var swdata = {'enitity':_.intersection(arr,entities),'data':_.intersection(arr,data)};
                swdata = _.extend(swdata,queryfields);
                res.send(querystring.stringify(swdata));
              }else{   
                res.send(errors);
              }
              
          });

          
    	  });
     });	
}
module.exports = setupSiteWatch;