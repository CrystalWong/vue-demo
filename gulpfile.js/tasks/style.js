var browserSync = require('browser-sync');
var gulp = require('gulp');
var changed     = require('gulp-changed');
var bowerFiles = require('main-bower-files');
var config = require('../config/style')

gulp.task('style', function() {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});
