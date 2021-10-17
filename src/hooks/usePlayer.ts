import { watchEffect, computed, ref, onMounted, Ref } from "@vue/runtime-core"

export enum Mode {
  normal,
  random,
  loop,
  single
}

type Options = {
  src?: string
  mode?: Mode
}

export default (audioEl: Ref<HTMLAudioElement|null>, options?: Options) => {
  const duration = ref(0)
  const currentTime = ref(0)
  const src = ref('')
  const isPlaying = ref(false)
  const mode = ref(Mode.normal)
  
  onMounted(() => {
    if (audioEl.value) {
      let player = audioEl.value
      if (options?.src) src.value = options.src
      if (options?.mode) mode.value = options.mode
      player.oncanplay = () => {
        duration.value = player.duration
        player.play()
      }
      player.ontimeupdate = () => {
        currentTime.value = player.currentTime
      }
      player.onplaying = () => {
        isPlaying.value = true
      }
      player.onpause = () => {
        isPlaying.value = false
      }
    }
    
  })
  watchEffect(() => {
    if (audioEl.value && src.value) {
      audioEl.value.src = src.value
    }
  })
  const play = () => {
    audioEl.value?.play()
  }
  const setSrc = (link: string) => {
    src.value = link
  }
  const stop = () => {
    if (audioEl.value) {
      audioEl.value.currentTime = 0
      audioEl.value.pause()
    }
  }
  const pause = () => {
    if (audioEl.value) {
      audioEl.value.pause()
    }
  }
  return {
    duration,
    currentTime,
    src,
    setSrc,
    play,
    stop,
    pause,
    isPlaying,
    mode
  }
}