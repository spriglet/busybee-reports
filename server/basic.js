
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