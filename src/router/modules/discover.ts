import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/Layout.vue'

export default {
  path: '/discover',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/discover/recommend.vue'),
      meta: { title: '个性推荐' }
    },
    {
      path: 'song',
      component: () => import('@/views/discover/song.vue'),
      meta: { title: '专辑' }
    },
    {
      path: 'host',
      component: () => import('@/views/discover/host.vue'),
      meta: { title: '主播电台' }
    },
    {
      path: 'rank',
      component: () => import('@/views/discover/rank.vue'),
      meta: { title: '排行榜' }
    },
    {
      path: 'singer',
      component: () => import('@/views/discover/singer.vue'),
      meta: { title: '歌手' }
    },
    {
      path: 'newest',
      component: () => import('@/views/discover/newest.vue'),
      meta: { title: '最新音乐' }
    }
  ]
} as RouteRecordRaw
