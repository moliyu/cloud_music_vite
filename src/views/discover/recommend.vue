<template>发现</template>

<script setup lang="ts">
import { recommendApi } from "@/api/recommend";
const getRecommend = async() => {
  const res = await recommendApi({ limit: 20 })
  console.log('%c 🥓 res: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', res);
}
getRecommend()
</script>