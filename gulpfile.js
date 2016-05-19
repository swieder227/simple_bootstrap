var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require('gulp-autoprefixer');
var concat = require("gulp-concat");
var browserify = require('gulp-browserify');

var PATH = {
  SCSS_SRC : ["src/scss/*.scss"],
  SCSS_OUT : "dist/",
  CSS_NAME : "styles.css",
  JS_SRC : "src/js/*.js",
  JS_ENTRY : "src/js/main.js",
  JS_OUT : 'dist/',
  JS_NAME : 'bundle.js'
}

// Compile CSS
gulp.task('devSCSS', function(){
  gulp.src(PATH.SCSS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(PATH.CSS_NAME))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(PATH.SCSS_OUT))
});

// Compile JS
gulp.task('devJS', function() {
  // var production = gutil.env.type === 'production';
  gulp.src([PATH.JS_ENTRY], {read: false})
    .pipe(browserify({
      debug: true
    }))
    .pipe(concat(PATH.JS_NAME))
    .pipe(gulp.dest(PATH.JS_OUT));
});

// Watch CSS + JS, run compile tasks on save
gulp.task('devWatch', function(){

  gulp.watch(PATH.SCSS_SRC, function(){
    gulp.start('devSCSS');
  });

  gulp.watch(PATH.JS_SRC, function(){
    gulp.start('devJS');
  })

});


gulp.task('default', ['devSCSS', 'devJS', 'devWatch']);