function useFlag(name: string) {
  const config = useRuntimeConfig();
  return computed(() => config.public[name] === 'on');
}

export { useFlag };
