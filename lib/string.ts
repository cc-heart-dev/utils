/**
 * Capitalizes the first letter of a string.
 *
 * @param target - The string to be capitalized.
 * @returns - The capitalized string.
 */
export const capitalize = <T extends string>(target: T) =>
  (target.charAt(0).toUpperCase() + target.slice(1)) as Capitalize<T>

/**
 * Returns a new string with the first character converted to lowercase.
 *
 * @param target - The string to be unCapitalized.
 * @returns - The unCapitalized string.
 */
export const unCapitalize = <T extends string>(target: T) =>
  (target.charAt(0).toLowerCase() + target.slice(1)) as Uncapitalize<T>

/**
 * @description Add the number of cuts based on the original split and return all subsets after the cut
 * @param str need to split of primitive string
 * @param splitStr split params
 * @param num split limit
 * @returns a new split array, length is num + 1
 */
export function mulSplit(str: string, splitStr: string, num = -1) {
  const splitList = str.split(splitStr, num)
  if (num === -1) return splitList
  const originStr = splitList.join(splitStr)
  if (originStr === str) return splitList
  const endStr = str.slice(originStr.length + 1)
  splitList.push(endStr)
  return splitList
}

/**
 * Converts an underline-separated string to camel case.
 * e.g. underlineToHump('hello_word') => 'helloWord'
 *
 * @param target - The underline-separated string to convert.
 * @returns The camel case version of the input string.
 */
export function underlineToHump(target: string) {
  let isStartUnderline = true
  let prefixStr = null
  let str = ''
  for (let i = 0; i < target.length; i++) {
    if (
      target[i] === '_' &&
      /[a-z]/.test(target[i + 1]) &&
      !isStartUnderline &&
      prefixStr !== '_'
    ) {
      i++
      str += target[i].toUpperCase()
      continue
    }
    prefixStr = target[i]
    if (isStartUnderline && target[i] !== '_') {
      isStartUnderline = false
    }
    str += target[i]
  }
  return str
}
