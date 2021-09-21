<template>
  <a-spin :spinning="!!!playlist">
    <a-row :gutter="30">
      <a-col :span="6">
        <Box>
          <img class="w-full h-full rounded-md" :src="useImg(playlist?.coverImgUrl, '250y250')" alt="">
        </Box>
      </a-col>
      <a-col :span="18">
        <div class="flex items-center">
          <div class="text-primary text-xs border border-primary rounded-md px-2 py-2px inline-block">歌单</div>
          <div class="text-2xl font-medium ml-10px">{{playlist?.name}}</div>
        </div>
        <div class="flex items-center mt-10px text-xs">
          <img :src="useImg(playlist?.creator.avatarUrl, '25y25')" class="rounded-full" alt="">
          <div class="text-link mx-10px">{{playlist?.creator.nickname}}</div>
          <div>{{useDate(playlist?.createTime)}}创建</div>
        </div>
        <div class="flex mt-10px">
          <div class="items-center flex h-30px rounded-30px overflow-hidden cursor-pointer">
            <div class="flex items-center bg-primary-light h-full px-10px hover:bg-primary-weight group">
              <div class="text-white">
                <CaretRightOutlined class="p-2px bg-primary-light group-hover:bg-primary-weight border border-white rounded-full" />
              </div>
              <div class="ml-1 text-white">播放全部</div>
            </div>
            <div class="text-white bg-primary-light hover:bg-primary-weight h-full flex items-center border-l border-gray">
              <PlusOutlined class="pl-10px pr-15px" />
            </div>
          </div>
        </div>
        <div class="mt-10px flex text-xs">
          <div class="mr-5px">标签:</div>
          <div v-for="(item, i) in playlist?.tags" :key="i">
            <span class="text-link cursor-pointer mx-2px">{{item}}</span>
            <span v-if="i + 1 !== playlist?.tags.length">/</span>
          </div>
        </div>
        <div class="mt-10px flex text-xs">
          <div>歌曲数:</div>
          {{playlist?.trackCount || 0}}
          <div class="ml-10px">播放数:</div>
          {{useCount(playlist?.playCount || 0)}}
        </div>
        <div class=""></div>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script setup lang="ts">
import { albumApi } from "@/api/album";
import { IAlbumDetail } from "@/api/types/album";
import useImg from "@/hooks/useImg";
import useTime from "@/hooks/useTime";
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import useCount from "@/hooks/useCount";

const route = useRoute()
const songId = route.params.id as string
const playlist = ref<IAlbumDetail['playlist']>()
const { useDate } = useTime()

const getAlbumDetail = async() => {
  const res = await albumApi({ id: songId })
  playlist.value = res.playlist
  console.log('%c 🥑 res: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', res);
}
getAlbumDetail()
</script>