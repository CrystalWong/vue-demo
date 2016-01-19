var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development',function(cb){
   gulpSequence('clean',['pre_build'],'bower','vendor',['fonts','images','style'],['less','webpack:dev','html'],['watch','browserSync'],cb);
});
