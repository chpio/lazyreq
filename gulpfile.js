'use strict';

var gulp = require('gulp');

var $ = require('lazyreq')(require, {
	newer: 'gulp-newer',
	cached: 'gulp-cached',
	babel: 'gulp-babel',
	eslint: 'gulp-eslint',
});

gulp.task('build', function() {
	return gulp.src('./src/**/*.js')
		.pipe($.newer('./build'))
		.pipe($.babel({
			sourceMaps: 'inline',
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('lint', function() {
	return gulp.src(['./src/**/*.js', './gulpfile.js'])
		.pipe($.cached('lint'))
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError());
});
