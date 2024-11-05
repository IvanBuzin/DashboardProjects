const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Компіляція Pug
function compilePug() {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("Compiled-HTML"))
    .pipe(browserSync.stream());
}

// Компіляція SCSS
function compileScss() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("Compiled-HTML/css"))
    .pipe(browserSync.stream());
}

// Копіювання JavaScript
function copyJs() {
  return gulp
    .src("src/public/**/*.js")
    .pipe(gulp.dest("Compiled-HTML/js"))
    .pipe(browserSync.stream());
}

// Копіювання зображень
function copyImages() {
  return gulp
    .src("src/img/**/*")
    .pipe(gulp.dest("Compiled-HTML/img"))
    .pipe(browserSync.stream());
}

// Live Server для автоматичного оновлення браузера
function serve() {
  browserSync.init({
    server: {
      baseDir: "./Compiled-HTML",
    },
    port: 3010,
    open: false,
  });

  gulp.watch("src/pug/**/*.pug", compilePug);
  gulp.watch("src/scss/**/*.scss", compileScss);
  gulp.watch("src/public/**/*.js", copyJs);
  gulp.watch("src/img/**/*", copyImages);
  gulp.watch("Compiled-HTML/*.html").on("change", browserSync.reload);
}

// Експорт завдань для Gulp
exports.compilePug = compilePug;
exports.compileScss = compileScss;
exports.copyJs = copyJs;
exports.copyImages = copyImages;
exports.serve = serve;
exports.default = gulp.series(
  compilePug,
  compileScss,
  copyJs,
  copyImages,
  serve
);
