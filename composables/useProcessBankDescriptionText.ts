export default async function useProcessBankDescriptionText() {
  const glossary = await useGlossary();

  const process = (text: string): string => {
    if (!text) return text;

    // add tooltip to glossary words
    if (glossary?.terms) {
      const terms = glossary.terms
        // not all glossary terms have tooltips
        .filter(term => !!term.tooltip)
        .map(term => ({
          name: term.term as string,
          tooltip: term.tooltip as string,
        }));
      text = addGlossaryToText(text, terms);
    }

    // make all links open in new window
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = doc.querySelectorAll('a');
    if (links.length > 0) {
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    }

    return doc.body.innerHTML;
  };
  return { process };
}
