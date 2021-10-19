<template>
<div class="h-50px w-full flex justify-center items-center relative">
  <div class="absolute left-0 top-0 z-10 w-full h-1px px-10px">
    <Progress v-model="percent" v-model:isMove="isMove" @done="done" />
  </div>
  <div class="h-full flex items-center absolute left-0 top-0">
    <div class="relative mx-10px">
      <img class="rounded-md" :src="useImg(current?.al?.picUrl, '40y40')" alt="">
    </div>
    <div>
      <div class="text-sm">{{current?.name}}-
        <span class="text-xs" v-for="(item, i) in current?.ar">
          <span v-if="i!==0">/</span>
          <span class="text-gray-text hover:text-primary cursor-pointer">{{item.name}}</span>
        </span>
      </div>
      <div class="text-xs text-gray-lighter">{{formatTime(currentTime * 1000)}}/{{formatTime(duration * 1000)}}</div>
    </div>
  </div>
  <div class="mx-auto flex items-center">
    <div class="text-primary text-xl p-10px cursor-pointer">
      <StepBackwardOutlined />
    </div>
    <div class="text-white mx-10px text-lg bg-primary w-30px h-30px rounded-full flex justify-center items-center cursor-pointer">
      <PauseOutlined @click="pause" v-if="isPlaying" />
      <CaretRightOutlined @click="play" v-else />
    </div>
    <div class="text-primary text-xl p-10px cursor-pointer">
      <StepForwardOutlined />
    </div>
    <div class="h-full absolute flex items-center right-0 top-0 pr-10px">
      <a-tooltip :title="formatmode(mode)">
        <svg-icon class="text-lg cursor-pointer hover:text-primary" :name="mode" @click="changeMode"></svg-icon>
      </a-tooltip>
      <svg-icon class="text-lg text-primary ml-10px mr-5px" name="novalue"></svg-icon>
      <Progress v-model="soundVolumn" class="w-100px" />
    </div>
  </div>
</div>
<audio ref="audio" class="hidden"></audio>
</template>

<script setup lang="ts">
import useImg from "@/hooks/useImg";
import usePlayer, { Mode } from "@/hooks/usePlayer";
import useTime from "@/hooks/useTime";
import { CaretRightOutlined, StepBackwardOutlined, StepForwardOutlined, PauseOutlined } from "@ant-design/icons-vue";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import Progress from "./Progress.vue";
const { formatTime } = useTime()
const audio = ref()
const percent = ref(0)
const soundVolumn = ref(100)
const isMove = ref(false)
const formatmode = (mode: Mode) => {
  switch (mode) {
    case Mode.normal:
      return '顺序播放'
    case Mode.random:
      return '随机播放'
    case Mode.list:
      return '顺序循环'
    default:
      return '单曲循环'
  }
}

const { 
  currentTime,
  setCurrentTime,
  duration,
  play,
  pause,
  isPlaying,
  mode,
  current,
  changeMode } = usePlayer(audio)

const done = () => {
  const currentTime = duration.value * percent.value / 100
  setCurrentTime(currentTime)
}

watchEffect(() => {
  if (!isMove.value) {
    percent.value = currentTime.value / duration.value * 100 || 0
  }
})

</script>