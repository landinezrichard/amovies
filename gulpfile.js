// Dependencias
let gulp        = require('gulp');
let sass        = require('gulp-sass');
let browserSync = require('browser-sync').create();

// Rutas archivos
let paths = {
	css:{
		main  : './src/css/sass/estilos.scss',
		watch : './src/**/*.scss',
		dest  : 'src/css/'
	},
	html:{
		main  : './src/*.html'
	},
	js:{
		main  : './src/js/app.js',
		watch : './src/**/*.js',
		dest  : './src/js/'
	},
	server:{
		folder : './src'
	}
};

// Compile sass into CSS & auto-inject into browsers
style = () =>{
	return gulp.src(paths.css.main)
		.pipe(sass())
		.pipe(gulp.dest(paths.css.dest))
		.pipe(browserSync.stream());
};

// Static Server + watching scss/html files
serve = () =>{
	browserSync.init({
		server: {
			baseDir: paths.server.folder,
			// directory: true
		}
	});
	gulp.watch(paths.css.watch, style);
	gulp.watch(paths.html.main).on('change', browserSync.reload);
	gulp.watch(paths.js.watch).on('change', browserSync.reload);
};

// JavaScript Files
js = () => {
	// return gulp.src([		
	// 	'node_modules/jquery/dist/jquery.min.js',
	// 	'node_modules/tiny-slider/dist/min/tiny-slider.js'
	// 	])
	return gulp.src(		
		'./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest(paths.js.dest))
		.pipe(browserSync.stream());
};

//tarea build
gulp.task('build', gulp.parallel(style, js))

gulp.task('default', gulp.series('build', serve) );