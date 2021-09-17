<template>
  <nav-title name="推荐歌单"></nav-title>
  <a-row type="flex">
    <a-col flex="1 1 20%" v-for="item in recommendList" :key="item.id">
      <Box>
        <img :src="item.picUrl" class="w-full h-full" alt="">
      </Box>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { recommendApi } from "@/api/recommend";
import NavTitle from '@/components/NavTitle.vue'
import { IRecommendList } from "@/api/types/recommend";
import Box from "@/components/Box.vue";
const recommendList = ref<IRecommendList[]>()
const getRecommend = async() => {
  const res = await recommendApi({ limit: 20 })
  recommendList.value = res.result
}
getRecommend()
</script>