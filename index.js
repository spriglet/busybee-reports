
var controllers = require('./client/controllers');
var directives = require('./client/directives/');
var services = require('./client/services/');

var myApp = angular.module('myApp',['ng','ngMaterial','ngMessages']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('yellow');
});
// Services 
myApp.factory('$',services.basic.jquery);
myApp.factory('employeeItems',services.sitewatch.employeeItems);
myApp.factory('itemItems',services.sitewatch.itemItems);
myApp.factory('employeeList',services.sitewatch.employeeList);
myApp.factory('itemList',services.sitewatch.itemList);
// Controllers
myApp.controller('MyController', controllers.sitewatch.reportTable);
myApp.controller('employees', controllers.sitewatch.employee);
myApp.controller('AppCtrl', controllers.basic.dates );
myApp.controller('AppCtrl',controllers.basic.progressBars)
myApp.controller('AppCtrl',controllers.basic.dialogAlert)
// Directives 
myApp.directive('reportTable', directives.sitewatch.reportTable);
myApp.directive('employeeSelect', directives.sitewatch.employeeSelect);
myApp.directive('dates', directives.basic.dates);
myApp.directive('queryBar', directives.basic.queryBar);
myApp.directive('employeeItemsReport', directives.sitewatch.employeeItemsReport);
myApp.directive('exportToCsv',directives.basic.exportToCsv); // link for the code sample for CSV report http://codepen.io/YuvarajTana/pen/yNoNdZ






