const gulp = require('gulp'),
	postcss= require('gulp-postcss'),
	cssnext = require('postcss-cssnext'),
	Import = require('postcss-import'),
	cssnano = require('cssnano'),
	mqpacker = require('css-mqpacker'),
	fontMagician = require('postcss-font-magician'),
	browserSync = require('browser-sync').create();

//gulp.task(nombre, funcion)
gulp.task('default', ['serve','watch'])

gulp.task('serve', ()=>{
	browserSync.init({
		server: './'
	})
})

gulp.task('watch',()=>{
	gulp.watch('./src/*.css', ['css'])
	gulp.watch('./*.html').on('change', browserSync.reload)
})

gulp.task('css', ()=>{
	const procesar = [
		Import(),
		cssnext({browsers: ['ie 8']}),
		fontMagician(),
		mqpacker(),
		//cssnano()
	]
	return gulp.src('./src/estilos.css')
	.pipe(postcss(procesar))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream())
})