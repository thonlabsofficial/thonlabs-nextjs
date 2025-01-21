const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');


function uglify() {
  return gulp.src('dist/**/*.js').pipe(gulpUglify()).pipe(gulp.dest('dist/'));
}

exports.postBuild = gulp.series(uglify);
