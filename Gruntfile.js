module.exports = function(grunt) {

grunt.initConfig({
// Metadata.
	pkg: grunt.file.readJSON('package.json'),    

	// Task configuration.
	clean: {
		build: {
			src: ["build", "temp"]
		},
		sprites: {
			src: ["app/images/sprites/*.png"]	
		}
	},
	
	concat: {
		js: {
			src: [ 'temp/_bower.js', 'app/js/*.js', 'app/js/**/*.js' ],
			dest: 'build/script.js'
		},
		css: {
			src: [ 'temp/_bower.css', 'temp/*.css' ],
			dest: 'build/style.css'
		}
	},

	bower_concat: {
		all: {
		  dest: 'temp/_bower.js',
		  cssDest: 'temp/_bower.css',
		  exclude: [],
//			mainFiles: {
//				bootstrap: 'dist/css/bootstrap.min.css'
//			},
		  dependencies: {},
			bowerOptions: {
				relative: false
			}
		}	
	},

	compass: {
		dev: {
			options: {
				sassDir: 'app/styles',
				cssDir: 'temp',
				imagesDir:             "app/images/",
				generatedImagesDir:    "app/images/",
				generatedImagesPath:   "app/images/",
				httpGeneratedImagesPath: "./images/",
				noLineComments: true
			},
		}		
	},

	connect: {
		server: {
		  options: {}
		}
	},

	open : {
		dev : {
			path: 'http://localhost:9000',
			app: 'Google Chrome'
		}
	},
	
	sync: {
		html: {
			files: [{
				cwd: 'app',
				src: [
					'index.html', 
					'views/*.html' 
				],
				dest: 'build/',
			}],
			pretend: false,
			verbose: true 
		},
		images: {
			files: [{
				cwd: 'app',
				src: [
					'favicon.ico',
					'images/*', 
					'images/sprites/*',
					'!images/sprites/icons' 
				],
				dest: 'build/',
			}],
			pretend: false, 
			verbose: true 
		}
	},
	
	connect: {
		options: {
			port: 9000,
			hostname: 'localhost',
			livereload: 35729,
			base: 'build/'
		},
		livereload: {
			options: {
				open: true
			}
		}
	},

	watch: {
		livereload: {
		  options: {
			  livereload: '<%= connect.options.livereload %>'
		  },
		  //Add here files you want to be live watched
		  files: [
			  'build/**/*'
		  ]
		},
		js: {
			files: ['app/js/**/*.js'],
			tasks: ['concat:js']
		},
		scss: { 
			files: 'app/styles/**/*.scss',
			tasks: ['compass', 'concat:css', 'sync:images']
		},
		html: {
			files: ['app/**/*.html'],
			tasks: ['sync:html']
		},
		sprites: {
			files: ['app/images/sprites/**/*.png'],
			tasks: ['compass', 'concat:css', 'sync:images']
		}
	}
	
});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sync');


  // Default task.
  grunt.registerTask('default', ['build', 'connect:livereload', 'open', 'watch']);
	grunt.registerTask('build', [ 'clean:build', 'compass', 'sync', 'clean:sprites', 'bower_concat', 'concat' ]);
};
