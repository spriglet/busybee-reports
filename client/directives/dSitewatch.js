exports.reportTable = function() {
  return {
    controller: 'MyController',
    templateUrl: '/assets/templates/sitewatch/reporttable.html'
  }
};

exports.employeeSelect = function(){
  return {
    controller: 'employees',
    templateUrl: '/assets/templates/sitewatch/employeeselect.html'
  }
  
}

exports.tabletocsv = function(){
   return{
    controller: 'tableToCSV',
    templateUrl: '/assets/templates/'
    
  }
  
  
}
exports.employeeItemsReport = function(){
  return{
    templateUrl: '/assets/templates/sitewatch/employeeitems.html'
    
  }
}