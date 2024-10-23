const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Компіляція Pug
function compilePug() {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// Компіляція SCSS
function compileScss() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// Live Server для автоматичного оновлення браузера
function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("src/pug/**/*.pug", compilePug);
  gulp.watch("src/scss/**/*.scss", compileScss);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
}

exports.default = gulp.series(compilePug, compileScss, serve);

// const gulp = require("gulp");
// const pug = require("gulp-pug");
// const browserSync = require("browser-sync").create();

// gulp.task("pug", function () {
//   return gulp
//     .src("src/pug/**/*.pug")
//     .pipe(pug({ pretty: true }))
//     .pipe(gulp.dest("dist"))
//     .pipe(browserSync.stream());
// });

// gulp.task("serve", function () {
//   browserSync.init({
//     server: {
//       baseDir: "dist",
//     },
//   });

//   gulp.watch("src/pug/**/*.pug", gulp.series("pug"));
//   gulp.watch("dist/*.html").on("change", browserSync.reload);
// });

// gulp.task("default", gulp.series("pug", "serve"));
