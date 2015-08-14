const gulp = require('gulp');

const $ = require('lazyreq')(require, {
	newer: 'gulp-newer',
	cached: 'gulp-cached',
	babel: 'gulp-babel',
	eslint: 'gulp-eslint',
});

gulp.task('build', () =>
	gulp.src('./src/**/*.js')
		.pipe($.newer('./build'))
		.pipe($.babel({
			sourceMaps: 'inline',
		}))
		.pipe(gulp.dest('./build'))
);

gulp.task('lint', () =>
	gulp.src(['./src/**/*.js', './gulpfile.babel.js'])
		.pipe($.cached('lint'))
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.eslint.failAfterError())
);
