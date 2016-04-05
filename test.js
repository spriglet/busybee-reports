GLOBAL._ = require('underscore');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var assert = require('assert');
var app = require('./server');
var superagent = require('superagent');
var wagner = require('wagner-core');
var REST = require('./controllers/REST');
var schema = require('./controllers/schema');
describe('SiteWatch',function(){
   var sitewatch = new REST('./swconfig.js');  
 
  var path = '/sitewatch/sale/employee/items/items2/rptcategory';
  it('Valid Path', function(done){
    //  test
    console.log(sitewatch.ispath(path));
    assert.notEqual( sitewatch.ispath(path),false);
    done();
  });
    var reqschema = sitewatch.getpathschemas(path);
  //var fields = reqschema[3].fields;
  it('Valid Schema', function(done){
    
    console.log(reqschema);
    assert.notEqual( reqschema[3].fields,undefined);
    done();
  });
});

