// Karma configuration
// Generated on Fri Aug 09 2013 14:14:35 GMT-0500 (CDT)

module.exports = function(config) {
  var configuration = {

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.3/angular-mocks.js',
      'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.js',
      'src/*.js',
      'test/*.js'
    ],

    plugins: [
      "karma-phantomjs-launcher",
      "karma-chrome-launcher",
      "karma-jasmine",
      "karma-coverage"
    ],

    // preprocessors: {
    //   "src/*.js": ["coverage"]
    // },

    // // optionally, configure the reporter
    // coverageReporter: {
    //   dir : "coverage/",
    //   reporters: [
    //     {type: "lcov", subdir: "lcov"}
    //   ]
    // },

    // // test results reporter to use
    // // possible values: "dots", "progress", "junit"
    // reporters: ["dots", "coverage"],

    // list of files to exclude
    exclude: [

    ],

    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['ChromeDebugging'],

    customLaunchers: {
      ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ]
      }
    },


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false

  };

  config.set(configuration);
};
