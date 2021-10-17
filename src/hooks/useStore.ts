import { vuexOptions } from "@/store";

type AddPrefix<K, V = ''> = `${K & string}${K extends '' ? '' : '/'}${V&string}`
type GetResetFn<T> = T extends (state: any, ...args: infer P) => infer R ? (...args: P) => R : never
type modules = typeof vuexOptions.modules

type GetStateTypes<M> = M extends { state: infer P } ? {
  [K in keyof P]: P[K]
}: {}
type GetSubStateTypes = {
  [K in keyof modules]: modules[K] extends { state: infer P } ? P : {}
}

type GetMutationTypes<M, moduleName = ''> = M extends { mutations: infer P } ? {
  [K in keyof P as AddPrefix<moduleName, K>]: GetResetFn<P[K]>
} : {}
type GetSubMutationsTypes = {
  [K in keyof modules]: GetMutationTypes<modules[K], K>
}[keyof modules]

type GetActionTypes<M, moduleName = ''> = M extends { actions: infer P } ? {
  [K in keyof P as AddPrefix<moduleName, K>]: GetResetFn<P[K]>
}: {}
type GetSubActionTypes = {
  [K in keyof modules]: GetActionTypes<modules[K], K>
}[keyof modules]

// type xx = GetSubMutationsTypes<typeof vuexOptions>

type union<T> = (T extends any ? (k: T) => void: unknown) extends (k: infer P) => void ? P : unknown

type Mutations = GetMutationTypes<typeof vuexOptions>
type SubMutations = union<GetSubMutationsTypes>
type GetFn<T> = <K extends keyof T>(type: K, payload?: T[K] extends (payload: infer P) => void ? P : undefined) => T[K] extends (...args: any) => infer R ? R : never

type Actions = GetActionTypes<typeof vuexOptions>
type SubActions = union<GetSubActionTypes>

export type Commit = union<GetFn<SubMutations> | GetFn<Mutations>>
export type Dispatch = union<GetFn<SubActions> | GetFn<Actions>>
export type State = union<GetStateTypes<typeof vuexOptions>| GetSubStateTypes>

type GetModuleActionFn<S> = <K extends keyof S>(type: K, payload: S[K] extends (state: any, payload: infer P) => void ? P : undefined) => S[K] extends (...args: any) => infer P ? P : void

export type moduleAction<S> = {
  commit: GetModuleActionFn<S>
}

type Getters<T> = {
  [K in keyof T]: T[K] extends (state: any) => infer P ? P : void
}


export type UseStore = {
  commit: Commit
  state: State
  dispatch: Dispatch
  getters: Getters<typeof vuexOptions.getters>
}
