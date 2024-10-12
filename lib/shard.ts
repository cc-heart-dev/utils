/**
 * This function does nothing.
 *
 * @returns No return value.
 */
export const noop = () => {
  /** */
}

/**
 * Sleeps for a given delay.
 *
 * @param delay - The delay, in milliseconds.
 * @return A promise that resolves after the delay.
 */
export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))
