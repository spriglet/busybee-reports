module.exports = function(config){
       var customLaunchers = {
        sl_chrome: {
          base: 'SauceLabs',
          browserName: 'chrome',
          platform: 'Windows 7',
          version: '35'
        },
        sl_firefox: {
          base: 'SauceLabs',
          browserName: 'firefox',
          version: '30'
        },
        sl_ios_safari: {
          base: 'SauceLabs',
          browserName: 'iphone',
          platform: 'OS X 10.9',
          version: '7.1'
        },
        sl_ie_11: {
          base: 'SauceLabs',
          browserName: 'internet explorer',
          platform: 'Windows 8.1',
          version: '11'
        }
      }

   
    config.set({
       files: [
            'http://code.jquery.com/jquery-1.11.3.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
            './client/directives',
            './test/test.js'
        ],
        frameworks: ['mocha','chai'],

        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['dots', 'saucelabs'],
        singleRun: true
    });
    
    
}