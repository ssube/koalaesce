var gulp = require("gulp");
var babel = require("gulp-babel");
var mocha = require("gulp-mocha");

gulp.task("scripts", function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task("tests", ["scripts"], function () {
    return gulp.src("tests/**/*.js")
        .pipe(mocha())
});

gulp.task("default", ["scripts", "tests"]);
