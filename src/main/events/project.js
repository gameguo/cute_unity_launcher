import { ipcMain, dialog } from 'electron'
import registry_win from '../config/registry_win.js'
import regedit from '../lib/regedit_win.js'
import utils from '../lib/utils.js'
import process_utils from '../lib/process_utils.js'
import fs from 'fs'
import path from 'path'

let windows;
const project = function (win) {
    windows = win;
}

function getProjectVersion(projectPath) {
    let projectVersion = '';
    let projectVersionPath = path.join(projectPath, 'ProjectSettings/ProjectVersion.txt');
    if (fs.existsSync(projectVersionPath)) {
        const versionData = fs.readFileSync(projectVersionPath, 'utf-8');
        let versionLines = versionData.split('\n');
        if (versionLines && versionLines.length > 0) {
            let versionLine = versionLines[0].split(':');
            if (versionLine && versionLine.length > 1) {
                projectVersion = versionLine[1].trim();
            }
        }
    }
    return projectVersion;
}

/**
 * @param {function} callback callback
 */
function getProjects(callback) {
    let key = registry_win.keys.hkcu + '\\' + registry_win.keys.prefs5x;
    regedit.query(key, registry_win.keys.projectKey, (datas, error) => {
        if (error) {
            console.log("\n query Reg Error ! : \n", error);
            callback(null, error);
            return;
        }
        var result = [];
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            var projectPath = "";
            if (element[1] == registry_win.keys.projectKeyType_BINARY) {
                projectPath = utils.hexToString(element[2]);
            } else {
                projectPath = element[2];
            }
            if (process.platform == "win32") {
                projectPath = projectPath.replace(/\\|\//g, "\\");
            }
            if (fs.existsSync(projectPath)) {
                let projectName = path.basename(projectPath);
                let stat = fs.statSync(projectPath);
                let projectVersion = getProjectVersion(projectPath);
                result.push({
                    projectName: projectName,
                    projectPath: projectPath,
                    projectVersion: projectVersion,
                    projectATime: stat.atime,
                    projectCTime: stat.ctime,
                    projectMTime: stat.mtime,
                });
            }
        }
        result.sort(function (a, b) {
            return b.projectMTime < a.projectMTime ? -1 : 1
        })
        callback(result);
    });
}

function getUnityExePath(version) {
    //return '';
    return 'E:\\DevelopmentSoft\\Unitys\\2017.4.40f1\\Editor\\Unity.exe';
}

ipcMain.on('getProjects-message', (event, arg) => {
    getProjects((data, error) => {
        event.reply('getProjects-reply', { data: data, error: error }); // 回复异步消息
    })
    // event.returnValue = 'pong' // 回复同步消息
})

ipcMain.on('startProject-message', (event, arg) => {
    let projectData = arg;
    let unityPath = getUnityExePath(projectData.projectVersion);
    if (!unityPath) {
        dialog.showMessageBox({
            title: "提示",
            message: "未找到" + projectData.projectVersion + "版本的Unity安装路径",
            buttons: ["确定"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })
        return;
    }
    var assetsPath = path.join(projectData.projectPath, 'Assets');
    if (!fs.existsSync(assetsPath)) {
        dialog.showMessageBox({
            title: "提示",
            message: "项目文件不存在",
            buttons: ["确定"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })
        event.reply('updateProjects-reply'); // 回复异步消息
        return;
    }
    var lockFile = path.join(projectData.projectPath, "Temp", "UnityLockfile");
    if (fs.existsSync(lockFile)) {
        dialog.showMessageBox({
            title: "提示",
            message: "项目" + projectData.projectName + "已打开",
            buttons: ["确定"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })
        return;
    }
    let cwd = '-projectPath "' + projectData.projectPath + '"';
    process_utils.runProcess(unityPath, cwd, function (error) {
        if (error) {
            console.log(error);
        }
    });
    windows.hide();
})

export default project;
