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
   var reqschema = sitewatch.getpathschemas('/sitewatch/sale/employee/items/rptcategory');
   //var fields = reqschema[3].fields;
  it('Valid Schema', function(done){
    //  test
    console.log(reqschema);
    var test = 1;
    assert.notEqual( reqschema[3].fields,undefined);
    done();
  });
});

