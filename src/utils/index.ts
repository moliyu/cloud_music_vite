export const prefixPath = (...args: string[]) => {
  args.reduce((res, current) => {
    res = res + current
    return res
  }, '')
}