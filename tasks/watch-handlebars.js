const gulp = require('gulp');
const watch = require('gulp-watch');

gulp.task('html', function () { console.log('Working!');});

gulp.task('watch', function() {
  watch('source/**/**', function () {
    gulp.start('html', done);
  });
});
