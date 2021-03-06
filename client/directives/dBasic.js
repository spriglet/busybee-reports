

exports.dates = function(){
  
    return {
    controller: 'AppCtrl',
    templateUrl: '/assets/templates/dates.html'
  }
}

exports.queryBar = function(){
  
    return {
    controller: 'AppCtrl',
    templateUrl: '/assets/templates/querybar.html'
  }
}

exports.exportToCsv = function($){
  	return {
    	restrict: 'A',
    	link: function (scope, element, attrs) {
    		var el = element[0];
	        element.bind('click', function(e){
	        	var table = e.target.nextElementSibling;
	        	var csvString = '';
	        	for(var i=0; i<table.rows.length;i++){
	        		var rowData = table.rows[i].cells;
	        		for(var j=0; j<rowData.length;j++){
	        	
	        			csvString = csvString +'"'+ rowData[j].innerHTML.toString().replace(/&nbsp;/g, '')+'"'+ ',';
	        		}
	        		csvString = csvString.substring(0,csvString.length - 1);
	        		csvString = csvString + "\n";
			    }
	         	csvString = csvString.substring(0, csvString.length - 1);
	         	var a = $('<a/>', {
		            style:'display:none',
		            href:'data:application/octet-stream;base64,'+btoa(csvString),
		            download:'data.csv'
		        }).appendTo('body')
		        a[0].click()
		        a.remove();
	        });
    	}
  	}
	}