exports.reportTable = function($scope,$filter,employeeItems,itemItems,$mdDialog) {
   
   /*
      This function builds the reports table for the employee items reports. 
   */
   $scope.submit = function() {
       if ($scope.startdate && $scope.enddate && $scope.employee) {
            $scope.showReport = false;
            var empnumber = $scope.employee.CODE;
            $scope.showQuery = true;
            var to = $filter('date')(new Date($scope.startdate), 'MM/dd/yyyy');
            var from = $filter('date')(new Date($scope.enddate), 'MM/dd/yyyy');
            var employeeItemsData = employeeItems.data(empnumber,to,from,$scope.item_objid);
            employeeItemsData.then(function(responseEI){
                var itemItemsData = itemItems.data(empnumber,to,from,$scope.item_objid);
                itemItemsData.then(function(responseII){
                    $scope.item_item_salecount = responseII.data.salecount;
                    $scope.employee_items_salecount = responseEI.data.salecount
                    $scope.rpt =  angular.merge({},responseEI.data.rptcategories,responseII.data.rptcategories);
                    $scope.showReport = true;
                    $scope.showQuery = false;
                });
                
            });
        }else{
            
            $scope.showAlert(true,'Fields missing','Please check that all the fields are selected','Missing Fields Error');
        }  
   }
   
}

var findemployeeitem = function(empname,employeelist){
    var item_objid = null;
    employeelist.forEach(function(val){ 
            
            if( val.NAME.toString() == empname){
                
                item_objid = val.OBJID;
            }
            
        });
    return item_objid;
}

exports.employee = function($scope,employeeList,itemList){
    
   employeeList
    .then(function(response) {
       $scope.employees = response.data;
    });
   
   $scope.update = function(){
       
    itemList
    .then(function(response) {
       $scope.items = response.data;
         var empname = $scope.employee.NAME;
         var comma_location = empname.indexOf(',');
         empname = empname.toString().substring(comma_location+1 )  + " "+ empname.toString().substring(0,comma_location)
         $scope.item_objid = findemployeeitem(empname,$scope.items);
         
    });
    //var item = _.find($scope.items,{value:"Michael Boyle"});
  
   } 
}



