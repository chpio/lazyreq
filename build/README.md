# lazyreq
Require node modules lazily

## Install
```sh
$ npm i --save lazyreq
```

## Usage
```javascript
'use strict';

// es5
var lazyReq = require('lazyreq').default;

// es2015
import lazyReq from 'lazyreq';

var $ = lazyReq(require, { // pass the "require" function to lazyreq
	newer: 'gulp-newer',
	babel: 'gulp-babel',
	sass: 'gulp-sass',

	// You can also pass in an array.
	// The 1. item is the module name followed by functions.
	// The function is called with the module.
	fs: [
		'fs',
		function(fs) {
			return Promise.promisifyAll(fs);
		},
	],
	// in es6
	fs: ['fs', fs => Promise.promisifyAll(fs)],
	// or followed by strings.
	// The string is used to get a property from the module.
	readFile: [
		'fs',
		function(fs) {
			return bluebird.promisifyAll(fs);
		},
		'readFileAsync',
	],
	// in es6
	readFile: ['fs', fs => bluebird.promisifyAll(fs), 'readFileAsync'],
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
