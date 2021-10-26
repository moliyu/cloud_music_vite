import { get } from "@/utils/request"

export const generateQr = async() => {
  const res = await get('/login/qr/key', { _t: Date.now() })
  return get<{
    data: {
      qrurl: string
      qrimg: string
    }
  }>('/login/qr/create', { key: res.data.unikey, _t: Date.now(), qrimg: true})
}