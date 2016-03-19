module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        frameworks: ['requirejs', 'qunit'],
        files: [
            'test-runner.js',
            {pattern: 'test/**/*.test.js', included: false},
            {pattern: 'src/**/*.js', included: false},
            {pattern: 'lib/**/*.js', included: false}
        ],
        exclude: [],
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    })
};
