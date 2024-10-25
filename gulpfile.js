const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Компіляція Pug
function compilePug() {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(
      pug({
        pretty: true,
        locals: {
          data: [
            { id: 1, name: "Jane Cooper", email: "jane@microsoft.com" },
            { id: 2, name: "Floyd Miles", email: "floyd@yahoo.com" },
          ],
        },
      })
    )
    .pipe(gulp.dest("Compiled-HTML"))
    .pipe(browserSync.stream());
}

// Компіляція SCSS
function compileScss() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("Compiled-HTML/css"))
    .pipe(browserSync.stream());
}

// Копіювання зображень
gulp.task("images", function () {
  return gulp.src("src/img/**/*").pipe(gulp.dest("Compiled-HTML/img"));
});

// Live Server для автоматичного оновлення браузера
function serve() {
  browserSync.init({
    server: {
      baseDir: "./Compiled-HTML",
    },
  });
  gulp.watch("src/pug/**/*.pug", compilePug);
  gulp.watch("src/scss/**/*.scss", gulp.series(compileScss));
  gulp
    .watch("src/img/**/*", gulp.series("images"))
    .on("change", browserSync.reload);
  gulp.watch("./Compiled-HTML/*.html").on("change", browserSync.reload);
}

exports.default = gulp.series(compilePug, compileScss, "images", serve);
