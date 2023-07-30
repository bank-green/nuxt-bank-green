import axios from 'axios'
import httpErrorHandling from './errorHandling'


let baseURL = "https://europe-west1-bank-green.cloudfunctions.net"


export const instance = axios.create({
    baseURL,
    timeout: 120000, // timeout if no response in 2min
    withCredentials: true,
})
httpErrorHandling.setInterceptors(instance)
axios.defaults.headers.post['X-TLC'] = '1'

function parseError(e) {
    const errors = e?.response?.data?.errors
    if (!errors) {
        return e
    }
    const { message, detail, code, list } = errors
    if (message) e.message = message
    if (detail) e.message = detail
    if (code) e.code = code
    if (list) e.list = list
    return e
}

export async function get(url, config) {
    try {
        const params = window['__PRERENDER_INJECTED']?.prerender
            ? {
                params: { ...config?.params, prerender: true },
            }
            : config

        const res = await instance.get(url, params)
        return res.data
    } catch (e) {
        throw parseError(e)
    }
}

export async function post(url, data, config) {
    try {
        const res = await instance.post(url, data, config)
        return res.data
    } catch (e) {
        throw parseError(e)
    }
}
