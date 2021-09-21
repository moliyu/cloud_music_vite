import { get } from "@/utils/request";
import { IAlbumDetail } from "./types/album";

/**获取歌单详情 */
export const albumApi = (params: { id: number | string }) => get<IAlbumDetail>('/playlist/detail', params)