const utils = {};


utils.strToHex = function (str) {
    if (str == '')
        return '';
    let hex = [];
    hex.push('0x');
    for (var i = 0; i < str.length; i++) {
        hex.push((str.charCodeAt(i)).toString(16));
    }
    return hex.join('');
}

utils.hexToString = function (str) {
    if (str.length % 2 != 0) {
        console.log('转换失败：必须为偶数');
        return '';
    }
    str = str.substr(0, str.length - 2);  //去除末尾的00 结束符
    let strs = [];
    for (var i = 0; i < str.length; i = i + 2) {
        let a = parseInt(str.substr(i, 2), 16);
        strs.push(String.fromCharCode(a));
    }
    var result = strs.join('');
    return result;
}

module.exports = utils;
