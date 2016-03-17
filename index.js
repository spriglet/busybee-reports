
GLOBAL._ = require('underscore');
var express = require('express');
var wagner = require('wagner-core');
var superagent = require('superagent');
var url = require('url');
var querystring = require('query-string');
var schema = require('./schema');
var http = require('http');
var paths = require('./paths');
var wagner = require('wagner-core');
//var REST = require('./REST')

//var dep = require('./deps');
//var dep = require('./dependencies')(wagner);
//var dep = wagner.invoke(function(SiteWatch){ return {SiteWatch:SiteWatch} });
//console.log(dep.obj.gettest());
//var SiteWatch = dep.SiteWatch;
var app = express();
//var sitewatch = new REST('./swconfig.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
var sitewatch = require('./sitewatch.js')(wagner,app);
// views is directory for all template files
app.set('views', __dirname + '/sviews');
app.set('view engine', 'ejs');

wagner.invoke(function(sitewatch_sale_employee){});

app.get('/', function(request, response) {
      
	response.write("Welcome");	
		
});
//SiteWatch(app,url,schema,querystring,http,paths);

//wagner.invoke(require('./sitewatch'), { app: app,url:url,schema:schema,querystring:querystring,http:http,paths:paths });
//wagner.invoke(require('./paths'),{main:'test',branches:[['test1','test2'],['four','five']],callback:app});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
