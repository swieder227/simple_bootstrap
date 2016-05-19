var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var concat = require("gulp-concat");

var PATH = {
  SCSS_SRC : ["src/scss/*.scss"],
  SCSS_OUT : "dist/",
  CSS_NAME : 'styles.css'
}

gulp.task('devSCSS', function(){
  gulp.src(PATH.SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(PATH.CSS_NAME))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.SCSS_OUT))
});

gulp.task('devWatch', function(){

  gulp.watch(PATH.SCSS_SRC, function(){
    gulp.start('devSCSS');
  });

});

gulp.task('default', ['devSCSS', 'devWatch']);