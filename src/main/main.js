import { BrowserWindow } from 'electron'
import registry_win from './unity/config/registry_win.js'
import regedit from './lib/regedit_win.js'
import utils from './lib/utils.js'

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

    regedit.query(key, registry_win.keys.projectKey, (datas) => {
        console.log(datas.length)
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            var projectPath = utils.hexToString(element[2]);
            console.log(projectPath)
        }
    }, (error) => {
        console.log("\n query Reg Error ! : \n", error);
    })

}

export default main;
