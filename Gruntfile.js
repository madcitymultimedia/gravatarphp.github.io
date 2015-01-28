module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: ['assets/'],
		},
		less: {
			dist: {
				options: {
					comporess: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'style.css.map',
					sourceMapFilename: 'assets/css/style.css.map',
					modifyVars: {
						modernizrClass: '<%= modernizr.dist.extensibility.cssclassprefix %>',
					},
				},
				files: {
					'assets/css/style.css': '_src/less/style.less',
				},
			},
			minified: {
				options: {
					cleancss: true,
					report: 'min',
				},
				files: {
					'assets/css/style.min.css': 'assets/css/style.css',
				},
			},
		},
		copy: {
			assets: {
				files: [
					{
						expand: true,
						cwd: '_src/',
						src:['fonts/**', 'img/**'],
						dest:'assets/',
					},
				],
			},
			vendor: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'bower_components/jquery/dist/jquery.min.js',
							'bower_components/bootstrap/dist/js/bootstrap.min.js',
							'bower_components/html5shiv/dist/html5shiv.js',
							'bower_components/respond/dest/respond.min.js',
						],
						dest: 'assets/js/lib/',
					},
					{
						expand: true,
						flatten: true,
						src: [
							'bower_components/bootstrap/dist/fonts/*',
							'bower_components/fontawesome/fonts/*',
						],
						dest: 'assets/fonts/',
					},
				],
			},
		},
		humans_txt: {
			options: {
				intro: '<%= pkg.description %>',
				commentStyle: 'u',
				includeUpdateIn: 'site',
				content: grunt.file.readJSON('_src/humans.json'),
			},
			files: {
				dest: 'humans.txt',
			},
		},
		favicons: {
			options: {
				trueColor: true,
				precomposed: true,
				appleTouchBackgroundColor: 'auto',
				coast: true,
				windowsTile: true,
				tileBlackWhite: true,
				tileColor: 'none',
				HTMLPrefix: 'assets/icons/',
				firefox: true,
				firefoxManifest: 'manifest.webapp',
			},
			dist: {
				src: '_src/favicon.png',
				dest: 'assets/icons/',
			},
		},
		firefoxManifest: {
			dist: {
				options: {
					manifest: 'manifest.webapp',
				},
			},
		},
		manifest: {
			dist: {
				options: {
					basePath: '',
					network: ['http://*', 'https://*'],
					fallback: ['/ /offline.html'],
				},
				src: [
					'assets/css/*.css',
					'assets/js/*.js',
				],
				dest: 'manifest.appcache',
			},
		},
		modernizr: {
			dist: {
				devFile: 'bower_components/modernizr/modernizr.js',
				outputFile: 'assets/js/lib/modernizr.min.js',
				extra: {
					shiv: false,
					mq: true,
					cssclasses: true,
				},
				extensibility: {
					cssclassprefix: '',
				},
				uglify: true,
				tests: [],
				files: {
					src: [
						'assets/css/*.css',
						'assets/js/*.js',
					],
				},
			},
		},
		watch: {
			options: {
				livereload: false,
			},
			less: {
				files: '_src/less/**/*.less',
				tasks: 'less',
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	// Task definition
	grunt.registerTask('assets', ['less', 'copy', 'modernizr']);
	grunt.registerTask('misc', ['humans_txt', 'firefoxManifest', 'favicons', 'manifest']);
	grunt.registerTask('dist', ['clean', 'assets', 'misc']);
	grunt.registerTask('dev', ['clean', 'assets']);
	grunt.registerTask('work', ['watch']);
	grunt.registerTask('default', 'dist');
};
