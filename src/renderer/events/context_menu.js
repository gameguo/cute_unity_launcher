import Vue from 'vue'

const context_menu = {}

const Menu = window.remote.Menu;
const MenuItem = window.remote.MenuItem;


var projectMenu = new Menu();

var projectEditorMenu = new Menu();

projectMenu.append(new MenuItem({ label: '打开所在文件夹', click: projectMenu1Click }));
projectMenu.append(new MenuItem({ type: 'submenu', submenu: projectEditorMenu, label: '用其他版本编辑器打开' }));
projectMenu.append(new MenuItem({ type: 'separator' }));
projectMenu.append(new MenuItem({ label: '从列表中移除', click: projectMenu2Click }));

function projectMenu1Click() {
    if (context_menu.projectCallback.callback1) {
        context_menu.projectCallback.callback1();
    }
}
function projectMenu2Click() {
    if (context_menu.projectCallback.callback2) {
        context_menu.projectCallback.callback2();
    }
}

context_menu.openProjectMenu = function (callback1, callback2) {
    context_menu.projectCallback = {}
    context_menu.projectCallback.callback1 = callback1;
    context_menu.projectCallback.callback2 = callback2;
    projectMenu.popup(remote.getCurrentWindow());
}

var editorMenu = new Menu();

editorMenu.append(new MenuItem({ label: '打开所在文件夹', click: editorMenu1Click }));
editorMenu.append(new MenuItem({ label: '从列表中移除', click: editorMenu3Click }));
editorMenu.append(new MenuItem({ label: '卸载', click: editorMenu2Click }));
function editorMenu1Click() {
    if (context_menu.editorCallback.callback1) {
        context_menu.editorCallback.callback1();
    }
}
function editorMenu2Click() {
    if (context_menu.editorCallback.callback2) {
        context_menu.editorCallback.callback2();
    }
}
function editorMenu3Click() {
    if (context_menu.editorCallback.callback3) {
        context_menu.editorCallback.callback3();
    }
}
context_menu.openEditorMenu = function (callback1, callback2, callback3) {
    context_menu.editorCallback = {}
    context_menu.editorCallback.callback1 = callback1;
    context_menu.editorCallback.callback2 = callback2;
    context_menu.editorCallback.callback3 = callback3;
    editorMenu.popup(remote.getCurrentWindow());
}

Vue.prototype.context_menu = context_menu;
export default context_menu;
