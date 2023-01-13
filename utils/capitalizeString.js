
export default function capitalizeString(string) {
    if (!string || typeof string !== 'string') {
        return string
    }

    return string
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, w =>
            w.replace(/^\w/, c => c.toUpperCase())
        )
}