export async function useGlossary() {
  const { client } = usePrismic();
  const { data: glossary } = await useAsyncData('glossary', () =>
    usePrerenderCache('glossary', () => client.getSingle('glossarypage'))
  );

  return glossary?.value?.data;
}
