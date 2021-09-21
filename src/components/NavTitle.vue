<template>
  <div class="flex items-center cursor-pointer group">
    <div class="text-black text-lg text-bold mr-10px">{{name}}</div>
    <RightOutlined class="group-hover:text-primary" />
  </div>
</template>

<script setup lang="ts">
import { RightOutlined } from '@ant-design/icons-vue' 
defineProps<{
  name: string
  url?: string
}>()
</script>