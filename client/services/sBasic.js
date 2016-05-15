exports.jquery = function(){
   return require('jquery');
}


exports.underscore = function(){
   return require('underscore');
}

exports.jsonq = function(){
   return require('jsonq');
}

exports.mathjs = function(){
   
   return require('mathjs');
}

exports.merge = function(){
   
   return require('object-merge');
}
exports.jsonFunc = function(jsonq,mathjs){
    // sum the data of a JSON field
    var sumData = function(response,field){
            
            var salecount = jsonq(response);
            var data = salecount.find(field);
            return mathjs.sum(data.value());
    }

    return {sumData:sumData};   
}
