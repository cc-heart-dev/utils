export type ParseQueryString<T extends string> =
  T extends `${infer K}=${infer V}`
    ? K extends `${infer Params}[${infer _r}]`
      ? {
          [k in Params]: V
        }
      : {
          [k in K]: V
        }
    : Record<string, any>

export type MergeQueryStringObject<
  T extends Record<string, any>,
  U extends Record<string, any>,
> = {
  [k in keyof T | keyof U]: k extends keyof T
    ? k extends keyof U
      ? T[k] extends unknown[]
        ? U[k] extends unknown[]
          ? [...T[k], ...U[k]]
          : [...T[k], U[k]]
        : U[k] extends unknown[]
        ? [T[k], ...U[k]]
        : [T[k], U[k]]
      : T[k]
    : k extends keyof U
    ? U[k]
    : never
}

export type QueryStringToObject<T extends string> =
  T extends `${infer Params}&${infer Rest}`
    ? MergeQueryStringObject<
        ParseQueryString<Params>,
        QueryStringToObject<Rest>
      >
    : ParseQueryString<T>
