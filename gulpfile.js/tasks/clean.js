var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (cb) {
    del([
        './dist/assets',
        './dist'
    ]);
    //TODO 为什么 cb 放在 del 内部作为回调函数不行, m 版里面可以
    cb();
});

