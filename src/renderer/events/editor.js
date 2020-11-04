import Vue from 'vue'
import store from '../store/index';

const editor = {}

function requestUninstallEditor(data) {
    window.ipcRenderer.send('uninstallEditor-message', data)
}

function requestImportEditor(path) {
    window.ipcRenderer.send('importEditor-message', path)
}

function requestUpdateEditorData() {
    window.ipcRenderer.send('updateEditor-message')
}

function requestRemoveListEditor(data) {
    window.ipcRenderer.send('removeListEditor-message', data);
}

window.ipcRenderer.on('updateEditors-reply', (event, arg) => {
    let data = arg;
    store.state.editors = data;
    console.log(data)
})

editor.requestUninstallEditor = requestUninstallEditor;
editor.requestImportEditor = requestImportEditor;
editor.requestUpdateEditorData = requestUpdateEditorData;
editor.requestRemoveListEditor = requestRemoveListEditor;

requestUpdateEditorData();

Vue.prototype.editor = editor;
export default editor;
