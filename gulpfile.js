var gulp = require('gulp'),
	less = require('gulp-less'),
	connect = require('gulp-connect'),
	clean = require('gulp-clean');

gulp.task('clean', function(){
	return gulp.src('css', {read: false}).pipe(clean());
});

gulp.task('less', function() {
   gulp.src('less/*.less')
      .pipe(less())
      .pipe(gulp.dest('css'));
});

gulp.task('webserver', function() {
	connect.server({
		root: '.',
		livereload: true
	});
});
 
gulp.task('default', [
	'clean',
	'less',
	'webserver'
]);