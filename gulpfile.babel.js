import qw from 'js-utils/qw';
import gulp from 'gulp';
import lazyReq from 'lazyreq';

const $ = lazyReq(require, {
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

gulp.task('watch', () => {
	gulp.watch('./src/**/*.js', qw('build lint'));
});
