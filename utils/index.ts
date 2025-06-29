const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

const isDirty = (obj: any, defaultObj: any): boolean =>
  JSON.stringify(obj) !== JSON.stringify(defaultObj)

export { deepClone, isDirty }
