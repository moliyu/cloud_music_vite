<template>
  <a-spin :spinning="loading">
    <a-row :gutter="30" type="flex">
      <a-col flex="220px">
        <Box>
          <img class="w-full h-full rounded-md" :src="useImg(res?.playlist?.coverImgUrl, '200y200')" alt="">
        </Box>
      </a-col>
      <a-col flex="1">
        <div class="flex items-center">
          <div class="text-primary text-xs border border-primary rounded-md px-2 py-2px inline-block">歌单</div>
          <div class="text-2xl font-medium ml-10px">{{res?.playlist?.name}}</div>
        </div>
        <div class="flex items-center mt-10px text-xs">
          <img :src="useImg(res?.playlist?.creator.avatarUrl, '25y25')" class="rounded-full" alt="">
          <div class="text-link mx-10px">{{res?.playlist?.creator.nickname}}</div>
          <div>{{useDate(res?.playlist?.createTime)}}创建</div>
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
          <div v-for="(item, i) in res?.playlist?.tags" :key="i">
            <span class="text-link cursor-pointer mx-2px">{{item}}</span>
            <span v-if="i + 1 !== res?.playlist?.tags.length">/</span>
          </div>
        </div>
        <div class="mt-10px flex text-xs">
          <div>歌曲数:</div>
          {{res?.playlist?.trackCount || 0}}
          <div class="ml-10px">播放数:</div>
          {{useCount(res?.playlist?.playCount || 0)}}
        </div>
        <div class="mt-10px text-xs">{{res?.playlist.description}}</div>
      </a-col>
    </a-row>
    <div class="mt-20px">
      <a-tabs>
        <a-tab-pane key="1" tab="歌曲列表">
          <List :music-list="res?.playlist.tracks ?? []" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="评论"></a-tab-pane>
        <a-tab-pane key="3" tab="收藏者"></a-tab-pane>
      </a-tabs>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { albumApi } from "@/api/album";
import useImg from "@/hooks/useImg";
import useTime from "@/hooks/useTime";
import { useRoute } from "vue-router";
import { PlusOutlined, CaretRightOutlined } from '@ant-design/icons-vue'
import useCount from "@/hooks/useCount";
import useApi from "@/hooks/useApi";
import List from "./List.vue";

const route = useRoute()
const songId = route.params.id as string
const { useDate } = useTime()
const { res, request, loading } = useApi(albumApi)
request({ id: songId })
</script>