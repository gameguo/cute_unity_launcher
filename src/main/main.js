import { BrowserWindow } from 'electron'
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

export default main;
