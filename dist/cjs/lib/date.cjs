'use strict';

/**
 * Returns the current time in ISO string format.
 * @returns {string} The current time in ISO string format.
 */
function getCurrentTimeISOString() {
    const date = new Date();
    const timeZoneOffset = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - timeZoneOffset);
    return date.toISOString();
}

exports.getCurrentTimeISOString = getCurrentTimeISOString;
