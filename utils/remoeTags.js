export const removeTags = str => {
    if (!str) return
    str = str.toString()
    return str.replace(/(<([^>]+)>)/gi, '')
}
