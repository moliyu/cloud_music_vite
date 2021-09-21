<template>
  <a-spin :spinning="!bannerList.length">
    <div class="relative cursor-pointer mt-20px" style="padding-top: 21%">
      <LeftOutlined class="icon left-2" @click="state.activeIndex--" />
      <RightOutlined class="icon right-2" @click="state.activeIndex++" />
      <div class="absolute w-1/2 top-0 left-0" @click="handleClick(i)" :style="generateStyle(i)" v-for="(item, i) in bannerList" :key="i">
        <Box :ratio="0.37">
          <img :src="useImg(item.imageUrl, '540y200')" class="w-full h-full rounded-md" alt="">
          <div
            class="absolute right-0 bottom-0 rounded-tl-md rounded-br-md text-xs text-white px-10px py-1"
            :style="{background: item.titleColor}">{{item.typeTitle}}</div>
        </Box>
      </div>
      <div class="flex justify-center">
        <div class="p-10px" v-for="(_, i) in state.bannerList" :key="i" @mouseenter="state.activeIndex = i + 1">
          <div class="w-8px h-8px rounded-full" :class="state.activeIndex - 1 === i ? 'bg-primary': 'bg-gray'"></div>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { bannerApi, PlatForm } from "@/api/recommend";
import { IBanner } from "@/api/types/recommend";
import { computed, reactive } from "@vue/reactivity";
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import useImg from '@/hooks/useImg'
import { watchEffect } from "@vue/runtime-core";

const state = reactive<{bannerList: Array<IBanner>, activeIndex: number, isLeft: boolean, loading: boolean}>({
  bannerList: [],
  activeIndex: 1,
  isLeft: false,
  loading: false
})
const getBanner = async() => {
  const res = await bannerApi({ type: PlatForm.pc })
  state.bannerList = res.banners
}
const bannerList = computed(() => {
  return state.bannerList.length ? [state.bannerList[state.bannerList.length - 1], ...state.bannerList, state.bannerList[0]] : []
})
watchEffect(() => {
  if (state.activeIndex > bannerList.value.length - 2) {
    state.activeIndex = 1
  } else if (state.activeIndex < 1) {
    state.activeIndex = bannerList.value.length - 2
  }
})
const handleClick = (index: number) => {
  if (index < state.activeIndex) {
    state.activeIndex--
  } else if (index > state.activeIndex) {
    state.activeIndex++
  }
}
const generateStyle= (index: number) => {
  if (index === state.activeIndex - 1) {
    return {
      transform: 'translateX(0)',
      transition: state.isLeft ? 'transform .9s ease' : 'transform .7s ease',
      zIndex: state.isLeft ? 0 : 1
    }
  } else if (index === state.activeIndex) {
    return {
      zIndex: 2,
      transform: 'scale(1.2) translateX(50%)',
      transition: 'transform .5s ease'
    }
  } else if (index === state.activeIndex + 1) {
    return {
      transform: 'translateX(100%)',
      transition: state.isLeft ? 'transform .7s ease' : 'transform .9s ease',
      zIndex: state.isLeft ? 1 : 0
    }
  }
  return { opacity: 0, transform: 'translateX(50%)' }
}
getBanner()
</script>

<style scoped>
.icon {
  @apply absolute top-1/3 text-2xl z-10 text-gray hover:text-white;
}
</style>