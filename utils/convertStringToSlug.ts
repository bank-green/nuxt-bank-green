export default function convertToSlug (text:string) {
  if (!text || typeof text !== 'string') {
    return text
  }
  return text
    .replace(/[`~!@#$%^&*()_\-+=[\]{};:'"\\|/,.<>?\s]/g, ' ')
    .toLowerCase()
    .replace(/^\s+|\s+$/gm, '')
    .replace(/\s+/g, '-')
}
