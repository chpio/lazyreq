'use strict';

var gulp = require('gulp');

var $ = require('lazyreq')(require, {
	newer: 'gulp-newer',
	babel: 'gulp-babel',
});

gulp.task('build', function() {
	return gulp.src('./src/**/*.js')
		.pipe($.newer('./build'))
		.pipe($.babel({
			sourceMaps: 'inline',
		}))
		.pipe(gulp.dest('./build'));
});
