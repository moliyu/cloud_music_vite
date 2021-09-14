<template>
  <div class="w-200px h-sideBar bg-sideBar">
    <div class="h-50px flex items-center">
      <div class="flex-auto"></div>
      <LeftOutlined class="p-10px hover:bg-gray hover:text-primary cursor-pointer rounded-full" @click="go(-1)" />
      <RightOutlined class="p-10px ml-5px mr-10px hover:bg-gray hover:text-primary cursor-pointer rounded-full" @click="go(1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const go = (val: number) => {
  return router.go(val)
}
</script>

<style lang>

</style>