/**
 * requires
 */
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    neat = require('node-neat').includePaths;

/**
 * paths
 */
var srcJs = 'public/javascripts/**/*.js',
    srcPug = 'views/**/*.pug',
    srcSass = 'build/sass/**/*.sass',
    destJs = 'public/javascripts/',
    destCss = 'public/stylesheets/';

/**
 * js task
 */
gulp.task('js', function () {
    return gulp.src(srcJs)
        .pipe(livereload());
});

/**
 * pug task
 */
gulp.task('pug', function () {
    return gulp.src(srcPug)
        .pipe(livereload());
});

/**
 * sass task
 */
gulp.task('sass', function () {
    return gulp.src(srcSass)
        .pipe(sass({
            includePaths: ['sass'].concat(neat),
            outputStyle: 'compressed',
            sourceComments: 'map'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest(destCss))
        .pipe(livereload());
});

/**
 * watch task
 */
gulp.task('watch', function () {
    livereload.listen();

    // watch files
    gulp.watch(srcJs, ['js']);
    gulp.watch(srcSass, ['sass']);
    gulp.watch(srcPug, ['pug']);
});

/**
 * main task
 */
gulp.task('default', ['pug', 'js', 'sass', 'watch']);