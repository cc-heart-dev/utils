/**
 * @description: String prompt for constants
 * @example: type examples =  LiteralUnionTips<'a' | 'b', string>
 */
export type LiteralUnionTips<T extends U, U> = T | (U & Omit<U, PropertyKey>)

export type GetArrayChildItem<T extends Array<any>> =
  T extends Array<infer r> ? r : never

export type GetPromiseType<T> = T extends Promise<infer R> ? R : T

export type Fn = (...args: any) => any

export type GetAsyncReturnType<T extends (...args: any) => Promise<any>> =
  GetPromiseType<ReturnType<T>>

export * from './url'
export * from './valid'
