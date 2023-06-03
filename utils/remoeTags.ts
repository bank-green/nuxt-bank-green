export const removeTags = (str : string) : string | undefined => {
    if (!str) return
    str = str.toString()
    return str.replace(/(<([^>]+)>)/gi, '')
}
