export function groupBy<T, K extends PropertyKey>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (result, item) => {
      const key = keyFn(item)
      ;(result[key] ||= []).push(item)
      return result
    },
    {} as Record<K, T[]>
  )
}
