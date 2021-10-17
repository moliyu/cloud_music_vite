import dayjs from "dayjs";

export default() => {
  const useDate = (time: number = new Date().getTime()) => {
    return dayjs(time).format('YYYY-MM-DD')
  }
  const formatTime = (mss?: number) => {
    if (!mss) return '00:00'
    // var days = Math.floor(mss / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((mss % (1000 * 60)) / 1000);
    return `${minutes < 10 ? `0${minutes}` : minutes}: ${seconds < 10 ? `0${seconds}` : seconds }`
}
  return { useDate, formatTime }
}