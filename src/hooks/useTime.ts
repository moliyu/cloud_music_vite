import dayjs from "dayjs";

export default() => {
  const useDate = (time: number = new Date().getTime()) => {
    return dayjs(time).format('YYYY-MM-DD')
  }
  return { useDate }
}