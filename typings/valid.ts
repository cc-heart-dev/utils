export type IsEqual<T, U> =
  (<K>() => K extends T ? 1 : 2) extends <K>() => K extends U ? 1 : 2
  ? true
  : false

export type Execute<T extends true> = T