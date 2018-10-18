//all the variables and properties form following plugin are going to be assigned to corrosponding variable.

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass');

var jsSources = [
  'components/scripts/get-images.js',
  'components/scripts/image-modal.js'
]
var sassSources = ['components/sass/style.scss'];

gulp.task('log', function() {
  gutil.log("workflows are awesome!")
})

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js'))
    //.pipe(connect.reload())
})

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      //image: 'build/development/images',
      style: 'expanded'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('builds/development/css'))
    //.pipe(connect.reload())
})



