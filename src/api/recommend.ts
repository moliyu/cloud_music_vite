import { get } from '@/utils/request'
import { IRecommendList } from './types/recommend'

export const recommendApi = (params: { limit: number }) => get<IRecommendList[]>('/personalized', params)