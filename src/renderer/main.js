import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './element/element'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = isDevelopment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.ipcRenderer.on('console.log', (event, arg) => {
  console.log(arg)
})

window.ipcRenderer.on('platform', (event, arg) => {
  let platform = arg;
  if (platform == "darwin") {
    // console.log("这是mac系统");
  }
  if (platform == "win32") {
    // console.log("这是windows系统");
  }
  if (platform == "linux") {
    // console.log("这是linux系统");
  }
})
