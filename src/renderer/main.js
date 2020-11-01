import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './element/element'
import './common/utils.js'
import './events/project.js'
import './events/platform.js'
import './events/context_menu.js'
import './events/common_event.js'

const isDevelopment = process.env.NODE_ENV !== 'production'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = isDevelopment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
