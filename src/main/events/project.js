import { ipcMain, dialog, BrowserWindow } from 'electron'
import registry_win from '../config/registry_win.js'
import regedit from '../lib/regedit_win.js'
import utils from '../lib/utils.js'
import process_utils from '../lib/process_utils.js'
import fs from 'fs'
import path from 'path'
import Store from "electron-store";
var store = new Store();

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
    var data = store.get('projectsDatas');
    if (data) {
        event.reply('getProjects-reply', { data: data });
    }
    getProjects((data, error) => {
        store.set('projectsDatas', data);
        event.reply('getProjects-reply', { data: data, error: error }); // 回复异步消息
    })
}

function getUnityExePath(version) {
    let editorDatas = store.get('editorDatas');
    if (editorDatas) {
        for (let index = 0; index < editorDatas.length; index++) {
            const element = editorDatas[index];
            if (element.version && element.version == version) {
                return element.path;
            }
        }
    }
}

function selectEditorOpenProject(projectData, event) {
    let editorWindow = new BrowserWindow({
        backgroundColor: "#ffffff",
        width: 400,
        height: 300,
        "center": true,
        "minWidth": 300,//窗口的最小宽度，单位: 像素值,
        "minHeight": 200,//窗口的最小高度，单位: 像素值,
        "title": "选择编辑器版本",
        "parent": windows,
        "modal": true,
    })
    editorWindow.setMenu(null)

}

function openProjectForVersion(projectData, version, event) {
    let unityPath = getUnityExePath(version);
    if (!unityPath) {
        dialog.showMessageBox(windows, {
            title: "提示",
            message: "未找到" + projectData.projectVersion + "版本的Unity安装路径",
            buttons: ["确定", "使用其他版本编辑器打开"],
            noLink: true,
            type: "info",
            cancelId: 0,
        }).then((data) => {
            if (data.response == 1) { // 使用其他版本编辑器打开
                selectEditorOpenProject(projectData, event);
            }
        });
        return;
    }
    if (!openProject(projectData, unityPath)) {
        getProjectsAutoReply(event);
    }
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
    openProjectForVersion(projectData, projectData.projectVersion, event)
})

ipcMain.on('selectEditorOpenProject-message', (event, arg) => {
    let projectData = arg;
    selectEditorOpenProject(projectData, event);
})

ipcMain.on('importProject-message', (event, arg) => {
    dialog.showOpenDialog(windows, {
        properties: ["openDirectory"],
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
            selectEditorOpenProject(projectData, event);
        }
    });
})

ipcMain.on('deleteProject-message', (event, arg) => {
    dialog.showMessageBox(windows, {
        type: "warning",
        title: "是否移除",
        message: "确定将此项目从列表中移除？此项目将仍然保留在硬盘中. ",
        buttons: ["确定", "取消"],
        noLink: true,
    }).then((data) => {
        if (data.response == 0) {
            let projectData = arg;
            deleteProject(projectData);
        }
    });
})

ipcMain.on('createProject-message', (event, arg) => {
    var projectData = arg;
    console.log(
        "TODO create " +
        projectData.projectName +
        " " +
        projectData.projectPath +
        " " +
        projectData.projectVersion +
        " " +
        projectData.template
    );

})

export default project;
