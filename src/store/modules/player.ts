import { ISong } from "@/api/types/song";
import { moduleAction } from '@/hooks/useStore'

interface RootState {
  musicList: ISong[]
  current: ISong | null
  currentTime: number
  duration: number
}
const state: RootState = {
  musicList: [],
  current: null,
  currentTime: 0,
  duration: 0
}

const mutations = {
  ADD: (state: RootState, record: ISong) => {
    if (!state.musicList.some(item => item.id === record.id)) {
      state.musicList.push(record)
    }
  },
  SET_CURRENT: (state: RootState, record: ISong) => {
    state.current = record
  },
  SET_CURRENT_TIME: (state: RootState, currentTime: number) => {
    state.currentTime = currentTime
  },
  SET_DURATION: (state: RootState, duration: number) => {
    state.duration = duration
  }
}

const actions = {
  set_and_play: ({ commit }: moduleAction<typeof mutations>, record: ISong) => {
    commit('ADD', record)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}