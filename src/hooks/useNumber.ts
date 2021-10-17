export default (count: number | string) => {
  if (count < 10) {
    return `0${count}`
  }
  return count
}