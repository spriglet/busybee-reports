var assert = require('assert');
GLOBAL._ = require('underscore');
var wagner = require('wagner-core');
var http = require('http');
var express = require('express');
var app = express();
var basic = require('./server/basic');
require('console.table');

    describe('json data',function(){
     
        function groupBySaleID(data){
            /* This functions takes a groups of sales records that are generated by sitewatch 
                in a form of JSON and seperates BY Sales ID and returns it in the form of a JSON object. 
            */
            var saleIDs = _.unique( _.pluck(data,"SALEID") );
            var json = {records:[]};
            for(var saleid in saleIDs) {
                             
                            var record = _.filter(data, function(sale){ return sale.SALEID==saleIDs[saleid]; });
                             var items = [];
                             record.forEach(function(item){
                                   var itemName = item.NAME_01;
                                   var qty = item.QTY;
                                   var amt  = item.AMT;
                                   var rptcategory = item.NAME;
                                  items.push({'name':itemName,'qty':qty,'amt':amt,'rptcategory':rptcategory});
                             });
                             var sale = record[0];
                             json['records'].push({"SALEID":saleIDs[saleid],"STATUS":sale.STATUS,"ACTUALSALEID":sale.ACTUALSALEID,"items":items });
           
            }
            
            return json;
        }
      
        
        function seperate_by_sale_status(records){
            /*
               This functions takes a group of actual sales and seperates and determines which items are missing from the completed sale. 
               
            */
            var actualsaleid = _.unique( _.pluck(records,"ACTUALSALEID") );                 
            var modSales = [];
            actualsaleid.forEach(function(saleid,index){    
                var records = json.records;
                var adjustedSale = _.filter(records, function(sale){ return sale.ACTUALSALEID==saleid && sale.STATUS=="Adjusted"; });
                var completedSale = _.filter(records, function(sale){ return sale.ACTUALSALEID==saleid && sale.STATUS.indexOf('C:')>-1; });
                var A = []; 
                var B = [];
                if(completedSale.length!=0)
                  B =  completedSale[0].items;
                if(adjustedSale.length!=0)  
                  A = adjustedSale[0].items;  
               
                var salesData =   basic.compare(A,B,"name");
                var added =  _.map(salesData.added,function(obj){ obj.type='A'; obj.SALEID=saleid; obj.ACTUALSALEID=saleid; return obj;  }   )   ;
                var missing =  _.map(salesData.missing,function(obj){ obj.type='M'; obj.SALEID=saleid; obj.ACTUALSALEID=saleid; return obj;  }   )   ;
                var both =  _.map(salesData.both,function(obj){ obj.type='R'; obj.SALEID=saleid; obj.ACTUALSALEID=saleid; return obj;  }   )   ;
                modSales =  modSales.concat(added,missing,both);
                 var val =   ( ((A.length + B.length) - both.length  ));
             
                //console.table(added);
                //console.table(missing);
               it('works',function(){
                    assert.equal('A','A')
               })
            });
            
            return modSales
        }
             // this part of the application seperates the SALEIDs
        var p =  require('./test.json');
        var modSales = _.filter(p, function(sale){ return sale.ACTUALSALEID>0; });
        var regularSales =  _.filter(p, function(sale){ return !sale.ACTUALSALEID>0; });
        regularSales = _.map(regularSales,function(obj){ obj.type='R'; return obj;       })
        var json = groupBySaleID( modSales);
        var sales = regularSales.concat(seperate_by_sale_status(modSales));
        console.log(sales);
        ///console.log(sales.length)
        it('works',function(){
          assert.equal('A','A')
        })
})