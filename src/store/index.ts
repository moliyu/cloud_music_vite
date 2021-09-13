import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import test from './modules/test'
import app from './modules/app'
import { moduleAction, UseStore } from '@/hooks/useStore'

const state = {
    count: 1
}

type RootState = typeof state

export const vuexOptions = {
    state: state,
    getter: {},
    mutations: {
        ADD: (state: RootState, count: number) => {
            state.count = count
        },
        MINUS: (state: RootState, count: number) => {
            state.count = count
        },
    },
    actions: {},
    modules: {
        app,
        test
    }
}


// type State = typeof modules

export default createStore(vuexOptions)

export function useStore(): UseStore {
    return baseUseStore()
}