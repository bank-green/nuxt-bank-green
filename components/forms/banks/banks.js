import Fuse from 'fuse.js'

export function findBanks(banks, searchName) {
    if (!searchName.trim()) {
        return banks
    }

    const fuse = new Fuse(banks, { threshold: 0.3, keys: ['name', 'aliases'] })
    const result = fuse.search(searchName)
    return result.map(x => x.item)
}