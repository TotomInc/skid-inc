module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat_css: {
            prod: {
                src: ['app/css/*.css'],
                dest: 'app/prod/skid-inc.css'
            }
        },

        cssmin: {
            prod: {
                files: {
                    'app/prod/skid-inc.min.css': ['app/prod/skid-inc.css']
                }
            }
        },

        concat: {
            prod: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    separator: ';\n\n'
                },
                src: [
                    'app/js/helpers/*.js',
                    'app/js/core/core.js',
                    'app/js/core/options.js',
                    'app/js/core/*.js',
                    'app/js/console/core.js',
                    'app/js/console/cmds.js',
                    'app/js/console/*.js',
                    'app/js/sounds/*.js',
                    'app/js/achievements/*.js'
                ],
                dest: 'app/prod/skid-inc.js'
            }
        },
        
        uglify: {
            prod: {
                options: {
                    mangle: true,
                    maxLineLen: 2000
                },
                files: {
                    'app/prod/skid-inc.min.js': ['app/prod/skid-inc.js']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['concat_css:prod', 'cssmin:prod', 'concat:prod', 'uglify:prod']);
};