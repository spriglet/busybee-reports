
var express = require('express');
var wagner = require('wagner-core');
var superagent = require('superagent');
var url = require('url');
var _ = require('underscore');
var querystring = require('query-string');
var jjv = require('jjv');
var env  = jjv();
env.addType('date', function (v) {
      var dateformat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
      var regex = new RegExp(dateformat);
      return regex.exec(v);
});
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
      
	response.write("Welcome");	
		
});
wagner.invoke(require('./sitewatch'), { app: app,url:url,schema:env,querystring:querystring,_:_ });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
