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
                findNestedDependencies: true
            },
            minimize: {
                options: {
                    out: 'dist/lsystem.min.js',
                    optimize: 'uglify2',
                    inlineText: true
                }
            },
            compile: {
                options: {
                    out: 'dist/lsystem.js',
                    optimize: 'none',
                    inlineText: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('build', ['clean', 'requirejs']);
};