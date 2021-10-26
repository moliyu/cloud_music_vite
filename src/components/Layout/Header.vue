<template>
  <div class="flex h-50px bg-gray-light w-full items-center pr-30px">
    <div
      v-for="(item, i) in navList"
      :key="i"
      class="ml-30px cursor-pointer hover:text-primary hover:font-bold text-sm"
      :class="active(item) ? 'text-primary font-bold' : 'text-gray-text'"
      @click="go(item.path)"
    >{{ item.meta?.title }}</div>
    <div class="flex-auto"></div>
    <a-input class="search" placeholder="搜索">
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { SearchOutlined } from '@ant-design/icons-vue'
const route = useRoute()
const router = useRouter()
const navList = ref<RouteRecordRaw[]>([])
const parentPath = ref('')
const join = (parent: string, path: string) => {
  return `${parent}${path ? '/' : ''}${path}`
}
const go = (path: string) => {
  router.push(join(parentPath.value, path))
}
const active = (item: RouteRecordRaw) => {
  return join(parentPath.value, item.path) === route.path
}
watchEffect(() => {
  router.options.routes.forEach(item => {
    if (route.path.includes(item.path)) {
      navList.value = item.children ?? []
      parentPath.value = item.path
    }
  })
})
</script>

<style scoped>
.search {
  @apply rounded-full w-150px;
}
</style>