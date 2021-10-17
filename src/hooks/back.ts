type PMutaions<S, T> = {
  [K in keyof T]: (state: S, payload?: any) => void
}

type PActions<S, T> = {
  [K: string]: (action: { commit: (type: string, payload?: any) => void }) => any
}

const defineStore = <S, T>({ state, mutations, actions, namespaced = false }: {state?: S, mutations?: PMutaions<S, T>, actions?: PActions<S, T>, namespaced?: boolean}) => {
  return {
    namespaced,
    state,
    mutations,
    actions
  }
}

export default defineStore