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

function getProjectData(projectPath, projectKey) {
    let projectName = path.basename(projectPath);
    let stat = fs.statSync(projectPath);
    let projectVersion = getProjectVersion(projectPath);
    return {
        projectName: projectName,
        projectPath: projectPath,
        projectVersion: projectVersion,
        projectATime: stat.atime,
        projectCTime: stat.ctime,
        projectMTime: stat.mtime,
        projectKey: projectKey,
    };
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
                result.push(getProjectData(projectPath, element[0]));
            }
        }
        result.sort(function (a, b) {
            return b.projectMTime < a.projectMTime ? -1 : 1
        })
        callback(result);
    });
}

function getProjectsAutoReply(event) {
    getProjects((data, error) => {
        event.reply('getProjects-reply', { data: data, error: error }); // 回复异步消息
    })
}

function getUnityExePath(version) {
    return '';
    //return 'E:\\DevelopmentSoft\\Unitys\\2017.4.40f1\\Editor\\Unity.exe';
}

function openProjectAuto(projectData) {
    let unityPath = getUnityExePath(projectData.projectVersion);
    if (!unityPath) {
        dialog.showMessageBox(windows, {
            title: "提示",
            message: "未找到" + projectData.projectVersion + "版本的Unity安装路径",
            buttons: ["确定", "使用其他版本编辑器打开"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })
        return false;
    }
    return openProject(projectData, unityPath);
}

function openProject(projectData, editorPath) {
    let unityPath = editorPath;
    var assetsPath = path.join(projectData.projectPath, 'Assets');
    if (!fs.existsSync(assetsPath)) {
        dialog.showMessageBox(windows, {
            title: "提示",
            message: "项目文件不存在",
            buttons: ["确定"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })

        return false;
    }
    var lockFile = path.join(projectData.projectPath, "Temp", "UnityLockfile");
    if (fs.existsSync(lockFile)) {
        dialog.showMessageBox(windows, {
            title: "提示",
            message: "项目" + projectData.projectName + "已打开",
            buttons: ["确定"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })
        return false;
    }
    let cwd = '-projectPath "' + projectData.projectPath + '"';
    process_utils.runProcess(unityPath, cwd, function (error) {
        if (error) {
            console.log(error);
        }
    });
    windows.hide();
    return true;
}

function deleteProject(projectData) {
    let projectKey = projectData.projectKey;
    if (!projectData.projectKey) {
        dialog.showMessageBox(windows, {
            title: "提示",
            message: "删除失败 : 无效的key",
            buttons: ["确定"],
            noLink: true,
            type: "info",
            cancelId: 0,
        })
        return;
    }

    let key = registry_win.keys.hkcu + '\\' + registry_win.keys.prefs5x;
    regedit.delete(key, projectKey, (data, error) => {
        if (error) {
            dialog.showMessageBox(windows, {
                title: "提示",
                message: "删除失败 : " + error,
                buttons: ["确定"],
                noLink: true,
                type: "info",
                cancelId: 0,
            })
        } else {
            getProjectsAutoReply(event);
        }
    })
}

ipcMain.on('getProjects-message', (event, arg) => {
    getProjectsAutoReply(event);
    // event.returnValue = 'pong' // 回复同步消息
})

ipcMain.on('startProject-message', (event, arg) => {
    let projectData = arg;
    if (!openProjectAuto(projectData)) {
        getProjectsAutoReply(event);
    }
})

ipcMain.on('importProject-message', (event, arg) => {
    dialog.showOpenDialog(windows, {
        properties: ["openFile", "openDirectory"],
        title: "选择项目",
        buttonLabel: "选择项目",
    }).then((data) => {
        if (data.canceled == true) {
            return;
        }
        if (data.filePaths.length > 0) {
            var selectpPath = data.filePaths[0];
            var assetsPath = path.join(selectpPath, 'Assets');
            if (!fs.existsSync(assetsPath)) {
                dialog.showMessageBox(windows, {
                    title: "提示",
                    message: "无效的项目路径 : " + selectpPath,
                    buttons: ["确定"],
                    noLink: true,
                    type: "info",
                    cancelId: 0,
                })
                return;
            }
            var projectData = getProjectData(selectpPath, null);
            openProjectAuto(projectData);
        }
    });
})

ipcMain.on('deleteProject-message', (event, arg) => {
    dialog.showMessageBox(windows, {
        type: "warning",
        title: "是否移除",
        message: "确定将此项目从列表中移除？此项目将仍然保留在硬盘中. ",
        buttons: ["ok", "cancel"],
    }).then((data) => {
        if (data.response == 0) {
            let projectData = arg;
            deleteProject(projectData);
        }
    });
})

export default project;
