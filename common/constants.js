export const API_URL = 'http://127.0.0.1:5000/api'

export const VALIDATE_ENDPOINT = '/utils/v2v/validate'
export const DOWNLOAD_ENDPOINT = '/utils/v2v/download'
const URL_WHITELIST = {'https://www.youtube.com': true,
                        'https://m.youtube.com': true}



export function isWhitelistedURL(url) {
    let domainName = url.substring(0, url.indexOf(".com") + 4).toLowerCase()
    return URL_WHITELIST[domainName] !== undefined
}

