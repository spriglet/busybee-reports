var config = require('./swconfig'); // sitewatch configuration file that maps the correct variables
// creates the site watch rest api	
function setupSiteWatch(app,url,schema,querystring,http,paths){
    var entities = ['employee','site','customer','terminal'];
    var data = ['facts','items'];
    //var testa = ['reportcateogry','test'];
    var mainpath = "sitewatch"
    paths.addbranches(mainpath+'/sale',[entities]);
    paths.addbranches(mainpath+'/sale',[entities,data]);
    paths.chain(function(branch){
        app.get(branch.toString(),function(req, res) {
              var arr = branch.substr(("/sitewatch/").length).split('/');
              var pathschemas = arr.map(function(val){ return config[val]; });
             
              var relationship = schema.merge(Object.create(pathschemas),'object',false);
              var fields = config['sale'].fields.join(',')+','+config[arr[1]].fields.join(',')
              //delete relationship.fields;
              
              var queryfields = url.parse(req.url,true).query; 
                           
              var errors = schema.validate(relationship,queryfields);
               //res.send( relationship);
              if(!errors){
                
                var queryfields = _.extend(queryfields,{logdate:queryfields.to+'TO'+queryfields.from})
                var swdata = {'entity':_.intersection(arr,entities),'data':_.intersection(arr,data),'fields':fields};
                swdata = _.extend(swdata,queryfields); 
                delete swdata['from'];
                delete swdata['to'];
              /*
              http.get('http://50.240.52.173:5544/index.php?'+
                querystring.stringify(swdata), 
                function (response) {
                var finalData = "";

                response.on("data", function (data) {
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
module.exports = setupSiteWatch;