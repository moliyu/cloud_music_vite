import { moduleAction } from "@/hooks/useStore"

const state = {
  count: 0,
  name: 'app_test'
}

export type ITest = typeof state

const mutations = {
  ADD: (state: ITest, count: number) => {
    state.count += count
  },
  SET_APP_NAME: (state: ITest, { name, count}: { name: string, count: number}) => {
    state.name = name
    state.count = count
  }
}

const actions = {
  add: ({ commit }: moduleAction<typeof mutations>, count: number) => {
    commit('ADD', count )
    commit('SET_APP_NAME', {name: 'app', count})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}