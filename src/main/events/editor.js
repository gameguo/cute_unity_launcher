import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
import process_utils from '../lib/process_utils.js'
import vi from 'win-version-info'
import Store from "electron-store";
var store = new Store();

let windows;
const editor = function (win) {
    windows = win;
}

function getEditorVersion(unityExePath) {
    var info = vi(unityExePath);
    if (info) {
        var unityVersion = info['Unity Version'];
        if (unityVersion) {
            return unityVersion;
        } else {
            let version = info.FileDescription;
            if (version) {
                let datas = version.trim().split(' ');
                if (datas.length > 1) {
                    return datas[1];
                }
            }
        }
    }
}
function getEditorData(selectPath) {
    let unityExePath = path.join(selectPath, 'Unity.exe');
    let uninstallPath = path.join(selectPath, 'Uninstall.exe');
    if (fs.existsSync(unityExePath)) {
        if (fs.existsSync(uninstallPath)) {
            var version = getEditorVersion(uninstallPath);
            if (version) {
                return getData(selectPath, version);
            }
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
            let dirName = path.dirname(element.path);
            var outData = getEditorData(dirName);
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
    var data = arg;
    if (!data) return;
    dialog.showMessageBox(windows, {
        type: "warning",
        title: "提示",
        message: "确定要卸载Unity " + data.version + "吗？",
        buttons: ["确定", "取消"],
        noLink: true,
    }).then((outData) => {
        if (outData.response == 0) {
            if (data.path) {
                let dirName = path.dirname(data.path);
                let uninstall = path.join(dirName, 'Uninstall.exe');
                if (fs.existsSync(uninstall)) {
                    process_utils.runProcess(uninstall);
                }
            }
        }
    });
})

ipcMain.on('removeListEditor-message', (event, arg) => {
    var editorData = arg;
    if (!editorData) return;
    dialog.showMessageBox(windows, {
        type: "warning",
        title: "提示",
        message: "确定要移除Unity " + editorData.version + "吗？该版本Unity仍然会保留在计算机内",
        buttons: ["确定", "取消"],
        noLink: true,
    }).then((outData) => {
        if (outData.response == 0) {
            var data = store.get('editorDatas')
            if (!data) data = [];
            for (let index = data.length - 1; index >= 0; index--) {
                const element = data[index];
                if (element.path && element.path == editorData.path) {
                    data.splice(index, 1);
                    store.set('editorDatas', data);
                    event.reply('updateEditors-reply', data);
                    break;
                }
            }
        }
    });
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
        else {
            dialog.showMessageBox(windows, {
                type: 'warning',
                title: '提示',
                message: 'Unity' + editorData.version + '已存在',
                buttons: ['确定'],
                noLink: true,
            });
        }
        store.set('editorDatas', data);
        event.reply('updateEditors-reply', data);
    } else {
        dialog.showMessageBox(windows, {
            type: 'warning',
            title: '提示',
            message: '未检测到Unity.exe或Uninstall.exe, 请检查路径',
            buttons: ['确定'],
            noLink: true,
        });
    }
})

ipcMain.on('updateEditor-message', (event, arg) => {
    updateAndCheckEditor(event);
})

export default editor;
