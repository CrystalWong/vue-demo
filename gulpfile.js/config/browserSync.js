var url = require('url');
var proxy = require('proxy-middleware');
var path = require('path');
var config = require('./');

//测试环境
var proxyOptions = url.parse('http://one.test.dmall.com');
proxyOptions.route = '/stores/show';

var proxyOptions2 = url.parse('http://testappapi1.dmall.com/app');
proxyOptions2.route = '/dmall';

var proxyOptions3 = url.parse('http://appapi.dmall.com');
proxyOptions3.route = '/jsonP';

module.exports = {
    server: {
        baseDir: config.publicDirectory,
        middleware: [proxy(proxyOptions), proxy(proxyOptions2), proxy(proxyOptions3)]
    },
    files: ['dist/**/*.html']
}
