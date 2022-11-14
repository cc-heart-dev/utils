/**
 * This function does nothing.
 *
 * @return {void} No return value.
 */
export const noop = () => {
  /** */
}

/**
 * Sleeps for a given delay.
 *
 * @param {number} delay - The delay, in milliseconds.
 * @return {Promise<void>} A promise that resolves after the delay.
 */
export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))
