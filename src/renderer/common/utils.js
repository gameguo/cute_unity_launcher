import Vue from 'vue'

const utils = {}

utils.getDateStr = function (date) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var time1 = new Date().getTime();//当前的时间戳
    var time2;
    if (typeof (date) == 'string') {
        time2 = new Date(date).getTime();
    } else {
        time2 = date.getTime();
    }
    var time = time1 - time2;
    var result = null;
    if (time < 0) {
        result = "刚刚"
    } else if (time / month >= 1) {
        result = parseInt(time / month) + "个月前";
    } else if (time / day >= 1) {
        result = parseInt(time / day) + "天前";
    } else if (time / hour >= 1) {
        result = parseInt(time / hour) + "小时前";
    } else if (time / minute >= 1) {
        result = parseInt(time / minute) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}

Vue.prototype.utils = utils

export default utils;
