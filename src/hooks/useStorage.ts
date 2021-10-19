type Key = 
| 'musicList'
| 'current'
| 'mode'
| 'currentTime'
| 'player'
export default <T>(key: Key, initial: T) => {
  const set = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const get = () => {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) as T : initial
  }
  const remove = () => {
    localStorage.removeItem(key)
  }
  return {
    set,
    get,
    remove
  }
}