var url = require('url');
var proxy = require('proxy-middleware');
var path = require('path');
var config = require('./');

//测试环境
var proxyOptions = url.parse('http://one.test.dmall.com');
proxyOptions.route = '/stores/show';

module.exports = {
    server: {
        baseDir: config.publicDirectory,
        middleware: [proxy(proxyOptions)]
    },
    files: ['dist/**/*.html']
}
