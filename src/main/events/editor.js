import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import path from 'path'

let windows;
const editor = function (win) {
    windows = win;
}

ipcMain.on('uninstallEditor-message', (event, arg) => {
    var path = arg;
    console.log("TODO Uninstall :" + path);
})

ipcMain.on('importEditor-message', (event, arg) => {
    var path = arg;
    console.log("TODO Import Editor :" + path);
})

export default editor;
