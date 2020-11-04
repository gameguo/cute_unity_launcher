import Vue from 'vue'
import store from '../store/index';

const project = {}

window.ipcRenderer.on('getProjects-reply', (event, arg) => {
    if (arg.error) {
        console.log('getProjects : error ----', arg.erro)
    } else {
        store.state.projects = arg.data;
        console.log(store.state.projects)
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

function requestCreateProject(projectData) {
    window.ipcRenderer.send('createProject-message', projectData)
}

function requestSelectVersionOpenProject(projectData) {
    window.ipcRenderer.send('selectEditorOpenProject-message', projectData);
}

project.requestProject = requestProject;

project.requestStartProject = requestStartProject;
project.requestImportProject = requestImportProject;
project.requestDeleteProject = requestDeleteProject;
project.requestCreateProject = requestCreateProject;
project.requestSelectVersionOpenProject = requestSelectVersionOpenProject;

requestProject();

Vue.prototype.project = project;
export default project;
