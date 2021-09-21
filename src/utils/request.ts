import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL
}

const axiosSuccess = (res: AxiosResponse) => {
  return Promise.resolve(res.data)
}

const axiosError = (err: AxiosError) => {
  return Promise.reject(err.message)
}
const instance = axios.create(config)
instance.interceptors.response.use(axiosSuccess, axiosError)

export default instance

export type CustomResponse<T> = T & { code: number }
export type Fetch = <T = any>(url: string, params?: any, config?: AxiosRequestConfig) => Promise<CustomResponse<T>>

export const get: Fetch = (url, params, config = {}) => {
  return instance.get(url, { params, ...config })
}