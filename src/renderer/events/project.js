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

function requestProject() {
    window.ipcRenderer.send('getProjects-message')
}

project.requestProject = requestProject;
project.projectDataChange = []

requestProject();

Vue.prototype.project = project;
export default project;
