var cp = require('child_process');
var iconv = require('iconv-lite');

const process_utils = {};
var encoding = 'cp936';
var binaryEncoding = 'binary';

process_utils.runProcess = function (path, arg, callback) {
    path += " " + arg;
    console.log(path);
    cp.exec(path, { encoding: binaryEncoding }, function (error, stdout, stderr) {
        if (stdout) stdout = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding)
        if (stderr) stderr = iconv.decode(Buffer.from(stderr, binaryEncoding), encoding)
        if (callback) callback(error, stdout, stderr);
    });
}

module.exports = process_utils;