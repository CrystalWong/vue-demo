var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (cb) {
    del([
        './dist/assets',
        './dist'
    ]);
    //del 版本变化 cb 不能放在 del 内部来结束 task, 必须单独调用
    cb();
});

