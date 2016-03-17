var gulp = require('gulp');
var mocha = require('gulp-mocha');
var assert = require('assert');
var app = require('./server');
var superagent = require('superagent');
var wagner = require('wagner-core');
var dependencies = require('./dependencies')(wagner);
var url = require('url');
var schema = require('./schema');
GLOBAL._ = require('underscore');
describe('SiteWatch',function(){

  
	var dep = wagner.invoke(function(SiteWatch){ return {SiteWatch:SiteWatch} });
  var SiteWatch = dep.SiteWatch;
  
  it('Valid Url', function(done){
    
    assert.equal( SiteWatch.ispath('/sitewatch/sale/employee') ,true);
    
    
    var errors = SiteWatch.validurl('/sitewatch/sale/employee?to=sf',url,schema);
	  assert.equal(errors,true);
    if(errors){
       console.log(errors);
    }
  
    
    done();
  });
});

