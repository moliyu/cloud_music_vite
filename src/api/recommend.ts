import { get } from '@/utils/request'
import { IBanner, IMv, IRecommendList } from './types/recommend'

export enum PlatForm {
  pc,
  android,
  iphone,
  ipad
}

/**获取推荐歌单 */
export const recommendApi = (params: { limit: number }) => get<{ result: IRecommendList[]}>('/personalized', params)

/**获取banner */
export const bannerApi = (params: { type: PlatForm }) => get<{ banners: IBanner[] }>('/banner', params)

/**独家放送mv */
export const mvApi = () => get<{ result: IMv[] }>('/personalized/privatecontent')