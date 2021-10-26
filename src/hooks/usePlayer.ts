import { useStore } from "@/store"
import { watchEffect, computed, ref, onMounted, Ref } from "@vue/runtime-core"

export enum Mode {
  normal = 'normal',
  random = 'random',
  list = 'list',
  single = 'single'
}

type Options = {
  src?: string
  mode?: Mode
}

export default (audioEl: Ref<HTMLAudioElement|null>, options?: Options) => {
  const store = useStore()
  const duration = ref(0)
  const current = computed(() => store.state.player.current)
  const musicList = computed(() => store.state.player.musicList)
  const volumn = computed({
    get: () => store.state.player.volumn,
    set: val => {
      store.commit('player/SET_VOLUMN', val)
    }
  })
  const currentTime = computed({
    get: () => store.state.player.currentTime,
    set: (val) => {
      store.commit('player/SET_CURRENT_TIME', val)
    }
  })
  const src = ref('')
  const isPlaying = ref(false)
  const modeList = ['normal', 'list', 'random', 'single']
  const mode = computed({
    get: () => store.state.player.mode,
    set: (mode) => {
      store.commit('player/SET_MODE', mode)
    }
  })
  
  onMounted(() => {
    if (audioEl.value) {
      let player = audioEl.value
      if (options?.src) src.value = options.src
      player.currentTime = currentTime.value
      player.volume = volumn.value
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
  watchEffect(() => {
    if (audioEl.value) {
      audioEl.value.volume = volumn.value
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
  const setCurrentTime = (currentTime: number) => {
    if (audioEl.value) {
      audioEl.value.currentTime = currentTime
    }
  }
  watchEffect(() => {
    if (current.value && audioEl.value) {
      audioEl.value.src = `https://music.163.com/song/media/outer/url?id=${current.value?.id}.mp3`
    }
  })
  const changeMode = () => {
    const index = modeList.findIndex(item => item === mode.value)
    if (index < modeList.length - 1) {
      mode.value = modeList[index + 1] as Mode
    } else {
      mode.value = Mode.normal
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
    mode,
    setCurrentTime,
    changeMode,
    current,
    volumn,
    musicList
  }
}