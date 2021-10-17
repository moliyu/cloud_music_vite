import { ref } from 'vue'

type GetParams<T> = T extends (...params: infer P) => Promise<any> ? [...P] : []
type Res<T> = T extends (...params: any) => Promise<infer P> ? P : Promise<any>

export default <T extends (...params: any) => Promise<any>>(api: T) => {
  const loading = ref(false)
  const error = ref(null)
  const res = ref<Res<T>>()
  const request = (...args: GetParams<T>) => {
    loading.value = true
    api(...args).then(result => {
      res.value = result
    }).catch(e => {
      error.value = e
    }).finally(() => {
      loading.value = false
    })
  }
  return {
    request,
    res,
    error,
    loading
  }
}