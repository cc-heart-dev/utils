/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
