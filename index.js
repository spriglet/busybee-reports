
var express = require('express');
var superagent = require('superagent');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  
  superagent.get("http://50.240.52.173:5544/")
  .end(function(e,res){

  		response.send(res);

  });
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
