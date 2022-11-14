'use strict';

/**
 * This function does nothing.
 *
 * @return {void} No return value.
 */
const noop = () => {
    /** */
};
/**
 * Sleeps for a given delay.
 *
 * @param {number} delay - The delay, in milliseconds.
 * @return {Promise<void>} A promise that resolves after the delay.
 */
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

exports.noop = noop;
exports.sleep = sleep;
