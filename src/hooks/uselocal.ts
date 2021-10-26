import { ISong } from '@/api/types/song'
import { Mode } from './usePlayer'
import useStorage from './useStorage'
export default() => {
  const player = useStorage('player', {
    currentTime: 0,
    musicList: [] as ISong[],
    mode: 'normal' as Mode,
    current: {} as ISong,
    volumn: 1
  })
  return {
    player
  }
}