import Vue from 'vue'

const context_menu = {}

const Menu = window.remote.Menu;
const MenuItem = window.remote.MenuItem;

var projectMenu = new Menu();
//添加菜单功能
projectMenu.append(new MenuItem({ label: 'MenuItem1', click: projectMenu1Click }));
//添加菜单分割线
projectMenu.append(new MenuItem({ type: 'separator' }));
//添加菜单功能
projectMenu.append(new MenuItem({ label: 'MenuItem2', click: projectMenu2Click }));

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
