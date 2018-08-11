var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var browserSync = require('browser-sync').create();
var imageMin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify-es').default;

gulp.task('html', function() {
    console.log('html');
});

gulp.task('styles', function() {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });

    watch('./app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/app.js', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('deleteDistFolder', function() {
    return del('./docs');
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    return gulp.src('./app/assets/images/**/*')
        .pipe(imageMin({
            progressive: true,
            interlace: true,
            multipass: true
        }))
        .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('usemin', ['deleteDistFolder', 'styles'], function() {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest('./docs'))
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);

gulp.task('previewDist', function() {
    browserSync.init({
        server: {
            baseDir: 'docs'
        }
    });
});