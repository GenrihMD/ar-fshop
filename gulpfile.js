var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    stylus        = require('gulp-stylus'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require("gulp-notify");



gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
    })
});



gulp.task('styles', function() {
    gulp.src('app/stylus/main.styl')
        .pipe(stylus({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .pipe(concat('common.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
    gulp.src('app/libs/css/**/*.css')
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('app/css'))
});



gulp.task('js', function() {
    return gulp.src([
        'app/libs/js/*.js',
        'app/js/common.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
    gulp.watch('app/stylus/**/*.styl', ['styles']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/**/*.html', browserSync.reload)
});



gulp.task('default', ['watch']);