var url = require('url');
//var proxy = require('proxy-middleware');
var path = require('path');
var config = require('./');

//测试环境
//var proxyOptions = url.parse('http://testappapi.dmall.com/app');
//proxyOptions.route = '/app';

module.exports = {
    server: {
        baseDir: config.publicDirectory//,
        //middleware: [proxy(proxyOptions)]
    },
    files: ['dist/**/*.html']
}
