const utils = {};


utils.strToHexCharCode = function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += "," + str.charCodeAt(i).toString(16);
    }
    return val;
}

utils.hexToString = function (str) {
    var val = "";
    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
        val += arr[i].fromCharCode(i);
    }
    return val;
}

module.exports = utils;
