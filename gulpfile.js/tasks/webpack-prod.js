var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConf = require('../config/webpack.conf')('production');

gulp.task('webpack:prod',function(callback){
    webpack(webpackConf, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    })
});