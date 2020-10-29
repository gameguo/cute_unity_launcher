import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './element/element'
import utils from './common/utils.js'
import data_listence from './common/data_listence.js'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = isDevelopment
Vue.prototype.utils = utils
Vue.prototype.data_listence = data_listence

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.ipcRenderer.on('console.log', (event, arg) => {
  console.log(arg)
})

window.ipcRenderer.on('getProjects-reply', (event, arg) => {
  if (arg.error) {
    console.log('getProjects : error ----', arg.erro)
  } else {
    window.projects = arg.data;
    if (data_listence.projectDataChange.length > 0) {
      for (let index = 0; index < data_listence.projectDataChange.length; index++) {
        const callback = data_listence.projectDataChange[index];
        if (callback) callback();
      }
    }
    console.log(window.projects)
  }
})

window.ipcRenderer.send('getProjects-message')

window.ipcRenderer.on('platform', (event, arg) => {
  let platform = arg;
  if (platform == "darwin") {
    console.log("这是mac系统");
  }
  if (platform == "win32") {
    console.log("这是windows系统");
  }
  if (platform == "linux") {
    console.log("这是linux系统");
  }
})
