import gulp from "gulp";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import pug from "gulp-pug";
import concat from "gulp-concat";

//minify images
gulp.task("imgmin", async function () {
  gulp
    .src("src/assets/img/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img/images"));
});

//minify js
gulp.task("jsmin", async function () {
  gulp
    .src("src/assets/js/*.js")
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/assets/js"));
});

//compile sass
gulp.task("compilesass", async function () {
  gulp
    .src("src/assets/sass/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("src/assets/css"));
});

//minify css
gulp.task("cssmin", async function () {
  gulp
    .src("src/assets/css/*.css")
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/assets/css"));
});

//compile pug
gulp.task("compilepug", async function () {
  gulp.src("src/assets/pug/*.pug").pipe(pug()).pipe(gulp.dest("dist"));
});

//watch task
gulp.task("watch", async function () {
  gulp.watch("src/assets/img/images/*", gulp.series("imgmin"));
  gulp.watch("src/assets/js/*.js", gulp.series("jsmin"));
  gulp.watch("src/assets/sass/*.scss", gulp.series("compilesass"));
  gulp.watch("src/assets/css/*.css", gulp.series("cssmin"));
  gulp.watch("src/assets/pug/*.pug", gulp.series("compilepug"));
});

//default task
gulp.task(
  "default",
  gulp.parallel(
    "imgmin",
    "jsmin",
    "compilesass",
    "cssmin",
    "compilepug",
    "watch"
  )
);
