'use strict';

// Require
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');  // caches the templates with $templateCache
var uglify = require('gulp-uglify');                        // minifies JavaScript
var minifyCss = require('gulp-minify-css');                 // minifies CSS
var concat = require('gulp-concat');                        // concat JavaScript
var path = require('path');

// Vars
var src = 'assets/';
var dst = 'dist/';
var tplPath = 'assets/templates' //must be same as fileManagerConfig.tplPath

gulp.task('cache-templates', function () {
  return gulp.src(tplPath + '/*.html')
    .pipe(templateCache('cached-templates.js', {
      module: 'FileManagerApp',
      base: function(file) {
        return tplPath + '/' + path.basename(file.history);
      }
    }))
    .pipe(gulp.dest(dst));
});

gulp.task('concat-uglify-js', function() {
  return gulp.src(src + 'js/*.js')
    .pipe(concat('angular-filemanager.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dst))
});

gulp.task('minify-css', function() {
  return gulp.src(src + 'css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(dst));
});

gulp.task('default', ['cache-templates', 'concat-uglify-js', 'minify-css']);
gulp.task('build', ['default']);
