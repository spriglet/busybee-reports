
// Date format for mm/dd/YYYY. Add days to the date
module.exports.dateAddDays = function(date,addDays) {
    var tt = date;
    var date = new Date(tt);
    var newdate = new Date(date);

    newdate.setDate(newdate.getDate() + addDays);
    
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();

    var someFormattedDate = mm + '/' + dd + '/' + y;
    return someFormattedDate;
}

// compares to objects based of a field name. 
module.exports.compare = function(A,B,fieldname){
         
        var itemsArray = {missing:[],added:[],both:[]};
       
        //lif( (B!=undefined) &&  B.length>0  && A.length>0){
        if( (B!=undefined) &&  B.length>0){
            var data = {missing:[],added:[],both:[]};
            data.added = _.difference(_.pluck(B,fieldname),_.pluck(A,fieldname));
            data.both = _.intersection(_.pluck(A,fieldname),_.pluck(B,fieldname));
            data.missing = _.difference(_.pluck(A.items,fieldname),_.pluck(B,fieldname));
            itemsArray.added =  _.filter(B,function(obj){   return data.added.indexOf(obj[fieldname])>-1       });
            itemsArray.both =  _.filter(B,function(obj){   return data.both.indexOf(obj[fieldname])>-1       });
            itemsArray.missing =  _.filter(A,function(obj){   return data.missing.indexOf(obj[fieldname])>-1       });
          
        }
        else{
            itemsArray.missing = A;
           
        }
        return itemsArray;
}
   