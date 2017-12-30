'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var importer = require('node-sass-globbing');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var bulkSass = require('gulp-sass-glob-import');
var browserSync = require('browser-sync').create();


var sass_config = {
  importer: importer,
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
    'node_modules/singularitygs/stylesheets/',
    'node_modules/compass-mixins/lib/'
  ]
};
 
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(bulkSass ({ extensions: ['.scss'] }))
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        injectChanges: true,
        proxy: "127.0.0.1/foodsource"
    });
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch("./css/**/*.css").on('change', browserSync.reload);
    gulp.watch("./js/**/*.js", ['uglify']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
}); 

gulp.task('default', ['watch']);
