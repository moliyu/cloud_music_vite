type IPlayList = {
  adType: 0
  backgroundCoverId: number
  backgroundCoverUrl?: string
  cloudTrackCount: number
  commentCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: ICreator
  description: string
  englishTitle: null
  highQuality: false
  historySharedUsers: null
  id: 5193023281
  name: string
  newImported: false
  officialPlaylistType: null
  opRecommend: false
  ordered: true
  playCount: number
  privacy: 0
  remixVideo: null
  shareCount: 76
  sharedUsers: null
  specialType: 0
  status: 0
  subscribed: null
  subscribedCount: 10548
  subscribers: []
  tags: string[]
  titleImage: 0
  titleImageUrl: null
  trackCount: 121
  trackIds: []
  trackNumberUpdateTime: 1628693038597
  trackUpdateTime: 1631587500894
  tracks: []
  updateFrequency: null
  updateTime: 1628916207491
  userId: 326022112
  videoIds: null
  videos: null
}

export type ICreator = {
  avatarUrl: string
  nickname: string
}

export type IAlbumDetail = {
  playlist: IPlayList
}