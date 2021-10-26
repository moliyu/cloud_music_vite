import { ISong } from "@/api/types/song";
import uselocal from "@/hooks/uselocal";
import { Mode } from "@/hooks/usePlayer";
import { moduleAction } from '@/hooks/useStore'

const { player } = uselocal()

const state = {
  musicList: player.get().musicList,
  current: player.get().current,
  currentTime: player.get().currentTime,
  mode: player.get().mode,
  volumn: player.get().volumn
}

type RootState = typeof state

const mutations = {
  ADD: (state: RootState, record: ISong) => {
    if (!state.musicList.some(item => item.id === record.id)) {
      state.musicList.push(record)
      player.set(state)
    }
  },
  SET_CURRENT: (state: RootState, record: ISong) => {
    state.current = record
    player.set(state)
  },
  SET_CURRENT_TIME: (state: RootState, currentTime: number) => {
    state.currentTime = currentTime
    player.set(state)
  },
  SET_MODE: (state: RootState, mode: Mode) => {
    state.mode = mode
    player.set(state)
  },
  SET_VOLUMN: (state: RootState, volumn: number) => {
    state.volumn = volumn
    player.set(state)
  },
  REMOVE: (state: RootState, id: number) => {
    state.musicList = state.musicList.filter(item => item.id !== id)
    player.set(state)
  },
  REMOVE_ALL: (state: RootState) => {
    state.musicList = []
    player.set(state)
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