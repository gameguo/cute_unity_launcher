import { BrowserWindow } from 'electron'

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

    windows.webContents.send('platform', process.platform)
}

export default main;
