import Vue from 'vue'
import VueRouter from 'vue-router'
import project from "@/renderer/views/project.vue"
import editor from "@/renderer/views/editor.vue"
import setting from "@/renderer/views/setting.vue"
import create_project from "@/renderer/views/create_project.vue"
import download_editor from "@/renderer/views/download_editor.vue"

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
  {
    path: "/create_project",
    name: "create_project",
    component: create_project,
  },
  {
    path: "/download_editor",
    name: "download_editor",
    component: download_editor,
  }
]

const router = new VueRouter({
  routes
})

export default router
