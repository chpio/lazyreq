# latyreq
Require node modules lazily

## Install
```sh
$ npm i --save lazyreq
```

## Usage
### ES6
```javascript
import lazyReq from 'lazyreq';

const $ = lazyReq(require, { // pass the "require" function to lazyreq
	newer: 'gulp-newer',
	babel: 'gulp-babel',
	sass: 'gulp-sass',
});

gulp.task('js', () =>
	gulp.src('./src/scripts/**/*.js')
		.pipe($.newer('./dist')) // requires newer
		.pipe($.babel()) // requires babel
		.pipe(gulp.dest('./dist/scripts'))
);

gulp.task('css', () =>
	gulp.src('./src/style/app.scss')
		.pipe($.sass()) // requires sass
		.pipe(gulp.dest('./dist/style'))
);
```

### ES5
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
