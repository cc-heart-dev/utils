/**
 * Generates a random UUID.
 *
 * @return {string} The generated UUID.
 */
function randomUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' &&
        typeof performance.now === 'function') {
        d += performance.now(); // 增加性能数据
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}

export { randomUUID };
