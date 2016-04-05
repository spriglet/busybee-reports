exports.reporttable= function($scope, $http) {
    $scope.item = '49500088';
    $scope.startdate = '03/10/2016';
    $scope.enddate = '03/17/2016'
    $http.get("/sitewatch/sale/employee/items/items2/rptcategory?to="+$scope.startdate.toString()+"&from="+$scope.enddate.toString()+"&item2="+$scope.item.toString()+"&emprolename=Cashier")
    .then(function(response) {
       $scope.rptcategories = response.data.rptcategories;
       $scope.salecount = response.data.salecount;
       
 
      
   });
}