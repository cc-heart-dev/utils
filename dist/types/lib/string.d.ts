/**
 * Capitalizes the first letter of a string.
 *
 * @param target - The string to be capitalized.
 * @return - The capitalized string.
 */
export declare const capitalize: <T extends string>(target: T) => Capitalize<T>;
/**
 * Returns a new string with the first character converted to lowercase.
 *
 * @param target - The string to be unCapitalized.
 * @returns - The unCapitalized string.
 */
export declare const unCapitalize: <T extends string>(target: T) => Uncapitalize<T>;
/**
 * @description Add the number of cuts based on the original split and return all subsets after the cut
 * @param str need to split of primitive string
 * @param splitStr split params
 * @param num split limit
 * @returns a new split array, length is num + 1
 */
export declare function mulSplit(str: string, splitStr: string, num?: number): string[];
/**
 * Converts an underline-separated string to camel case.
 * e.g. underlineToHump('hello_word') => 'helloWord'
 *
 * @param {string} target - The underline-separated string to convert.
 * @return {string} The camel case version of the input string.
 */
export declare function underlineToHump(target: string): string;
