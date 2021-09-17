<template>
  <nav-title name="推荐歌单"></nav-title>
  <a-button>test</a-button>
  <a-row type="flex" :gutter="[10, 20]">
    <a-col flex="20%" v-for="item in recommendList" :key="item.id" :title="item.name">
      <Box>
        <img :src="item.picUrl" class="w-full h-full rounded-md" alt="">
      </Box>
      <div class="mt-10px overflow-hidden overflow-ellipsis line-clamp-2 text-black">{{item.name}}</div>
    </a-col>
  </a-row>
  <ACol />
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { recommendApi } from "@/api/recommend";
import { IRecommendList } from "@/api/types/recommend";
const recommendList = ref<IRecommendList[]>()
const getRecommend = async() => {
  const res = await recommendApi({ limit: 10 })
  recommendList.value = res.result
}
getRecommend()
</script>