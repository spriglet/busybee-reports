GLOBAL._ = require('underscore');
var express = require('express');
var wagner = require('wagner-core');
var superagent = require('superagent');
var wagner = require('wagner-core');
var app = express();

//app.set('port', (process.env.PORT || 8081));

app.listen(process.env.PORT || 8081, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// client files are stored in the client folder 
app.use(express.static(__dirname + '/public'));


var sitewatch = require('./server/sitewatch.js')(wagner,app);

// views is directory for all template files
app.set('views', __dirname + '/sviews');
app.set('view engine', 'ejs');

wagner.invoke(function(sitewatch_sale_employee){});
wagner.invoke(function(sitewatch_sale_employee_items){});
wagner.invoke(function(sitewatch_sale_items2_items){});
wagner.invoke(function(form_fields){});
wagner.invoke(function(sitewatch_sale_employee_facts){});
wagner.invoke(function(sitewatch_sale_item_facts){});
app.get('/', function(request, response) {
      
	response.write("Welcome");	
		
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});