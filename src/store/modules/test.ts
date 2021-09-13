const state = {
  count: 0
}

export type IState = typeof state

const mutations = {
  ADD: (state: IState, count: number) => {
    state.count += count
  },
  Minus: (state: IState, count: number) => {
    state.count -= count
  },
  ADD1: (state: IState) => {
    state.count++
  }
}

export default {
  namespaced: true,
  state,
  mutations
}