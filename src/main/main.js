import { BrowserWindow } from 'electron'
import registry_win from './unity/config/registry_win.js'
import regedit from './lib/regedit_win.js'

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

    let key = registry_win.keys.hkcu + '\\' + registry_win.keys.prefs5x;

    regedit.query(key, registry_win.keys.projectKey, (data) => {
        console.log(data);
    }, (error) => {
        console.log("\n query Reg Error ! : \n", error);
    })

}

export default main;
