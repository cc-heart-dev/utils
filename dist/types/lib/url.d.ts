/**
 * convert query string to object
 *
 * @param url http url
 * @returns
 */
export declare function convertQueryString<T extends Record<string, string>>(url: string): T;
/**
 * convert params routes to regular expressions
 *
 * @param path a params paths
 * @returns null or An array contains the RegExp that matches the params and the path for each params parameter
 */
export declare function convertParamsRouterToRegExp(path: string): (RegExp | string[])[] | null;
/**
 * Returns the last portion of a path, similar to the Unix basename command.
 * Trims the query string if it exists.
 * Optionally, removes a suffix from the result.
 *
 * @param path - The path to get the basename from.
 * @param [suffix] - An optional suffix to remove from the basename.
 * @returns  The basename of the path.
 */
export declare function basename(path: string, suffix?: string): string;
