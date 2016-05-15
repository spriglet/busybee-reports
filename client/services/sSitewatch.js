

exports.employeeItems = function($http){
     
      var report_data = function(empcode,to,from,empitem){
         
        var url = "/sitewatch/sale/employee/items/rptcategory?to="+  to+"&from="+ from+"&empnumber="+empcode.toString()+"&emprolename=Cashier";
        return $http.get(url)
         .success(function(response) {
            return response;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });
     }
     
     return {data:report_data};

}

exports.itemItems = function($http){
     
     var report_data = function(empcode,to,from,empitem){
        var url = "/sitewatch/sale/employee/items/items2/rptcategory?to="+to+"&from="+from+"&item2="+empitem+"&emprolename=Cashier";
        return $http.get(url)
         .success(function(response) {
            return response;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });
     }
     
     return {data:report_data};

}

// data thats the employee name and code
exports.employeeList = function($http){
  return $http.get("/sitewatch/formfields/employee")
        .success(function(response) {
            return response;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });          
}

// data thats the employee name and code
exports.itemList = function($http){
  return $http.get("/sitewatch/formfields/items")
        .success(function(response) {
            return response;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });          
}

exports.saleEmployeeFacts = function($http){


         var data =  function(empcode,to,from,fact){
         
                var url = "/sitewatch/sale/employee/facts?to="+to.toString()+"&from="+from.toString()+"&fact="+fact.toString()+"&factprofitcenter=0&emprolename=Cashier&empnumber="+empcode.toString();
                return $http.get(url)
                 .success(function(response) {
                    return response;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                });
          }
     
     return {data:data};
}


exports.saleItemFacts =  function($http,$){
         
         
        var data = function(item,to,from,fact){
        var url = "/sitewatch/sale/items/facts?to="+  to+"&from="+ from+"&item="+item.toString()+"&factprofitcenter=0&fact="+fact.toString();
        return $http.get(url)
         .success(function(response) {
            return response;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });
     
        }
        
       
        
     return {data:data};
}