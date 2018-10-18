//all the variables and properties form following plugin are going to be assigned to corrosponding variable.

var gulp = require('gulp'),
    gutil = require('gulp-util')

gulp.task('log', function() {
  gutil.log("workflows are awesome!")
})