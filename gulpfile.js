"use strict";

const gulp  = require("gulp");
const gp   = require("gulp-load-plugins")();
const browserSync = require('browser-sync').create();

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
   browserSync.watch('build', browserSync.reload)
});

gulp.task('pug', function(){
    return gulp.src('src/pug/pages/*.pug')
    .pipe(gp.pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('sass', function(){
    return gulp.src('src/static/sass/main.sass')
    .pipe(gp.sourcemaps.init())
    .pipe(gp.sass({}))
    .pipe(gp.autoprefixer({
        browsers: ['last 10 versions']
    }))
    .on("error", gp.notify.onError({
        title: "still"
    }))
    .pipe(gp.csso())
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest('build/static/css/'));
});

gulp.task('watch', function(){
    gulp.watch('src/pug/**/*.pug',gulp.series('pug'));
    gulp.watch('src/static/sass/**/*.sass',gulp.series('sass'));
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass'),
    gulp.parallel('watch', 'server')
));

