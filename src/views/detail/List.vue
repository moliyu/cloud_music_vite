<template>
  <a-table 
    row-key="id"
    :dataSource="musicList"
    :columns="columns"
    :custom-row="record => {
      return {
        onDblclick: () => play(record)
      }
    }"
    :pagination="false"></a-table>
</template>

<script setup lang="tsx">
import useNumber from "@/hooks/useNumber";
import { TableState } from "ant-design-vue/es/table/interface";
import { IArtist } from '@/api/types/album'
import { HeartOutlined, HeartFilled, DownloadOutlined } from '@ant-design/icons-vue'
import useTime from "@/hooks/useTime";
import { ISong } from "@/api/types/song";
import { useStore } from "@/store";

const { formatTime } = useTime()

interface IMusicList {
  id: number
  name: string,
}
type IColumns = TableState['columns']
const columns: IColumns = [
  {
    title: '',
    key: 'index',
    width: 50,
    customRender: (record) => <span class="text-xs text-gray-lighter">{useNumber(record.index + 1)}</span>
  },
  {
    title: '',
    key: 'action',
    width: 80,
    customRender: (record) => {
      return <div class="flex">
        <HeartOutlined class="mr-10px cursor-pointer hover:text-primary"/>
        <DownloadOutlined class="cursor-pointer hover:text-primary" />
      </div>
    }
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
    title: '专辑',
    key: 'album',
    dataIndex: 'al.name'
  },
  {
    title: '时长',
    key: 'duration',
    dataIndex: 'dt',
    customRender: ({ text }) => {
      return formatTime(text)
    }
  }
]
defineProps<{
  musicList: IMusicList[]
}>()

const store = useStore()
const play = (record: ISong) => {
  store.commit('player/ADD', record)
  store.commit('player/SET_CURRENT', record)
  console.log('mmmm', store.state.player.musicList)
  // console.log('mmm', record)
}
</script>