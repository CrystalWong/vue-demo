/**
 * Created by zongkelong on 16/1/14.
 */
module.exports = function(milliseconds) {
    if(milliseconds > 999) {
        return (milliseconds / 1000).toFixed(2) + " s"
    } else {
        return milliseconds + ' ms'
    }
}
