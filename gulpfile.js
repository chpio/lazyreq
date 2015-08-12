'use strict';

var gulp = require('gulp');
var newer = require('gulp-newer');
var babel = require('gulp-babel');

gulp.task('build', function() {
	return gulp.src('./src/**/*.js')
		.pipe(newer('./build'))
		.pipe(babel({
			sourceMaps: 'inline',
		}))
		.pipe(gulp.dest('./build'));
});
