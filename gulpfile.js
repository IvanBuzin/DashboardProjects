const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

function serve() {
  browserSync.init({
    server: "./Compiled-HTML",
    open: false, // Додаємо цю опцію, щоб уникнути автоматичного відкриття браузера
  });
}

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
