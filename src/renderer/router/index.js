import Vue from 'vue'
import VueRouter from 'vue-router'
import project from "@/renderer/views/project.vue"
import editor from "@/renderer/views/editor.vue"
import setting from "@/renderer/views/setting.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/project",
  },
  {
    path: "/project",
    name: "project",
    component: project,
  },
  {
    path: "/editor",
    name: "editor",
    component: editor,
  },
  {
    path: "/setting",
    name: "setting",
    component: setting,
  },
]

const router = new VueRouter({
  routes
})

export default router
