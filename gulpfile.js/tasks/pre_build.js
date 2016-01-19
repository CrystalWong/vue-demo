var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var babel = require("babel-core");

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'test' }
};
var options = minimist(process.argv.slice(2), knownOptions);
var config_ini = require('../../src/assets/javascripts/config/config.ini.js');
var config = require('../../src/assets/javascripts/config/config.js');
var configFile = 'src/assets/javascripts/config/config.js';

var outputStr = '';

gulp.task('pre_build', function() {

  function Obj2String(obj) {
    var o = obj || {};
    var objStr = '';

    for(var n in o) {
      if(o.hasOwnProperty(n)) {
        if(objStr.length>0){
          objStr = objStr + ",\r\n  " + n + ': ' + "'"+o[n].toString()+"'";
        }else{
          objStr = objStr  + n + ': ' + "'"+o[n].toString()+"'";
        }

      };
    }
    return objStr;
  }

  var env = options.env || 'test';
  redirectServer = config_ini[env];
  outputStr = 'var redirectServer = {' + "\r\n" + '  ' + Obj2String(redirectServer) + "\r\n" + '}'+ "\r\n" + 'module.exports = redirectServer' + "\r\n";
  fs.writeFile(configFile, outputStr, function(err) {
    if(err) console.log(err);
  });
  return;
});
