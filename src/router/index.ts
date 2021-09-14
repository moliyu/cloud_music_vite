import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'
import discover from './modules/discover'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/discover',
  },
  discover
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router