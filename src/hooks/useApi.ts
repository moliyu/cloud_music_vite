import { ref } from 'vue'
export default <T>(api: (params?: any) => Promise<any>) => {
  const loading = ref(false)
  const error = ref(null)
  const res = ref<T>()
  const request = (...args: any[]) => {
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