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

// window.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
//     context_menu.openProjectMenu(function () {
//         console.log("点击1");
//     }, function () {
//         console.log("点击2");
//     });
// }, false);

Vue.prototype.context_menu = context_menu;
export default context_menu;
