export async function useGlossary() {
  const { client } = usePrismic();
  const { data: glossary } = await useAsyncData('glossary', () =>
    useSSRCache('glossary', () => client.getSingle('glossarypage'))
  );

  return glossary?.value?.data;
}
