
var paths = require('./paths');
var schema = require('./schema');
var SiteWatch = require('./sitewatch');
module.exports = function(wagner) {
	wagner.factory('SiteWatch',function(){
		
		return new SiteWatch(paths,schema);
	})



}	