// There is an issue with Prismic and Slice machine where the boolean field default value is not set and it's just null
// This function can be used to convert to a proper boolean
export const getSliceBoolean = (value: boolean | null) => {
  return value === null ? true : value
}
