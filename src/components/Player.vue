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
      <a-tooltip :title="formatmode(mode)" :getPopupContainer="getPopupContainer">
        <svg-icon class="text-lg cursor-pointer hover:text-primary" :name="mode" @click="changeMode"></svg-icon>
      </a-tooltip>
      <svg-icon class="text-lg cursor-pointer hover:text-primary ml-10px" name="historyList" @click="show=true"></svg-icon>
      <svg-icon class="text-lg text-primary ml-10px mr-5px" name="novalue"></svg-icon>
      <Progress :modelValue="volumn * 100" @change="v => volumn = v / 100" class="w-100px" />
    </div>
  </div>
  <a-drawer 
    v-model:visible="show"
    title="当前播放"
    width="600"
  >
    <div class="flex">
      <div class="text-gray-text">总{{musicList.length}}首</div>
      <div class="flex-auto"></div>
      <div class="text-link cursor-pointer" @click="store.commit('player/REMOVE_ALL')">清空列表</div>
    </div>
    <a-table
      :columns="column"
      row-key="id"
      size="small"
      :customRow="customRow"
      :pagination="false"
      :dataSource="musicList"></a-table>
  </a-drawer>
</div>
<audio ref="audio" class="hidden"></audio>
</template>

<script setup lang="tsx">
import { IArtist } from "@/api/types/album";
import { ISong } from "@/api/types/song";
import useImg from "@/hooks/useImg";
import usePlayer, { Mode } from "@/hooks/usePlayer";
import useTime from "@/hooks/useTime";
import { useStore } from "@/store";
import { 
  CaretRightOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PauseOutlined,
  DeleteOutlined
} from "@ant-design/icons-vue";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { ColumnProps } from "ant-design-vue/es/table/interface";
import Progress from "./Progress.vue";
const { formatTime } = useTime()
const audio = ref()
const percent = ref(0)
const isMove = ref(false)
const show = ref(false)
const store = useStore()
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
  volumn,
  changeMode,
  musicList
} = usePlayer(audio)

const done = () => {
  const currentTime = duration.value * percent.value / 100
  setCurrentTime(currentTime)
}

const getPopupContainer = (el: HTMLElement) => el.parentNode

watchEffect(() => {
  if (!isMove.value) {
    percent.value = currentTime.value / duration.value * 100 || 0
  }
})

const column: ColumnProps[] = [
  {
    title: '',
    key: 'play',
    customRender: ({record}) => {
      if (record.id === current.value.id) {
        return <div class="text-primary">
          {isPlaying.value ? <PauseOutlined /> : <CaretRightOutlined />}
        </div>
      }
    },
    width: 20
  },
  {
    title: '音乐标题',
    key: 'title',
    dataIndex: 'name'
  },
  {
    title: '歌手',
    key: 'singer',
    dataIndex: 'ar',
    customRender: ({ text } : { text: IArtist[] }) => {
      return text.map((item, index) => {
        return <>
          {index === 0 ? null : <span>/</span>}
          <span class="cursor-pointer hover:text-primary text-gray-text">{item.name}</span>
        </>
      })
    }
  },
  {
    title: '时长',
    key: 'duration',
    dataIndex: 'dt',
    customRender: ({ text }) => {
      return formatTime(text)
    }
  },
  {
    title: '',
    key: 'delete',
    customRender: ({ record }) => {
      return <div class="hover:text-primary cursor-pointer" onClick={(e) => {
        e.stopPropagation()
        remove(record as ISong)
      }}>
        <DeleteOutlined />
      </div>
    },
    width: 20
  }
]
const remove = (record: ISong) => {
  store.commit('player/REMOVE', record.id)
}
const customRow = (record: ISong) => {
  return {
    onClick: () => {
      if (record.id === current.value.id) {
        isPlaying.value ? pause() : play()
      } else {
        store.commit('player/SET_CURRENT', record)
      }
    }
  }
}

</script>