const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("sass"); // Використання Dart Sass напряму
const gulpSass = require("gulp-sass")(sass);
const browserSync = require("browser-sync").create();

// Параметри
const paths = {
  pug: {
    src: "src/pug/**/*.pug",
    dest: "Compiled-HTML",
  },
  scss: {
    src: "src/scss/**/*.scss",
    dest: "Compiled-HTML/css",
  },
  js: {
    src: "src/public/**/*.js",
    dest: "Compiled-HTML/js",
  },
  images: {
    src: "src/img/**/*",
    dest: "Compiled-HTML/img",
  },
  json: {
    src: "src/json/**/*.json",
    dest: "Compiled-HTML/json",
  },
};

// Компіляція Pug
function compilePug() {
  return gulp
    .src(paths.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

// Компіляція SCSS
function compileScss() {
  return gulp
    .src(paths.scss.src)
    .pipe(
      gulpSass({ outputStyle: "compressed" }).on("error", gulpSass.logError)
    )
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Копіювання JavaScript
function copyJs() {
  return gulp
    .src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// Копіювання зображень
function copyImages() {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
}

// Копіювання JSON файлів
function copyJson() {
  return gulp
    .src(paths.json.src)
    .pipe(gulp.dest(paths.json.dest))
    .pipe(browserSync.stream());
}

// Live Server для автоматичного оновлення браузера
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.pug.dest,
    },
    port: 3018,
    open: false,
  });

  gulp.watch(paths.pug.src, compilePug);
  gulp.watch(paths.scss.src, compileScss);
  gulp.watch(paths.js.src, copyJs);
  gulp.watch(paths.images.src, copyImages);
  gulp.watch(paths.json.src, copyJson);
  gulp.watch(`${paths.pug.dest}/*.html`).on("change", browserSync.reload);
}

// Експорт завдань для Gulp
exports.compilePug = compilePug;
exports.compileScss = compileScss;
exports.copyJs = copyJs;
exports.copyImages = copyImages;
exports.copyJson = copyJson;
exports.serve = serve;
exports.default = gulp.series(
  compilePug,
  compileScss,
  copyJs,
  copyImages,
  copyJson,
  serve
);
