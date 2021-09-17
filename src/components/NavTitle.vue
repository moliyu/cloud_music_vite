<template>
  <div class="flex items-center cursor-pointer group">
    <div class="text-black text-lg text-bold mr-10px">{{name}}</div>
    <RightOutlined class="group-hover:text-primary" />
  </div>
</template>

<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue' 
const props = defineProps<{
  name: string
  url?: string
}>()
console.log('%c 🍰 ctx: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', props);
</script>