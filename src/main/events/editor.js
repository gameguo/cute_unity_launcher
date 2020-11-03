import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import path from 'path'
import Store from "electron-store";
var store = new Store();

let windows;
const editor = function (win) {
    windows = win;
}

function isEditorExist(unityPath) {
    var unityExePath = path.join(unityPath, 'Unity.exe');
    var isExist = fs.existsSync(unityExePath)
    return isExist;
}
function getEditorData(selectPath) {
    if (isEditorExist(selectPath)) {
        return getData(selectPath);
    }
    let editorPath = path.join(selectPath, 'Editor');
    if (isEditorExist(editorPath)) {
        return getData(editorPath);
    }
    editorPath = path.join(selectPath, 'Unity', 'Editor');
    if (isEditorExist(editorPath)) {
        return getData(editorPath);
    }
}

function getData(editorPath) {
    return {
        path: editorPath,
        version: '',
    }
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
    var data = store.get('editorDatas')
    if (!data) data = [];
    for (let index = data.length - 1; index >= 0; index--) {
        const element = data[index];
        if (element.path) {
            if (!isEditorExist(element.path)) {
                data.splice(index, 1);
            }
        }
    }
    store.set('editorDatas', data);
    event.reply('updateEditors-reply', data);
})

export default editor;
