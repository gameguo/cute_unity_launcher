import Vue from 'vue'

const common_event = {}

function openDevTools() {
    window.ipcRenderer.send('openDevTools-message')
}

let selectFolderEvent;
function selectFolder(defaultPath, callback) {
    selectFolderEvent = callback;
    window.ipcRenderer.send('selectFolder-message', defaultPath)
}
function selectFolderCallback(path) {
    if (selectFolderEvent) {
        if (path) {
            selectFolderEvent(path);
        }
        selectFolderEvent = undefined;
    }
}
window.ipcRenderer.on('selectFolder-reply', (event, arg) => {
    selectFolderCallback(arg);
})

common_event.openDevTools = openDevTools;
common_event.selectFolder = selectFolder;

Vue.prototype.common_event = common_event;
export default common_event;