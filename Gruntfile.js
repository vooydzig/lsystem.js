module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/*']
        },
        requirejs: {
            options: {
                mainConfigFile: 'src/app.js',
                include: ['l-system'],
                paths: {
                    'jquery': 'empty:'
                },
                logLevel: 0,
                findNestedDependencies: true,
                inlineText: true
            },
            minimize: {
                options: {
                    out: 'dist/l-system.min.js',
                    optimize: 'uglify2'
                }
            },
            compile: {
                options: {
                    out: 'dist/l-system.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('build', ['clean', 'requirejs']);
};