<template>
  <a-spin :spinning="loading">
    <a-row type="flex" :gutter="[20, 20]">
      <a-col
       @click="$router.push({ path: `/detail/songList/${item.id}` })"
       class="group cursor-pointer"
       flex="20%" v-for="item in res?.result"
       :key="item.id"
       :title="item.name">
        <Box class="relative">
          <div class="absolute flex items-center text-white right-2 top-1">
            <CaretRightOutlined />{{useCount(item.playCount)}}
          </div>
          <img :src="useImg(item.picUrl, '210y210')" class="w-full h-full rounded-md" alt="">
        </Box>
        <div 
        class="w-25px h-25px flex justify-center bg-opacity-80 items-center absolute text-primary rounded-full right-4 bg-white bottom-1/3 group-hover:opacity-100 opacity-0 text-lg">
          <CaretRightOutlined />
        </div>
        <div class="mt-10px text-xs overflow-hidden overflow-ellipsis line-clamp-2 text-black">{{item.name}}</div>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script setup lang="ts">
import { recommendApi } from "@/api/recommend";
import { CaretRightOutlined } from '@ant-design/icons-vue'
import useImg from "@/hooks/useImg";
import useCount from '@/hooks/useCount'
import useApi from "@/hooks/useApi";
const { res, request, loading } = useApi(recommendApi)
request({ limit: 10 })
</script>