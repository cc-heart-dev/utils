/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer between min and max.
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
