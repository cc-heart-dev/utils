import { isValidDate } from './validate'

const createDateWithoutTimezoneOffset = (...rest: any[]) => {
  const date = new Date(...(rest as []))
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date
}

/**
 * Returns the current time in ISO string format.
 * @returns  The current time in ISO string format.
 */
export function getCurrentTimeISOString(): string {
  return createDateWithoutTimezoneOffset().toISOString()
}

function formatDateString(date: number, maxLength: number) {
  return String(date).padStart(maxLength, '0')
}

function formatDate(
  date: Date,
  formatter = 'YYYY-MM-DD hh:mm:ss',
  utc = false
) {
  const year = formatDateString(
    date[utc ? 'getUTCFullYear' : 'getFullYear'](),
    4
  )
  const month = formatDateString(
    date[utc ? 'getUTCMonth' : 'getMonth']() + 1,
    2
  )
  const day = formatDateString(date[utc ? 'getUTCDate' : 'getDate'](), 2)
  const hours = formatDateString(date[utc ? 'getUTCHours' : 'getHours'](), 2)
  const minutes = formatDateString(
    date[utc ? 'getUTCMinutes' : 'getMinutes'](),
    2
  )
  const seconds = formatDateString(
    date[utc ? 'getUTCMinutes' : 'getSeconds'](),
    2
  )

  return formatter
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * Formats a date based on a given timestamp.
 *
 * @param timeStamp - The timestamp to be formatted, in milliseconds.
 * @param formatter - Optional. A specific format string to format the date. Defaults to 'YYYY-MM-DD HH:mm:ss'.
 *
 * @returns The formatted date string.
 *
 * @throws {Error} Throws an error if the timestamp is invalid or out of range.
 *
 * @example
 * const timestamp = new Date().getTime();
 * const formattedDate = formatDateByTimeStamp(timestamp);
 * console.log(formattedDate);
 */
export function formatDateByTimeStamp(timeStamp: number, formatter?: string) {
  const date = new Date(timeStamp)

  if (timeStamp < 0 || !isValidDate(date)) {
    console.warn('invalid timeStamp')
    return 'Invalid Date'
  }

  return formatDate(date, formatter)
}

/**
 * Formats a date string into a specified date time format
 *
 * @param dateString - A string representing the date.
 * @param formatter - Optional. A specific format string to format the date. Defaults to 'YYYY-MM-DD HH:mm:ss'.
 *
 * @returns The formatted date string.
 *
 * @throws {Error} Throws an error if the date string is invalid or cannot be parsed into a Date object.
 *
 * @example
 * const dateString = '2024-02-19T10:30:00Z';
 * const formattedDateTime = formatDateTimeByString(dateString, 'MMMM D, YYYY, h:mm A');
 * console.log(formattedDateTime);
 */
export function formatDateTimeByString(dateString: string, formatter?: string) {
  const date = new Date(dateString)
  if (!isValidDate(date)) {
    console.warn('invalid date string')
    return date.toString()
  }
  return formatDate(date, formatter)
}

/**
 * Formats a date based on an array of numbers, with optional formatting string
 *
 * This function expects an array containing year, month, day, hour, minute, and second values. If the array is invalid or does not contain the necessary values, it logs a warning and returns 'Invalid Date'.
 * The function uses the slice method to create a new array containing only the first six elements, and decrements the month value by 1 to convert it from a 1-based index to a 0-based index used by the Date object.
 * It then creates a new Date object using the elements of the new array. If the date is invalid, it logs a warning and returns the date as a string.
 * Finally, the function formats the date according to an optional formatting string and returns the formatted date string.
 *
 * @param array - The array representing the date. This array should contain year, month, day, hour, minute, and second values.
 * @param formatter - Optional. A specific format string to format the date. Defaults to 'YYYY-MM-DD HH:mm:ss'.
 *
 * @returns The formatted date string.
 *
 * @throws {Error} Throws an error if the array is invalid or does not contain the necessary values.
 *
 * @example
 * const dateArray = [2024, 2, 19, 10, 30, 0];
 * const formattedDate = formatDateByArray(dateArray, 'MMMM D, YYYY, h:mm A');
 * console.log(formattedDate);
 */
export function formatDateByArray(array: number[], formatter?: string) {
  if (!Array.isArray(array) || array.length < 2) {
    console.warn('invalid date array')
    return 'Invalid Date'
  }

  const newDateArray = array.slice(0, 6)
  newDateArray[1] = newDateArray[1] - 1

  const date = new Date(
    ...(newDateArray as [number, number, number, number, number, number])
  )
  if (!isValidDate(date)) {
    console.warn(`Invalid date generated from array: ${newDateArray}`)
    return date.toString()
  }
  return formatDate(date, formatter)
}
