import registry_win from '../config/registry_win.js'
import regedit from '../lib/regedit_win.js'
import utils from '../lib/utils.js'
import fs from 'fs'
import path from 'path'

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
function getProjectNames(callback) {
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
            if (fs.existsSync(projectPath)) {
                let projectName = path.basename(projectPath);
                let stat = fs.statSync(projectPath);
                let projectVersion = getProjectVersion(projectPath);
                result.push({
                    proejctName: projectName,
                    projectPath: projectPath,
                    proejctVersion: projectVersion,
                    proejctATime: stat.atime,
                    projectCTime: stat.ctime,
                    projectMTime: stat.mtime,
                });
            }
        }
        callback(result);
    });
}

function project(win) {
    getProjectNames((data, error) => {
        if (error) {
            return;
        }
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            console.log(element)
        }
    })
};

export default project;
