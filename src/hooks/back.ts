import { vuexOptions } from '@/store'
const modules = vuexOptions.modules

type GetStateParam<M> = M extends { state: infer P } ? P : unknown
type GetState<M> = {
    [K in keyof M]: GetStateParam<M[K]>
}
export type State = GetState<typeof modules>

type AddPrefix<K, V> = `${K & string}/${V & string}`
type GetPayloadType<T> = T extends (state: any, payload: infer P) => infer R ? (payload: P) => R : never
// type GetCommitKey<M> = M extends { mutations: infer P } ? P : unknown
type GetCommitFn<M, module> = M extends { mutations: infer P } ? {
    [K in keyof P as AddPrefix<module, K>]: GetPayloadType<P[K]>
} : unknown
type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (k: infer P) => void ? P: never
type GetCommit<M> = {
  [K in keyof M]: GetCommitFn<M[K], K>
}[keyof M]
type GetCommitType = GetCommit<typeof modules>
type xx = UnionToIntersection<GetCommitType>

export type Commit = <T extends keyof xx>(type: T, payload?: xx[T] extends (payload: infer P) => void ? P : undefined) => ReturnType<xx[T]>
export type UseStore = {
  state: State,
  commit: Commit
}

type moduleActionFn<T> = <K extends keyof T>(type: K, payload?: T[K] extends (type: any, payload: infer P) => void? P : undefined) => T[K] extends (...args: any) => infer R ? R : void
export type moduleAction<T> = {
  commit: moduleActionFn<T>
}

const mutations = {
  ADD: (state: any, count: number) => {
    state.count += count
  },
  Minus: (state: any, count: number) => {
    state.count -= count
  },
  ADD1: (state: any) => {
    state.count++
  }
}

// type m = moduleAction<typeof mutations>
// let { commit }: m = {}



