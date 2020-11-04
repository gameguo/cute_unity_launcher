import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
// import process_utils from '../lib/process_utils.js'
// import vi from 'win-version-info'
import Store from "electron-store";
var store = new Store();

let windows;
const editor = function (win) {
    windows = win;
}

function getEditorVersion(unityExePath) {

    // var info = vi(unityExePath);
    // console.log(info);
    // unityExePath = unityExePath.replace(/\\/g, "\\\\");
    // let runPath = "wmic datafile where name=\"" + unityExePath + "\"";
    // process_utils.runProcess(runPath, 'get version', function (error, stdout, stderror) {
    //     if (error) {
    //         callback();
    //         console.log('error : ' + error);
    //     } else if (stderror) {
    //         callback();
    //         console.log('stderror : ' + stderror);
    //     } else {
    //         if (stdout) {
    //             var lines = stdout.split('\n');
    //             if (lines) {
    //                 if (lines.length > 1) {
    //                     var version = lines[1];
    //                     console.log(version);
    //                 }
    //             }
    //         }

    //         callback();
    //     }
    // });
}
function getEditorData(selectPath) {
    let unityPath = path.join(selectPath, 'Unity.exe');
    let editorPath = path.join(selectPath, 'Editor', 'Unity.exe');
    let usePath;
    if (fs.existsSync(unityPath)) usePath = unityPath;
    else if (fs.existsSync(editorPath)) usePath = editorPath;
    if (usePath) {
        var data = getEditorVersion(editorPath);
        if (!data) {
            return;
        } else {
            let version = data;
            return getData(editorPath, version);
        }
    }
}

function getData(editorPath, version) {
    return {
        path: path.join(editorPath, 'Unity.exe'),
        version: version,
    }
}

function updateAndCheckEditor(event) {
    var data = store.get('editorDatas')
    if (!data) data = [];
    for (let index = data.length - 1; index >= 0; index--) {
        const element = data[index];
        if (element.path) {
            var outData = getEditorData(element.path);
            if (outData) { // 此编辑器存在 检查版本是否改变
                if (outData.version != element.version) {
                    element.version = version;
                    data[index] = outData;
                }
            } else { // 此编辑器不存在
                data.splice(index, 1);
            }
        }
    }
    store.set('editorDatas', data);
    event.reply('updateEditors-reply', data);
}

ipcMain.on('uninstallEditor-message', (event, arg) => {
    var path = arg;
    console.log("TODO Uninstall :" + path);
})

ipcMain.on('importEditor-message', (event, arg) => {
    var path = arg;
    var editorData = getEditorData(path);
    if (editorData) {
        var data = store.get('editorDatas')
        if (!data) data = [];
        var isPush = true;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (element.path && element.path == editorData.path) {
                data[index] = editorData;
                isPush = false;
                break;
            }
        }
        if (isPush) data.push(editorData);
        store.set('editorDatas', data);
        event.reply('updateEditors-reply', data);
    } else {
        dialog.showMessageBox(windows, {
            type: 'warning',
            title: '提示',
            message: '未检测到Unity.exe, 请检查路径',
            buttons: ['确定'],
            noLink: true,
        });
    }
})

ipcMain.on('updateEditor-message', (event, arg) => {
    updateAndCheckEditor(event);
})

export default editor;
