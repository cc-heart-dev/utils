/**
 * @description: String prompt for constants
 * @example: type examples =  LiteralUnionTips<'a' | 'b', string>
 */
export type LiteralUnionTips<T extends U, U> = T | (U & Omit<U, PropertyKey>)

export type getArrayChildItem<T extends Array<any>> = T extends Array<infer r>
  ? r
  : never

export type fn = (...args: any) => any
