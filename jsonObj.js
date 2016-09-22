var jsonQ=require("jsonq");
var JsDiff = require("diff"); // https://www.npmjs.com/package/diff
var jsonQuery = require('json-query');
var spahql = require('spahql');
var jsonpatch = require('fast-json-patch');
var jsonpath = require('JSONPath');


function jsonObj(name){
    
	this.json = {records:[]};
	this.obj = jsonQ(this.json);
	
}
jsonObj.prototype.add = function (data){
    
    this.json["records"].push(data);
    
}
jsonObj.prototype.recordCount = function(){
    
    return this.json.records.length;
}
// compares to records

jsonObj.prototype.remove = function(searchField,id){
    
    
}


//https://docs.omniref.com/js/npm/json-query/0.5.0
jsonObj.prototype.search = function(query){
   var record =jsonQuery('records['+query+'].name', {
            data: this.json
                           
   },{rootContext: context}) //
   //var record = jsonpath(query,this.json);
   //console.log();
   return record.references[0];
}



// gets the index of the Json record
jsonObj.prototype.getIndex = function(searchField,value){
     
     var data = jsonQ(this.json);
     var records = data.find("records").find(searchField);
     return records.index(value);
    
}
jsonObj.prototype.appendToRecord = function(searchField,appendTo,appendObj,callback){
    
    var data = jsonQ(this.json);
    data.find("records").find(searchField,callback).parent().find(appendTo).append(appendObj);
    
}
jsonObj.prototype.appendToRecord2 = function(query,appendTo,appendObj,value){
  
   var record = this.search(query);
   //var patch = [{ op:"add", path:"/items/0", value:value }]
    //jsonpatch.apply( record, patch );    
    record[appendTo].push(appendObj);
}

// compares to records in the JSON object and returns objects that were added or deleted from a record. 
jsonObj.prototype.compare = function(searchField,id1,id2,compareData){
    var record1 = this.getRecord(searchField,function(){return  this==id1 });
    var record2 = this.getRecord(searchField,function(){return this==id2});
    console.log(record1);
    return JsDiff.diffJson(record1[0][compareData],record2[0][compareData])// .toString().replace('\n','');
  
}
jsonObj.prototype.recordExist = function(searchField,callback){
     var data = jsonQ(this.json);
     var record = data.find("records").find(searchField,callback).parent().value();  
     if(record.length==0)
         return false;
     else
         return true;
    
} 
// a search function where search is the field and the callback function is the search method. There is filter that is taken in form of a json stirng. 
jsonObj.prototype.getRecord = function(searchField,callback){
     
  
   var data = jsonQ(this.json);
  
   return data.find("records").find(searchField,callback).parent().value();
   
   
}
jsonObj.prototype.getAllRecords = function(){
    
    return this.json;
}
module.exports =  new jsonObj();