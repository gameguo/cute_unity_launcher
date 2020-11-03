import Vue from 'vue'
import store from '../store/index';

const editor = {}

function requestUninstallEditor(path) {
    window.ipcRenderer.send('uninstallEditor-message', path)
}

function requestImportEditor(path) {
    window.ipcRenderer.send('importEditor-message', path)
}

function updateEditorData(data) {
    store.state.editors = data;
    console.log(data)
}

function requestUpdateEditorData() {
    window.ipcRenderer.send('updateEditor-message')
}

window.ipcRenderer.on('updateEditors-reply', (event, arg) => {
    updateEditorData(arg);
})

editor.requestUninstallEditor = requestUninstallEditor;
editor.requestImportEditor = requestImportEditor;
editor.requestUpdateEditorData = requestUpdateEditorData;

requestUpdateEditorData();

Vue.prototype.editor = editor;
export default editor;
