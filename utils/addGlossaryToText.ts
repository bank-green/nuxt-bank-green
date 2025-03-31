type Term = {
  name: string
  tooltip: string
}
export function addGlossaryToText(str: string, terms?: Term[]) {
  if (!terms || !Array.isArray(terms) || !str) return str

  const anchorTagRegex = new RegExp('(<a[^>]*>.*?</a>)|([^<]*)', 'g')

  return str.replace(anchorTagRegex, (match: string, insideATag: string, outsideATag: string) => {
    if (!match) return match
    if (insideATag) return insideATag
    if (!outsideATag) return outsideATag

    for (const term of terms) {
      const regex = new RegExp(`\\b${term.name}\\b`, 'gi')
      outsideATag = outsideATag.replace(regex, `<a href="/glossary#${term.name.toLowerCase()}" class="tooltip" data-tooltip="${term.tooltip}">${term.name}</a>`)
    }
    return outsideATag
  })
}
