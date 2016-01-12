/**
 * Created by zongkelong on 16/1/11.
 */
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var less         = require('gulp-less');
var config       = require('../config/less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] })

gulp.task('less', function () {
    return gulp.src(config.src)
        // .pipe(sourcemaps.init())
        .pipe(less(config.settings))
        //.on('error', handleErrors)
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
})
