var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConf = require('../config/webpack.conf')('development');
var path = require('path');
var browserSync  = require('browser-sync');
var logger       = require('../lib/compileLogger');

gulp.task('webpack:dev',function(callback){
    var built = false;

    webpack(webpackConf).watch(200, function(err, stats) {
        logger(err, stats);
        browserSync.reload();
        // On the initial compile, let gulp know the task is done
        if(!built) { built = true; callback() }
    })
});