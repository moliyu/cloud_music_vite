export interface IRecommendList {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

export interface IBanner {
  adDispatchJson: null
  adLocation: null
  adSource: null
  adid: null
  encodeId: string
  event: null
  exclusive: boolean
  extMonitor: null
  extMonitorInfo: null
  imageUrl: string
  monitorBlackList: null
  monitorClick: null
  monitorClickList: null
  monitorImpress: null
  monitorImpressList: null
  monitorType: null
  program: null
  scm: string
  song: null
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: null
  video: null
}

export type IMv = {
  alg: string
  copywriter: string
  id: number
  name: string
  picUrl: string
  sPicUrl: string
  type: number
  url: string
}