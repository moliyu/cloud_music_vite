<template>
<div class="h-50px w-full flex justify-center items-center relative">
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
    <div></div>
  </div>
</div>
<audio ref="audio" class="hidden"></audio>
</template>

<script setup lang="ts">
import useImg from "@/hooks/useImg";
import usePlayer from "@/hooks/usePlayer";
import useTime from "@/hooks/useTime";
import { CaretRightOutlined, StepBackwardOutlined, StepForwardOutlined, PauseOutlined } from "@ant-design/icons-vue";
import { useStore } from "@/store";
import { computed, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
const { formatTime } = useTime()
const store = useStore()
const current = computed(() => store.state.player.current)
const audio = ref()

const { currentTime, duration, setSrc, play, stop, pause, isPlaying, mode } = usePlayer(audio)

watchEffect(() => {
  if (current.value) {
    setSrc(`https://music.163.com/song/media/outer/url?id=${current.value?.id}.mp3`)
  }
})

</script>