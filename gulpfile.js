var gulp = require("gulp");
var babel = require("gulp-babel");
var jasmine = require("gulp-jasmine");

gulp.task("scripts", function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("tests", ["scripts"], function () {
    return gulp.src("tests/**/*.js")
        //.pipe(babel())
        .pipe(jasmine())
});

gulp.task("default", ["scripts", "tests"]);
