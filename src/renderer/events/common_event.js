import Vue from 'vue'

const common_event = {}

function openDevTools() {
    window.ipcRenderer.send('openDevTools-message')
}
common_event.openDevTools = openDevTools;

Vue.prototype.common_event = common_event;
export default common_event;