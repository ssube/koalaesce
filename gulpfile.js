var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');

var globs = {
  src: 'src/**/*.es6',
  test: 'tests/**/*.es6'
};

var res = [
  'package.json',
  'README.md',
  'LICENSE'
];

function babelOptions() {
  return {
    modules: 'umd'
  };
}

function eslintOptions() {
  return {
    configFile: 'eslint.json'
  };
}

gulp.task('lint', function () {
  return gulp.src(globs.src)
    .pipe(eslint(eslintOptions()))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('compile:es6', ['lint'], function () {
  return gulp.src(globs.src)
    .pipe(babel(babelOptions()))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', ['compile'], function () {
  require('babel/register')();

  return gulp.src(globs.test)
    .pipe(mocha());
});

gulp.task('package', function () {
  return gulp.src(res)
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['compile:es6']);
gulp.task('default', ['lint', 'compile', 'test', 'package']);
