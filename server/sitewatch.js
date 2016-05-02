var REST = require('./REST');
var schema = require('./schema');
var querystring = require('query-string');
var http = require('http');
var url = require('url');
var curl = require('./curl');
var groupby = require('group-array');
var jsonq = require('jsonq');
module.exports = function(wagner,app) {
  var sitewatch = new REST('./swconfig.js');
  var omit_rpt_cateogry = ['Exterior Wash SVC ','Package Services','Wash Notes','Non-Reported Items','XPT Cash Add/Remove', 
                                       'Wash LPM Headers','UWP Headers']; 
  
　var optionsget = {
            host : '50.240.52.173', // here only the domain name
            port : 5544,
            path : '/index.php', // the rest of the url with parameters if needed
            method : 'GET' // do GET
   };
  // builds the sitewatch REST API 
  var swdata = function(name){       
       return function(data,json){   
          groupby(json,name);
       }
  }
var prepswquery = function(branch,schemas,url,desiredfields){
   
            // Merge the schema based on the query string 
            var reqschema = schema.merge(schemas,'object');
            var queryfields = querydata(url)
              // builds the availabe fields for the schema 
            var fields = buildschemafields(schemas);
            var fields = _.intersection(fields,desiredfields);
            var errors = sitewatch.validateschemaqrystr(reqschema,url);
            request(branch,queryfields,fields,optionsget);
            return errors;
          
}
  // Builds the query strings to be sent to sitewatch. 
  function querydata(urlstr){
      var queryfields = url.parse(urlstr,true).query;   
            //looks at the query fields
       queryfields = _.extend(queryfields,{logdate:queryfields.to+'TO'+queryfields.from})
       return queryfields;
  }
  function buildschemafields(schemas){
      // builds the availabe fields for the schema 
      var fields = [];
      schemas.forEach(function(s){ Array.prototype.push.apply(fields,s.fields) });
      return fields;
  }
  // Converts the url into something that control system file would accept. 
  function request(path,query,display,optionsget){
      var data = path.substr(("/sitewatch/").length).split('/');
      var queryfields = _.extend(data,{logdate:data.to+'TO'+data.from})
      var swdata = sitewatch.getpathdata('sale');       
      swdata = {'entity':_.intersection(data,swdata.entities),'data':_.intersection(data,swdata.data),'fields':display.join(',').toString()};
      swdata = _.extend(swdata,query); 
      delete  swdata['from'];
      delete swdata['to'];
      optionsget.path ="/index.php"+'?'+querystring.stringify(swdata);
       
    
  }
  function swschema(path,callback){
     
    return sitewatch.getpathschemas(path);
    
  }
  wagner.factory('sitewatch_REST_app',function(){   
     sitewatch.app(function(branch,schemas){
          appget(branch,schemas)
     });
  });
  // employee report
  wagner.factory('sitewatch_sale_employee',function(){    
        // /sitewatch/sale/employee?to=10/10/2015&from=10/10/2015&empnumber=3147
        var path = '/sitewatch/sale/employee';
        swschema(path);
        
  });
  var appget = function(path,url,desiredfields,callback){ 
      var errors= prepswquery(path,swschema(path),url,desiredfields);  
      if(!errors){           
        var jsondata = '';
        curl(optionsget,function(data){     
           callback(data,errors);
        });

      }else{
         callback(false,errors);
      } 
    
  }
  // Form fields from sitewatch, for example the employees and items ect 
  wagner.factory('form_fields',function(){ 
    
        var form_field_paths = sitewatch.getpaths();
        form_field_paths.forEach(function(path){

            var searchpath = 'sitewatch/formfields/';
            if(path.toString().search(searchpath)){
                var tabtype = path.substring(searchpath.length + 1);
                
                if(sitewatch.gettree('formfields').paths.tabtypes.indexOf(tabtype)!=-1){
                    app.get(path,function(req,res){
                         optionsget.path = '/index.php?file=formfields.php&tabtype='+tabtype.toString();
                         curl(optionsget,function(data){
                             if(!data==false){
                                 res.send(data);
                             }else{
                                 res.send('error on:'+tabtype.toString())
                             }
                             
                         })
                    });
                }
            }   
        });
  });
  // employee report
  wagner.factory('sitewatch_sale_employee_items',function(){ 
        var path = '/sitewatch/sale/employee/items/rptcategory';
        app.get(path,function(req,res){
               appget(path,req.url,['saleidfunc','rptcategory.name','item.name','saleitems.qty','saleitems.amt'], function(data,errors){
             
               //appget(path,req.url,['employee.name','employee.code'], function(data,errors){
                    if(!data==false){
                      //res.send(data);
                      var salecount = Object.keys(groupby(JSON.parse(data),'OBJID')).length;
                      var test =groupby(JSON.parse(data),'NAME_01','NAME');
                      var obj = {'salecount':salecount ,'rptcategories':[]};
                      var family = jsonq(obj);
                      jsonq.each(test,function(key,val){
                       if(omit_rpt_cateogry.indexOf(key)!=-1 ){
                             var items = []                   
                             jsonq.each(val,function(k,v){
                                  var qty = 0;
                                  var amt = 0;
                                  jsonq.each(v, function(ke,va){
                                      qty = qty + va.QTY;  
                                      amt = amt + va.AMT;
                                     
                                  });
                                  items.push({name:k,employee_items:{amount:amt,quantity:qty} }); 
                             });
                             family.find('rptcategories').append({name:key,items:items},false);
                        }
                      });
                     res.send(obj);
                     
                    }else
                      res.send(errors);
               });  
        });
  });
   // employee report
  wagner.factory('sitewatch_sale_items2_items',function(){ 
        var path = '/sitewatch/sale/employee/items/items2/rptcategory';
        //console.log(sitewatch.getpaths());
        app.get(path,function(req,res){
           
               
             appget(path,req.url,['saleidfunc','rptcategory.name','item.name','saleitems.qty','saleitems.amt'], function(data,errors){
                   //appget(path,req.url,['employee.name','employee.code'], function(data,errors){
                    if(!data==false){
                   
                      var salecount = Object.keys(groupby(JSON.parse(data),'OBJID')).length;
                      var test =groupby(JSON.parse(data),'NAME_01','NAME');
                      var obj = {'salecount':salecount ,'rptcategories':[]};
                      var family = jsonq(obj);
                      jsonq.each(test,function(key,val){
                         if(omit_rpt_cateogry.indexOf(key)==-1 ){
                             var items = []                   
                             jsonq.each(val,function(k,v){
                                  var qty = 0;
                                  var amt = 0;
                                  jsonq.each(v, function(ke,va){
                                      qty = qty + va.QTY;  
                                      amt = amt + va.AMT;
                                     
                                  });
                                  items.push({name:k,item_items:{amount:amt,quantity:qty} }); 
                             });
                             family.find('rptcategories').append({name:key,items:items},false);
                         }
                      });
                     res.send(obj);
                     
                    }else
                      res.send(errors);
                     
               });  
                 
               
        }); 
  });
}