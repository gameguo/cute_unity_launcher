import Vue from 'vue'

let windows;

const project = {}

window.ipcRenderer.on('getProjects-reply', (event, arg) => {
    if (arg.error) {
        console.log('getProjects : error ----', arg.erro)
    } else {
        window.projects = arg.data;
        if (project.projectDataChange.length > 0) {
            for (let index = 0; index < project.projectDataChange.length; index++) {
                const callback = project.projectDataChange[index];
                if (callback) callback();
            }
        }
        console.log(window.projects)
    }
})

window.ipcRenderer.on('updateProjects-reply', (event, arg) => {
    requestProject(); // 更新项目
})

function requestProject() {
    window.ipcRenderer.send('getProjects-message')
}

function requestStartProject(projectData) {
    window.ipcRenderer.send('startProject-message', projectData)
    // console.log("requestStartProject:" + projectData.projectName +
    //     " unityVersion : " + projectData.projectVersion +
    //     " projectPath : " + projectData.projectPath);
}

project.requestProject = requestProject;
project.projectDataChange = []

project.requestStartProject = requestStartProject;

requestProject();

Vue.prototype.project = project;
export default project;
