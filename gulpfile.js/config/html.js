var path = require('path');

module.exports = {
    watch: path.resolve(__dirname,'../../src/views/**/*.html'),
    src:  path.resolve(__dirname,'../../src/views/**/*.html'),
    dest: path.resolve(__dirname,'../../dist')
};
