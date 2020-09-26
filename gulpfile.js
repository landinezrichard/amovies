// Dependencias
let gulp        = require('gulp');
let sass        = require('gulp-sass');
let browserSync = require('browser-sync').create();

// Rutas archivos
let paths = {
	css:{
		main  : 'src/css/sass/estilos.scss',
		watch : 'src/**/*.scss',
		dest  : 'src/css/'
	},
	html:{
		main  : 'src/*.html'
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
};

gulp.task('default', gulp.series(style, serve) );