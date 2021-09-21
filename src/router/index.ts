import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'
import Error from '@/components/Error.vue'
import discover from './modules/discover'
import detail from './modules/detail'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/discover',
  },
  discover,
  detail,
  {
    path: '/:pathMatch(.*)',
    component: Layout,
    children: [
      { path: '', component: Error }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router