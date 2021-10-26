import { IAlbum, IArtist } from "./album"
interface IQuality {
  br: number
  fid: number
  size: number
  vd: number
}

export interface ISong {
  a: null
  al: IAlbum
  alia: []
  ar: IArtist[]
  cd: string
  cf: string
  copyright: number
  cp: 0
  crbt: null
  djId: 0
  dt: number
  fee: number
  ftype: number
  h: IQuality
  id: number
  l: IQuality
  m: IQuality
  mark: 0
  mst: 9
  mv: 0
  name: string
  no: number
  noCopyrightRcmd: null
  originCoverType: number
  originSongSimpleData: null
  pop: number
  pst: number
  publishTime: number
  rt: null
  rtUrl: null
  rtUrls: []
  rtype: number
  rurl: null
  s_id: number
  single: number
  st: number
  t: number
  v: number
}