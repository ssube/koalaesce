var gulp = require("gulp");
var babel = require("gulp-babel");
var mocha = require("gulp-mocha");
var rename = require("gulp-rename");

function compileModules(type, append) {
    if (append === undefined) append = true;

    return gulp.src("src/**/*.js")
        .pipe(babel({
            modules: type
        }))
        .pipe(rename(function (path) {
            if (append) path.basename += "-" + type;
        }))
        .pipe(gulp.dest("dist"));
}

gulp.task("scripts:amd", function () {
    return compileModules("amd");
});

gulp.task("scripts:common", function () {
    return compileModules("common", false);
});

gulp.task("scripts:umd", function () {
    return compileModules("umd");
});

gulp.task("scripts", ["scripts:amd", "scripts:common", "scripts:umd"]);

gulp.task("tests", ["scripts"], function () {
    require("babel/register");

    return gulp.src("tests/**/*.js")
        .pipe(mocha())
});

gulp.task("default", ["scripts", "tests"]);
