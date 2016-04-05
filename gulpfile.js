var gulp = require('gulp');
var browserify = require('gulp-browserify');
var mocha = require('gulp-mocha');
var assert = require('assert');

// bro
gulp.task('browserify', function(){
  return gulp.
  src('index.js').
  pipe(browserify()).
  pipe(gulp.dest('./public/assets/bin'));
 
});

gulp.task('test',function(){
	gulp.
		src('./test.js').
		pipe(mocha()).
		on('error',function(err){
			this.emit('end');
		});


})

gulp.task('watch',function() {
   gulp.watch('./*.js',['test','browserify']);
 
});