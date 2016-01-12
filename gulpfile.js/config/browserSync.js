var url = require('url');
//var proxy = require('proxy-middleware');
var path = require('path');

//测试环境
//var proxyOptions = url.parse('http://testappapi.dmall.com/app');
//proxyOptions.route = '/app';

module.exports = {
    server: {
        baseDir: path.resolve(__dirname,'./dist')//,
        //middleware: [proxy(proxyOptions)]
    },
    files: ['dist/**/*.html']
}
