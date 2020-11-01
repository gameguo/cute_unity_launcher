import { BrowserWindow, ipcMain, dialog } from 'electron'
import project from './events/project.js'

let windows

function rendererlog(log) {
    windows.webContents.send('console.log', log)
}

/**
 * @param {BrowserWindow} win Somebody's name.
 */
function main(win) {
    windows = win;
    console.rendererlog = rendererlog;
    windows.webContents.send('platform', process.platform);
    project(win);
}

ipcMain.on('openDevTools-message', (event, arg) => {
    windows.webContents.toggleDevTools();
})

ipcMain.on('selectFolder-message', (event, arg) => {
    let defaultPath = arg;
    dialog.showOpenDialog(windows, {
        properties: ["openFile", "openDirectory"],
        title: "选择文件夹",
        buttonLabel: "选择文件夹",
        defaultPath: defaultPath,
    }).then((data) => {
        if (data.canceled == true) {
            event.reply('selectFolder-reply', null);
            return;
        }
        if (data.filePaths.length > 0) {
            var selectpPath = data.filePaths[0];
            event.reply('selectFolder-reply', selectpPath);
        }
    });
})

export default main;
