import { ISong } from "@/api/types/song";

export default {
  current: (state: any) => state.player.current as ISong
}