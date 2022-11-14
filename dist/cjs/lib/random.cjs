'use strict';

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.random = random;
