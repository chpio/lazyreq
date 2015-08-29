# lazyreq
Require node modules lazily

## Install
```sh
$ npm i --save lazyreq
```

## Usage
```javascript
'use strict';

var lazyReq = require('lazyreq');

var $ = lazyReq(require, { // pass the "require" function to lazyreq
	newer: 'gulp-newer',
	babel: 'gulp-babel',
	sass: 'gulp-sass',
});

gulp.task('js', function() {
	return gulp.src('./src/scripts/**/*.js')
		.pipe($.newer('./dist')) // requires newer
		.pipe($.babel()) // requires babel
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('css', function() {
	return gulp.src('./src/style/app.scss')
		.pipe($.sass()) // requires sass
		.pipe(gulp.dest('./dist/style'));
});
```
