var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development',function(cb){
   gulpSequence('clean','bower','vendor',['fonts','images'],['less','webpack:dev','html'],['watch','browserSync'],cb);
});