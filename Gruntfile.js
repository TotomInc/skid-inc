// the code is transpiled to es5 because uglify don't support es6

module.exports = function(grunt) {
	grunt.initConfig({
        concat_css: {
            prod: {
                src: ['app/css/*.css'],
                dest: 'app-prod/css/skid-inc.css'
            }
        },

        cssmin: {
            prod: {
                files: {
                    'app-prod/css/skid-inc.min.css': ['app-prod/css/skid-inc.css']
                }
            }
        },

        concat: {
            prod: {
                options: {
                    separator: ';\n'
                },
                src: [
                	'app/js/misc/*.js',
                	'app/js/game/core.js',
                	'app/js/game/options.js',
                    'app/js/game/player.js',
                    'app/js/game/console.js',
                	'app/js/game/places.js',
                    'app/js/game/scripts.js',
                    'app/js/game/*.js',
                    'app/js/game/console-commands.js'
                ],
                dest: 'app-prod/js/skid-inc.js'
            }
        },

        uglify: {
            prod: {
                options: {
                    mangle: { toplevel: true },
                    maxLineLen: 2000
                },
                files: {
                    'app-prod/js/skid-inc.min.js': ['app-prod/js/skid-inc.es5.js']
                }
            }
        },

	    es6transpiler: {
	    	dist: {
	    		options: {
	    			"disallowUnknownReferences": false
	    		},
	        	files: {
	        		"app-prod/js/skid-inc.es5.js": "app-prod/js/skid-inc.js"
	        	}
	    	}
	    }
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['concat_css:prod', 'cssmin:prod', 'concat:prod', 'es6transpiler', 'uglify:prod']);
};