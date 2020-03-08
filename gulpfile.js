var gulp = require('gulp'),
   concat = require('gulp-concat'),
   autoprefixer = require('gulp-autoprefixer'),
   sass = require('gulp-sass'),
   pug = require('gulp-pug'),
   livereload = require('gulp-livereload'),
   sourcemaps = require('gulp-sourcemaps'),
   notify = require("gulp-notify"),
   minify = require('gulp-minify');


//Html Task

gulp.task('html', function () {
   return gulp.src('stages/html/*.pug')
      .pipe(pug({
         pretty: true
      }))
      .pipe(gulp.dest('dist'))
      .pipe(livereload());
});




//Css Tasks

gulp.task('css', function () {
   return gulp.src(["stages/css/**/*.css", "stages/css/**/*.scss"])
      .pipe(sourcemaps.init())
      .pipe(sass({
         outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'))
      .pipe(livereload());
});



//Js Tasks

gulp.task('js', function () {
   return gulp.src("stages/js/*.js")
      .pipe(concat('main.js'))
      .pipe(minify())
      .pipe(gulp.dest('dist/js'))
      .pipe(livereload());
});


//Watch Task
gulp.task('watch', function () {
   require('./server.js');
   livereload.listen();
   gulp.watch('stages/html/**/*.pug', gulp.series('html'));
   gulp.watch(["stages/css/**/*.css", "stages/css/**/*.scss"], gulp.series('css'));
   gulp.watch('stages/js/*.js', gulp.series('js'));

});