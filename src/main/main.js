import { BrowserWindow, ipcMain } from 'electron'
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

export default main;
