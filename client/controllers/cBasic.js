exports.dates = function($scope){
  $scope.myDate = new Date();
}

exports.tableToCSV = function($scope){
		$scope.message = "Hello Yuvaraj How are you";
}

exports.dialogAlert = function($scope, $mdDialog, $mdMedia) {
    
    
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.showAlert = function(ev,label,title,desc) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(desc)
        .ariaLabel(label)
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
    
}

exports.progressBars = ['$scope', '$interval', function($scope, $interval) {
    var self = this, j= 0, counter = 0;
    self.mode = 'query';
    self.activated = true;
    self.determinateValue = 30;
    self.determinateValue2 = 30;
    self.showList = [ ];
    /**
     * Turn off or on the 5 themed loaders
     */
    self.toggleActivation = function() {
        if ( !self.activated ) self.showList = [ ];
        if (  self.activated ) {
          j = counter = 0;
          self.determinateValue = 30;
          self.determinateValue2 = 30;
        }
    };
    $interval(function() {
      self.determinateValue += 1;
      self.determinateValue2 += 1.5;
      if (self.determinateValue > 100) self.determinateValue = 30;
      if (self.determinateValue2 > 100) self.determinateValue2 = 30;
        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars
        if ( (j < 2) && !self.showList[j] && self.activated ) {
          self.showList[j] = true;
        }
        if ( counter++ % 4 == 0 ) j++;
        // Show the indicator in the "Used within Containers" after 200ms delay
        if ( j == 2 ) self.contained = "indeterminate";
    }, 100, 0, true);
    $interval(function() {
      self.mode = (self.mode == 'query' ? 'determinate' : 'query');
    }, 7200, 0, true);
  }];
	