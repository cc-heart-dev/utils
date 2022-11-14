import { fn } from '../helper';
export declare function executeConcurrency(tasks: Array<fn>, maxConcurrency: number): Promise<any[] | null>;
/**
 * Invokes a queue.
 *
 * @param {Array<(...args: any) => any>} taskArray - An array of tasks to be executed.
 * @return {Promise<void>} - A promise that resolves when all tasks are completed.
 */
export declare function executeQueue(taskArray: Array<(...args: any) => any>): Promise<void>;
