import gulp from "gulp";

//CSS Y SASS

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import cssnano from "cssnano";

//Imagenes
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import avif from "gulp-avif";

function css(done) {
  gulp
    .src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"));
  done();
}

function images(done) {
  gulp
    .src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(gulp.dest("build/img"));
  done();
}

function versionWebp(done) {
  gulp.src("src/img/**/*.{png,jpg}").pipe(webp()).pipe(gulp.dest("build/img"));
  done();
}

function versionAvif(done) {
  gulp.src("src/img/**/*.{png,jpg}").pipe(avif()).pipe(gulp.dest("build/img"));
  done();
}

function watchFiles() {
  gulp.watch("src/img/**/*", images);
  gulp.watch("src/scss/**/*.scss", css);
}

export const cssTask = css;
export const imagesTask = images;
export const versionWebpTask = versionWebp;
export const versionAvifTask = versionAvif;
export const watchFilesTask = watchFiles;
export const defaultTask = gulp.series(
  imagesTask,
  versionWebpTask,
  versionAvifTask,
  cssTask,
  watchFilesTask
);
