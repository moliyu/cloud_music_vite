import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/App.vue'),
    keepAlive: false,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router