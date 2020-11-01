import Vue from 'vue'

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
}

function requestImportProject() {
    window.ipcRenderer.send('importProject-message')
}

function requestDeleteProject(projectData) {
    window.ipcRenderer.send('deleteProject-message', projectData)
}

project.requestProject = requestProject;
project.projectDataChange = []

project.requestStartProject = requestStartProject;
project.requestImportProject = requestImportProject;
project.requestDeleteProject = requestDeleteProject;

requestProject();

Vue.prototype.project = project;
export default project;
