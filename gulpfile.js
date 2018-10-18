//all the variables and properties form following plugin are going to be assigned to corrosponding variable.

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat')

var jsSources = [
  'components/scripts/get-images.js',
  'components/scripts/image-modal.js'
]

gulp.task('log', function() {
  gutil.log("workflows are awesome!")
})

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js'))
    //.pipe(connect.reload())
})



