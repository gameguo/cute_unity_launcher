import Vue from 'vue'

const editor = {}

function requestUninstallEditor(path) {
    window.ipcRenderer.send('uninstallEditor-message', path)
}

function requestImportEditor(path) {
    window.ipcRenderer.send('importEditor-message', path)
}

editor.requestUninstallEditor = requestUninstallEditor;
editor.requestImportEditor = requestImportEditor;

Vue.prototype.editor = editor;
export default editor;
