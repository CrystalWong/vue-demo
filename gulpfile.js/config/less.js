var config = require('./')
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] })

module.exports = {
    src: config.sourceAssets + "/stylesheets/**/*.less",
    dest: config.publicAssets + '/stylesheets',
    settings: {
        plugins: [autoprefix]
    }
}
