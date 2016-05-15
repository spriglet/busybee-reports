exports.reportTable = function($scope,$filter,employeeItems,itemItems,$mdDialog,employeeFacts,itemFacts,jsonFunc,merge,jsonq) {
   
   /*
      This function builds the reports table for the employee items reports. 
   */
   $scope.submit = function() {
       if ($scope.startdate && $scope.enddate && $scope.employee) {
            $scope.showReport = false;
            var empnumber = $scope.employee.CODE;
            $scope.showQuery = true;
           
        
            // Date Formating
            var to = $filter('date')(new Date($scope.startdate), 'MM/dd/yyyy');
            var from = $filter('date')(new Date($scope.enddate), 'MM/dd/yyyy');
            var employeeCarCount = employeeFacts.data(empnumber,to,from,"CountedCarCount");
            var itemCarCount = itemFacts.data($scope.item_objid,to,from,"CountedCarCount");
            employeeCarCount.then(function(response){ 
                $scope.employee_carcount = jsonFunc.sumData(response,"DATA");
            });
            itemCarCount.then(function(response){ 
                $scope.item_carcount = jsonFunc.sumData(response,"DATA");
            });
        
            var employeeItemsData = employeeItems.data(empnumber,to,from,$scope.item_objid);
           
            employeeItemsData.then(function(responseEI){
                var itemItemsData = itemItems.data(empnumber,to,from,$scope.item_objid);
                itemItemsData.then(function(responseII){
                    $scope.item_item_salecount = responseII.data.salecount;
                    $scope.employee_items_salecount = responseEI.data.salecount
                    
                    $scope.rpt = merge(responseEI.data.rptcategories,responseII.data.rptcategories);
                    var EI = jsonq(responseEI.data.rptcategories);
                    var II = jsonq(responseII.data.rptcategories);
                    var report_categories =  jsonq.union(EI.find("report_category").value(),II.find("report_category").value());
                    var report = {rptcategories:[]};
                    var test = jsonq(report);
                   
                    report_categories.forEach(function(val){
                         var arr = [];
                         var items = [];
                         var items1 = EI.find("report_category",function(){ return this == val}).sibling("items");
                         var items2 = II.find("report_category",function(){ return this == val}).sibling("items");
                         var items = jsonq.union(items1.find("name").value(),items2.find("name").value());
                         
                         items.forEach(function(item){
                             
                              var t = {name:item,"employee_items": items1.find("name",function(){ return this == item}).sibling("employee_items").value(),
                                        "item_items":items2.find("name",function(){ return this == item}).sibling("item_items").value()};
                              arr.push(t);
                         });
                         
                        
                         
                         test.find('rptcategories').append({report_category:val,items:arr   } ,false );
                        
                    });
                    $scope.rpt = report.rptcategories;
                
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



