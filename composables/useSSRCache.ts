const cache = new Map();

export default async function useSSRCache<T>(
  key: string,
  _fn: () => Promise<T>
): Promise<T> {
  if (!import.meta.env.SSR) return await _fn();
  if (cache.has(key)) return cache.get(key) as T;
  const data = await _fn();
  cache.set(key, data);
  return data;
}
