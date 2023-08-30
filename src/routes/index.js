import { createRouter, createWebHistory } from "vue-router"

//路由对象数组
const routes = [
  {
    path: "/",
    name: "MainView",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/DataDisplay",
    name: "DataDisplay",
    component: () => import("../views/DataDisplay.vue"),
  },
]
//创建一个路由器对象，并配置了路由的历史记录和路由配置
const router = createRouter({
  history: createWebHistory(),
  routes,
})
//将路由器添加到应用程序中，并等待路由器准备就绪
export const setupRouter = async (app) => {
  app.use(router)
  await router.isReady()
}

export default routes
