import { RouteRecordRaw } from "vue-router";
import Layout from '@/components/Layout.vue'

export default {
  path: '/detail',
  component: Layout,
  children: [
    {
      path: 'songList/:id',
      component: () => import('@/views/detail/songList.vue')
    }
  ]
} as RouteRecordRaw