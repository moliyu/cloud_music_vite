export default (count: number) => {
  if (count % 10000) {
    return ~~(count / 10000) + '万'
  } else if (count % 1000) {
    return ~~(count / 1000) + '千'
  }
  return count
}