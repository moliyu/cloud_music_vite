<template>
  <a-spin :spinning="loading">
    <a-row :gutter="20">
      <a-col :span="8" v-for="item in res?.result" :key="item.id" class="cursor-pointer relative group">
        <div 
          class="absolute group-hover:opacity-100 opacity-0 p-5px bg-opacity-40 flex items-center text-white left-4 top-2 bg-black z-10 rounded-full">
          <CaretRightOutlined />
        </div>
        <Box :ratio="0.37">
          <img :src="useImg(item.picUrl, '324y120')" class="w-full h-full rounded-md" alt="">
        </Box>
        <div class="mt-10px text-xs overflow-hidden overflow-ellipsis line-clamp-2 text-black">{{item.name}}</div>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script setup lang="ts">
import { mvApi } from '@/api/recommend'
import useImg from '@/hooks/useImg';
import { CaretRightOutlined } from '@ant-design/icons-vue'
import useApi from '@/hooks/useApi';
const { res, request, loading } = useApi(mvApi)
request()
</script>