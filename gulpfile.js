var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var less = require('gulp-less');

var browserify = require('browserify');	
var source = require('vinyl-source-stream');
var svgify = require("svgify");

var paths = {
	scripts: ['src/vendors/**/*.js', 'src/js/**/*.js', 'src/js/app.js'],
	styles: ['src/less/style.less', 'src/less/**/*.less'],
	assets: ['src/assets/*.*'],
	dist: './dist/',
	jsDist: './dist/js/'
};

gulp.task('browser-sync', function() {
    browserSync({
        server: "./dist"
    });
});

gulp.task('lint', function() {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['lint'], function() {
	var b = browserify('./src/js/app.js', { debug: true });
	b.transform("svgify");

	return b.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.jsDist))
		.pipe(reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest(paths.dist))
		.pipe(reload({stream: true}));
});

gulp.task('styles', function () {
    return gulp.src('src/less/style.less')
    	.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('assets', function() {
	return gulp.src(paths.assets)
		.pipe(gulp.dest("dist/assets"))
		.pipe(reload({stream: true}));
})

gulp.task('watch', ['default', 'browser-sync'], function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch(paths.assets, ['assets']);
});

gulp.task('default', ['scripts', 'styles', 'html', 'assets']);