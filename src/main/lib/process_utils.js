var cp = require('child_process');

const process_utils = {};

process_utils.runProcess = function (path, arg, callback) {
    path += " " + arg;
    console.log(path);
    cp.exec(path, function (error, stdout, stderr) {
        if (callback) callback(error);
    });
}

module.exports = process_utils;