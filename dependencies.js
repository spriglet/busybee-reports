
var paths = require('./paths');
var schema = require('./schema');
var SiteWatch = require('./sitewatch');
var url = require('url');
var querystring = require('query-string');
var schema = require('./schema');
var http = require('http');
var paths = require('./paths');
module.exports = function(wagner) {
  var sitewatch = require('./sitewatch.js')(wagner,app);
  wagner.factory('SiteWatch',function(){
		
		   return new SiteWatch();
	})
  wagner.factory('schema',function(){
                
       return schema;           
  });
}	