var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConf = require('../config/webpack.conf')('development');
var path = require('path');

gulp.task('webpack:dev',function(callback){
    webpack(webpackConf, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    })
});