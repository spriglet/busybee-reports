var http = require('http');
module.exports = function(options,callback){ 
     var callback1 = function(response) {
                  var str = '';
                  //another chunk of data has been recieved, so append it to `str`
                  response.on('data', function (chunk) {
                    str += chunk;
                    
                  });
                  
                  //the whole response has been recieved, so we just print it out here
                  response.on('end', function () {
                     callback(str);  
                  });
                
     }
     var request = http.request(options, callback1);
     request.on('error', function (e) {
 
                       console.log(e);
     });
     request.end();
     
}
   

  