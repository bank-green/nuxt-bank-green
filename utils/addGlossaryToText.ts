type Term = {
  name: string
  tooltip: string
}
export function addGlossaryToText(str: string, searchTerm: Term[]) {
  const anchorTagRegex = new RegExp('(<a[^>]*>.*?</a>)|([^<]*)', 'g')

  return str.replace(anchorTagRegex, (match: string, insideATag: string, outsideATag: string) => {
    if (!match) return match
    if (insideATag) return insideATag
    if (!outsideATag) return outsideATag

    for (const term of searchTerm) {
      const regex = new RegExp(`\\b${term.name}\\b`, 'gi')
      outsideATag = outsideATag.replace(regex, `<a href="/glossary#${term.name.toLowerCase()}" class="tooltip" data-tooltip="${term.tooltip}">${term.name}</a>`)
    }
    return outsideATag
  })
}
