import { ipcRenderer, remote } from 'electron'
import Store from "electron-store";
window.store = new Store();
window.ipcRenderer = ipcRenderer;
window.remote = remote;
